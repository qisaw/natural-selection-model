import { createPlayer } from '.';
import { createGround } from '../ground/create-ground';
import { performAction } from './perform-action';
import { createFood } from '../food';
import { Player } from './player';
import { DeepSet } from '../utils/deep-set';
import { PlayerNotInGroundError } from './errors';

describe('movePlayer', () => {
  describe('a player not in the board has been passed', () => {
    it('should throw player not in ground error', () => {
      const players = [createPlayer({ position: { x: 1, y: 1 } })];
      const ground = createGround({ players });
      expect(() => performAction(createPlayer({ position: { x: 2, y: 2 } }), ground)).toThrow(PlayerNotInGroundError);
    });
  });
  describe('the player has no energy', () => {
    it('should be removed from the players array', () => {
      const players = [createPlayer({ position: { x: 1, y: 1 }, energy: 0 })];
      const ground = createGround({ players });
      const newGround = performAction(players[0], ground);
      expect(newGround.players).toHaveLength(0);
    });
  });
  describe('the player still has energy', () => {
    describe('the player can reproduce', () => {
      const foodEaten = [
        createFood({ position: { x: 1, y: 1 } }),
        createFood({ position: { x: 1, y: 1 } }),
        createFood({ position: { x: 1, y: 1 } }),
      ];
      const player = createPlayer({ position: { x: 0, y: 1 }, energy: 1, foodEaten });
      const ground = createGround({ players: [player] });
      const newGround = performAction(player, ground);
      const samePlayer = newGround.players.find(({ id }) => id === player.id) as Player;
      it('should create a new player', () => {
        expect(newGround.players.length).toEqual(2);
      });
      it('should not move the old player that time', () => {
        expect(samePlayer.position).toEqual(player.position);
      });
      it('should clear the food eaten', () => {
        expect(samePlayer.foodEaten).toHaveLength(1);
      });
      it('should create a new player in a different position', () => {
        const otherPlayer = newGround.players.find(({ id }) => id !== player.id) as Player;
        expect(otherPlayer.position).not.toEqual(samePlayer.position);
      });
    });
    describe('the user cannot reproduce', () => {
      it('should move the player', () => {
        const previousPositions = [{ x: 1, y: 2 }];
        const players = [
          createPlayer({ position: { x: 1, y: 1 }, energy: 1, previousPositions: new DeepSet(previousPositions) }),
        ];
        const ground = createGround({ players });
        const newGround = performAction(players[0], ground);
        expect(newGround.players[0].id).toEqual(players[0].id);
        expect(newGround.players[0].position).not.toEqual(players[0].position);
      });
      it('should set the players previous position in the previousPositions set ', () => {
        const previousPositions = [{ x: 1, y: 2 }];
        const players = [
          createPlayer({ position: { x: 1, y: 1 }, energy: 1, previousPositions: new DeepSet(previousPositions) }),
        ];
        const ground = createGround({ players });
        const newGround = performAction(players[0], ground);
        expect(newGround.players[0].previousPositions).toEqual(new DeepSet([...previousPositions, { x: 1, y: 1 }]));
      });
      it('should decrease the energy when a user moves', () => {
        const players = [createPlayer({ position: { x: 1, y: 1 }, energy: 10, speed: 2 })];
        const ground = createGround({ players });
        const newGround = performAction(players[0], ground);
        expect(newGround.players[0].energy).toEqual(6);
      });
      it('should never set the energy to a negative number', () => {
        const players = [createPlayer({ position: { x: 1, y: 1 }, energy: 1, speed: 2 })];
        const ground = createGround({ players });
        const newGround = performAction(players[0], ground);
        expect(newGround.players[0].energy).toEqual(0);
      });
      it('should not decrease the energy if the player did not move', () => {
        const players = [
          createPlayer({ position: { x: 0, y: 0 }, energy: 1 }),
          createPlayer({ position: { x: 0, y: 1 }, energy: 1 }),
          createPlayer({ position: { x: 1, y: 0 }, energy: 1 }),
          createPlayer({ position: { x: 1, y: 1 }, energy: 1 }),
        ];
        const ground = createGround({ players, dimensions: { width: 2, height: 2 } });
        const newGround = performAction(players[0], ground);
        for (let i = 0; i < players.length; i++) {
          expect(newGround.players[i].id).toEqual(players[i].id);
          expect(newGround.players[i].position).toEqual(players[i].position);
          expect(newGround.players[i].energy).toEqual(1);
        }
      });
      it('should not remove food not eaten', () => {
        const players = [createPlayer({ position: { x: 1, y: 1 }, energy: 1 })];
        const food = [createFood({ position: { x: 9, y: 9 } })];
        const dimensions = { width: 10, height: 10 };
        const ground = createGround({ players, food, dimensions });
        expect(performAction(players[0], ground).food).toEqual(food);
      });
      it('should remove food when eaten', () => {
        /*
         * | x | F |
         * | x | y |
         * here the first player only has one available direction (UP) to where the food is
         */
        const players = [
          createPlayer({ position: { x: 1, y: 1 }, energy: 1 }),
          createPlayer({ position: { x: 0, y: 1 }, energy: 1 }),
          createPlayer({ position: { x: 0, y: 0 }, energy: 1 }),
        ];
        const food = [createFood({ position: { x: 1, y: 0 } })];
        const dimensions = { width: 2, height: 2 };
        const ground = createGround({ players, food, dimensions });
        expect(performAction(players[0], ground).food).toHaveLength(0);
      });
      it('should add energy addition to player when food eaten', () => {
        /*
         * | x | F |
         * | x | y |
         * here the first player only has one available direction (UP) to where the food is
         */
        const players = [
          createPlayer({ position: { x: 1, y: 1 }, energy: 1 }),
          createPlayer({ position: { x: 0, y: 1 }, energy: 1 }),
          createPlayer({ position: { x: 0, y: 0 }, energy: 1 }),
        ];
        const food = [createFood({ position: { x: 1, y: 0 }, energyAddition: 10 })];
        const dimensions = { width: 2, height: 2 };
        const ground = createGround({ players, food, dimensions });
        expect(performAction(players[0], ground).players[0].energy).toEqual(10);
      });
      it('should add the food to the list of food eaten by the player', () => {
        /*
         * | x | F |
         * | x | y |
         * here the first player only has one available direction (UP) to where the food is
         */
        const players = [
          createPlayer({ position: { x: 1, y: 1 }, energy: 1 }),
          createPlayer({ position: { x: 0, y: 1 }, energy: 1 }),
          createPlayer({ position: { x: 0, y: 0 }, energy: 1 }),
        ];
        const food = [createFood({ position: { x: 1, y: 0 }, energyAddition: 10 })];
        const dimensions = { width: 2, height: 2 };
        const ground = createGround({ players, food, dimensions });
        const newGround = performAction(players[0], ground);
        expect(newGround.players[0].foodEaten).toEqual(food);
      });
    });
  });
});
