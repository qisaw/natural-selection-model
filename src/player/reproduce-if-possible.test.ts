import { createPlayer } from '.';
import { createFood } from '../food';
import { createGround } from '../ground/create-ground';
import { reproduceIfPossible } from './reproduce-if-possible';
import { Player } from './player';
import { getStartingPlayerEnergy } from '../settings';

describe('reproduceIfPossible', () => {
  describe('can reproduce cases', () => {
    const foodEaten = [createFood({ position: { x: 1, y: 1 } }), createFood({ position: { x: 1, y: 1 } })];
    const player = createPlayer({ position: { x: 1, y: 1 }, foodEaten, energy: 30 });
    const ground = createGround({ players: [player] });
    const newPlayers = reproduceIfPossible(player, ground);
    it('should return an array with new players if the player has eaten more than 2 food', () => {
      expect(newPlayers).toHaveLength(1);
      expect(newPlayers[0] instanceof Player).toBe(true);
    });
    it('new player should have not eaten any food', () => {
      expect(newPlayers[0].foodEaten).toHaveLength(0);
    });
    it('should set new player foodEaten to nothing', () => {
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
      expect(newPlayers[0].energy).not.toEqual(getStartingPlayerEnergy());
    });
  });
  describe('can not reproduce cases', () => {
    it('should return empty array if the player has eaten less than 2 food', () => {
      const foodEaten = [createFood({ position: { x: 1, y: 1 } })];
      const player = createPlayer({ position: { x: 1, y: 1 }, foodEaten });
      const ground = createGround({ players: [player] });
      expect(reproduceIfPossible(player, ground)).toEqual([]);
    });
    it('should return empty array if the user has eaten more than 2 food, but there is no available direction to reproduce in', () => {
      const foodEaten = [createFood({ position: { x: 1, y: 1 } }), createFood({ position: { x: 1, y: 1 } })];
      const player = createPlayer({ position: { x: 1, y: 1 }, foodEaten });
      const otherPlayers = [
        createPlayer({ position: { x: 0, y: 1 } }),
        createPlayer({ position: { x: 2, y: 1 } }),
        createPlayer({ position: { x: 1, y: 0 } }),
        createPlayer({ position: { x: 1, y: 2 } }),
      ];
      const ground = createGround({ players: [player, ...otherPlayers] });
      expect(reproduceIfPossible(player, ground)).toEqual([]);
    });
  });
});
