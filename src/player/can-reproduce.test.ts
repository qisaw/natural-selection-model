import { createPlayer } from '.';
import { createFood } from '../food';
import { createGround } from '../ground/create-ground';
import { canReproduce } from './can-reproduce';

describe('canReproduce', () => {
  describe('player has eaten more than 2 food', () => {
    it('should return true if there is a spot to put the new player', () => {
      const foodEaten = [createFood({ position: { x: 0, y: 1 } }), createFood({ position: { x: 1, y: 1 } })];
      const player = createPlayer({ position: { x: 1, y: 1 }, foodEaten });
      const ground = createGround({ players: [player] });
      expect(canReproduce(player, ground)).toEqual(true);
    });
    it('should return false there is no available spot to put the new player', () => {
      const foodEaten = [createFood({ position: { x: 1, y: 1 } }), createFood({ position: { x: 1, y: 1 } })];
      const player = createPlayer({ position: { x: 1, y: 1 }, foodEaten });
      const otherPlayers = [
        createPlayer({ position: { x: 0, y: 1 } }),
        createPlayer({ position: { x: 2, y: 1 } }),
        createPlayer({ position: { x: 1, y: 0 } }),
        createPlayer({ position: { x: 1, y: 2 } }),
      ];
      const ground = createGround({ players: [player, ...otherPlayers] });
      expect(canReproduce(player, ground)).toEqual(false);
    });
  });
  describe('player has eaten less than 2 food', () => {
    it('should return false if the player has eaten less than 2 food', () => {
      const foodEaten = [createFood({ position: { x: 1, y: 1 } })];
      const player = createPlayer({ position: { x: 1, y: 1 }, foodEaten });
      const ground = createGround({ players: [player] });
      expect(canReproduce(player, ground)).toEqual(false);
    });
  });
});
