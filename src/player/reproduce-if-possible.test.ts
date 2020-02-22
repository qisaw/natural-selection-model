import { createPlayer } from '.';
import { createFood } from '../food';
import { createGround } from '../ground/create-ground';
import { reproduceIfPossible } from './reproduce-if-possible';
import { Player } from './player';
import * as settings from '../settings';
import { DeepSet } from '../utils/deep-set';

describe('reproduceIfPossible', () => {
  describe('can reproduce cases', () => {
    describe('generic tests', () => {
      const foodEaten = [
        createFood({ position: { x: 1, y: 1 } }),
        createFood({ position: { x: 1, y: 1 } }),
        createFood({ position: { x: 1, y: 1 } }),
      ];
      const player = createPlayer({
        position: { x: 0, y: 1 },
        foodEaten,
        energy: 30,
        previousPositions: new DeepSet([{ x: 1, y: 1 }]),
        timeToLive: 2,
      });
      const ground = createGround({ players: [player] });
      const { newPlayers, originalPlayer } = reproduceIfPossible(player, ground);
      it('should return an array with new players if the player has eaten more than 2 food', () => {
        expect(newPlayers).toHaveLength(1);
        expect(newPlayers[0] instanceof Player).toBe(true);
      });
      it('new player should have not eaten any food', () => {
        expect(newPlayers[0].foodEaten).toHaveLength(0);
      });
      it('should set a new id', () => {
        expect(newPlayers[0].id).toBeDefined();
        expect(newPlayers[0].id).not.toEqual(player.id);
      });
      it('should set a new position', () => {
        const positon = newPlayers[0].position;
        expect(positon).not.toEqual(player.position);
      });
      it('should set the same energy as the starting energy', () => {
        expect(newPlayers[0].energy).not.toEqual(settings.startingPlayerEnergy());
      });
      it('should set the previousPositions to empty', () => {
        expect(newPlayers[0].previousPositions).toEqual(new DeepSet());
      });
      it('should reduce the originalPlayers food by 2', () => {
        expect(originalPlayer.foodEaten).toHaveLength(1);
      });
      it('should set the new players time to live back to default', () => {
        expect(newPlayers[0].timeToLive).toEqual(settings.defaultPlayerTimeToLive());
      });
    });
    describe('hasSpeedMutation', () => {
      describe('off', () => {
        beforeEach(() => {
          settings.setOverrides({ shouldMutateSpeed: false });
        });
        afterEach(() => {
          settings.unsetOverrides(['shouldMutateSpeed']);
        });
        it('new player should always have the same speed as the parent', () => {
          const foodEaten = [createFood({ position: { x: 1, y: 1 } }), createFood({ position: { x: 1, y: 1 } })];
          const player = createPlayer({ position: { x: 0, y: 1 }, foodEaten, energy: 30, speed: 1 });
          const ground = createGround({ players: [player] });
          const { newPlayers } = reproduceIfPossible(player, ground);
          expect(newPlayers[0].speed).toEqual(1);
        });
      });
      describe('on', () => {
        let randomMock: jest.SpyInstance;
        beforeEach(() => {
          settings.setOverrides({ shouldMutateSpeed: true });
          randomMock = jest.spyOn(Math, 'random');
        });
        afterEach(() => {
          randomMock.mockRestore();
          settings.unsetOverrides(['shouldMutateSpeed']);
        });
        it('should 33% of the time keep the same player speed', () => {
          randomMock.mockImplementation(() => 0.32);
          const foodEaten = [createFood({ position: { x: 1, y: 1 } }), createFood({ position: { x: 1, y: 1 } })];
          const player = createPlayer({ position: { x: 0, y: 1 }, foodEaten, energy: 30, speed: 1 });
          const ground = createGround({ players: [player] });
          const { newPlayers } = reproduceIfPossible(player, ground);
          expect(newPlayers[0].speed).toEqual(1);
        });
        it('should 33% of the time increase the player speed', () => {
          randomMock.mockImplementation(() => 0.65);
          const foodEaten = [createFood({ position: { x: 1, y: 1 } }), createFood({ position: { x: 1, y: 1 } })];
          const player = createPlayer({ position: { x: 0, y: 1 }, foodEaten, energy: 30, speed: 1 });
          const ground = createGround({ players: [player] });
          const { newPlayers } = reproduceIfPossible(player, ground);
          expect(newPlayers[0].speed).toEqual(2);
        });
        it('should 33% of the time decrease the player speed', () => {
          randomMock.mockImplementation(() => 0.95);
          const foodEaten = [createFood({ position: { x: 1, y: 1 } }), createFood({ position: { x: 1, y: 1 } })];
          const player = createPlayer({ position: { x: 0, y: 1 }, foodEaten, energy: 30, speed: 3 });
          const ground = createGround({ players: [player] });
          const { newPlayers } = reproduceIfPossible(player, ground);
          expect(newPlayers[0].speed).toEqual(2);
        });
        it('should never decrease the player speed to a 0 value', () => {
          randomMock.mockImplementation(() => 0.95);
          const foodEaten = [createFood({ position: { x: 1, y: 1 } }), createFood({ position: { x: 1, y: 1 } })];
          const player = createPlayer({ position: { x: 0, y: 1 }, foodEaten, energy: 30, speed: 1 });
          const ground = createGround({ players: [player] });
          const { newPlayers } = reproduceIfPossible(player, ground);
          expect(newPlayers[0].speed).toEqual(1);
        });
      });
    });
  });
  describe('can not reproduce cases', () => {
    it('should return empty array and unchanged player if the player has eaten less than 2 food', () => {
      const foodEaten = [createFood({ position: { x: 1, y: 1 } })];
      const player = createPlayer({ position: { x: 0, y: 1 }, foodEaten });
      const ground = createGround({ players: [player] });
      expect(reproduceIfPossible(player, ground)).toEqual({ originalPlayer: player, newPlayers: [] });
    });
    it('should return empty array and unchanged player if the user has eaten more than 2 food, but there is no available direction to reproduce in', () => {
      /*
       * | x | x | x |
       * | x | y | x |
       * | x | x | x |
       * No available moves for y
       */

      const foodEaten = [createFood({ position: { x: 1, y: 1 } }), createFood({ position: { x: 1, y: 1 } })];
      const player = createPlayer({ position: { x: 1, y: 1 }, foodEaten });
      const otherPlayers = [
        createPlayer({ position: { x: 0, y: 1 } }),
        createPlayer({ position: { x: 1, y: 0 } }),
        createPlayer({ position: { x: 1, y: 2 } }),
        createPlayer({ position: { x: 2, y: 1 } }),
        createPlayer({ position: { x: 0, y: 0 } }),
        createPlayer({ position: { x: 0, y: 2 } }),
        createPlayer({ position: { x: 2, y: 0 } }),
        createPlayer({ position: { x: 2, y: 2 } }),
      ];
      const ground = createGround({ players: [player, ...otherPlayers] });
      expect(reproduceIfPossible(player, ground)).toEqual({ originalPlayer: player, newPlayers: [] });
    });
    it('should return empty array and unchanged player if the user is not on the outer edge of the board', () => {
      const foodEaten = [createFood({ position: { x: 1, y: 1 } }), createFood({ position: { x: 1, y: 1 } })];
      const player = createPlayer({ position: { x: 1, y: 1 }, foodEaten });
      const ground = createGround({ players: [player] });
      expect(reproduceIfPossible(player, ground)).toEqual({ originalPlayer: player, newPlayers: [] });
    });
  });
});
