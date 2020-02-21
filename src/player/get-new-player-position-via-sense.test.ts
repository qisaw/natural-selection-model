import { createPlayer } from '.';
import { createGround } from '../ground/create-ground';
import { getNewPlayerPositionViaSense } from './get-new-player-position-via-sense';
import { createFood } from '../food';

describe('getNewPlayerPositionViaSense', () => {
  describe('players with no sense', () => {
    it('shoud always return undefined', () => {
      const playerWithNoSense = createPlayer({ position: { x: 1, y: 1 }, sense: 0 });
      const food = [createFood({ position: { x: 2, y: 2 } })];
      const dimensions = { width: 10, height: 10 };
      const ground = createGround({ dimensions, players: [playerWithNoSense], food });
      expect(getNewPlayerPositionViaSense(playerWithNoSense, ground)).not.toBeDefined();
    });
  });
  describe('players not in the board', () => {
    it('shoud always return undefined', () => {
      const player = createPlayer({ position: { x: 1, y: 1 } });
      const dimensions = { width: 10, height: 10 };
      const food = [createFood({ position: { x: 2, y: 2 } })];
      const ground = createGround({ dimensions, players: [], food });
      expect(getNewPlayerPositionViaSense(player, ground)).not.toBeDefined();
    });
  });
  describe('no food on the board', () => {
    it('shoud always return undefined', () => {
      const player = createPlayer({ position: { x: 1, y: 1 } });
      const dimensions = { width: 10, height: 10 };
      const ground = createGround({ dimensions, players: [player] });
      expect(getNewPlayerPositionViaSense(player, ground)).not.toBeDefined();
    });
  });
});
