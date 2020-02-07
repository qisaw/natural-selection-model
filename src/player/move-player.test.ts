import { createPlayer } from '.';
import { createGround } from '../ground/create-ground';
import { movePlayer } from './move-player';
import { PlayerNotInGroundError } from '../ground/errors';
import { createFood } from '../food';

describe('movePlayer', () => {
  describe('the player has no energy', () => {
    it('should be removed from the players array', () => {
      const players = [createPlayer({ position: { x: 1, y: 1 }, energy: 0 })];
      const ground = createGround({ players });
      const newGround = movePlayer(players[0], ground);
      expect(newGround.players).toHaveLength(0);
    });
  });
  describe('the player still has energy', () => {
    it('should decrease the energy of the user', () => {
      const players = [createPlayer({ position: { x: 1, y: 1 }, energy: 1 })];
      const ground = createGround({ players });
      const newGround = movePlayer(players[0], ground);
      expect(newGround.players[0].energy).toEqual(0);
    });
    it('should move the player', () => {
      const players = [createPlayer({ position: { x: 1, y: 1 }, energy: 1 })];
      const ground = createGround({ players });
      const newGround = movePlayer(players[0], ground);
      expect(newGround.players[0].id).toEqual(players[0].id);
      expect(newGround.players[0].position).not.toEqual(players[0].position);
    });
    it('should not decrease the energy if the player did not move', () => {
      const players = [
        createPlayer({ position: { x: 0, y: 0 }, energy: 1 }),
        createPlayer({ position: { x: 0, y: 1 }, energy: 1 }),
        createPlayer({ position: { x: 1, y: 0 }, energy: 1 }),
        createPlayer({ position: { x: 1, y: 1 }, energy: 1 }),
      ];
      const ground = createGround({ players, dimensions: { width: 2, height: 2 } });
      const newGround = movePlayer(players[0], ground);
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
      expect(movePlayer(players[0], ground).food).toEqual(food);
    });
    it('should remove food when eaten', () => {
      // here the first player only has one available direction (UP) to where the food is
      const players = [
        createPlayer({ position: { x: 1, y: 1 }, energy: 1 }),
        createPlayer({ position: { x: 0, y: 1 }, energy: 1 }),
        createPlayer({ position: { x: 0, y: 0 }, energy: 1 }),
      ];
      const food = [createFood({ position: { x: 1, y: 0 } })];
      const dimensions = { width: 2, height: 2 };
      const ground = createGround({ players, food, dimensions });
      expect(movePlayer(players[0], ground).food).toHaveLength(0);
    });
    it('should add energy addition to player when food eaten', () => {
      // here the first player only has one available direction (UP) to where the food is
      const players = [
        createPlayer({ position: { x: 1, y: 1 }, energy: 1 }),
        createPlayer({ position: { x: 0, y: 1 }, energy: 1 }),
        createPlayer({ position: { x: 0, y: 0 }, energy: 1 }),
      ];
      const food = [createFood({ position: { x: 1, y: 0 }, energyAddition: 10 })];
      const dimensions = { width: 2, height: 2 };
      const ground = createGround({ players, food, dimensions });
      expect(movePlayer(players[0], ground).players[0].energy).toEqual(10);
    });
  });

  describe('unhappy paths', () => {
    it('should throw PlayerNotInGroundError error if a player which is not on the ground', () => {
      const someRandomPlayer = createPlayer({ position: { x: 0, y: 0 }, energy: 1 });
      const players = [createPlayer({ position: { x: 0, y: 0 }, energy: 1 })];
      const ground = createGround({ players });
      expect(() => movePlayer(someRandomPlayer, ground)).toThrow(PlayerNotInGroundError);
    });
  });
});
