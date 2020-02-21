import { createPlayer } from '.';
import { createGround } from '../ground/create-ground';
import { getMovementDirectionViaSense } from './get-new-player-position-via-sense';
import { createFood } from '../food';
import { Direction } from '../global/direction';

describe('getNewPlayerPositionViaSense', () => {
  describe('players with no sense', () => {
    it('shoud always return undefined', () => {
      const playerWithNoSense = createPlayer({ position: { x: 1, y: 1 }, sense: 0 });
      const food = [createFood({ position: { x: 2, y: 2 } })];
      const dimensions = { width: 10, height: 10 };
      const ground = createGround({ dimensions, players: [playerWithNoSense], food });
      expect(getMovementDirectionViaSense(playerWithNoSense, ground)).not.toBeDefined();
    });
  });
  describe('players not in the board', () => {
    it('shoud always return undefined', () => {
      const player = createPlayer({ position: { x: 1, y: 1 } });
      const dimensions = { width: 10, height: 10 };
      const food = [createFood({ position: { x: 2, y: 2 } })];
      const ground = createGround({ dimensions, players: [], food });
      expect(getMovementDirectionViaSense(player, ground)).not.toBeDefined();
    });
  });
  describe('no food on the board', () => {
    it('shoud always return undefined', () => {
      const player = createPlayer({ position: { x: 1, y: 1 } });
      const dimensions = { width: 10, height: 10 };
      const ground = createGround({ dimensions, players: [player] });
      expect(getMovementDirectionViaSense(player, ground)).not.toBeDefined();
    });
  });
  describe('it can reach a piece of food this turn', () => {
    it('should pick the food with the highest energy consumption if it can reach more than 1 piece of food', () => {
      const player = createPlayer({ position: { x: 1, y: 1 }, sense: 1 });
      const dimensions = { width: 10, height: 10 };
      const food = [
        createFood({ position: { x: 1, y: 2 }, energyAddition: 1 }),
        createFood({ position: { x: 0, y: 2 }, energyAddition: 2 }),
        createFood({ position: { x: 0, y: 0 }, energyAddition: 3 }),
        createFood({ position: { x: 0, y: 1 }, energyAddition: 1 }),
      ];
      const ground = createGround({ dimensions, players: [player], food });
      expect(getMovementDirectionViaSense(player, ground)).toEqual(Direction.UP_AND_LEFT);
    });
    it('should return the food position if the food if there is only one piece of food', () => {
      const player = createPlayer({ position: { x: 1, y: 1 }, sense: 1 });
      const dimensions = { width: 10, height: 10 };
      const food = [createFood({ position: { x: 1, y: 2 } })];
      const ground = createGround({ dimensions, players: [player], food });
      expect(getMovementDirectionViaSense(player, ground)).toEqual(Direction.DOWN);
      const foodToTheRight = [createFood({ position: { x: 2, y: 1 } })];
      const groundWithFoodToTheRight = createGround({ dimensions, players: [player], food: foodToTheRight });
      expect(getMovementDirectionViaSense(player, groundWithFoodToTheRight)).toEqual(Direction.RIGHT);
      const foodToTheLeft = [createFood({ position: { x: 0, y: 1 } })];
      const groundWithFoodToTheLeft = createGround({ dimensions, players: [player], food: foodToTheLeft });
      expect(getMovementDirectionViaSense(player, groundWithFoodToTheLeft)).toEqual(Direction.LEFT);
      const foodToTheTop = [createFood({ position: { x: 1, y: 0 } })];
      const groundWithFoodToTheTop = createGround({ dimensions, players: [player], food: foodToTheTop });
      expect(getMovementDirectionViaSense(player, groundWithFoodToTheTop)).toEqual(Direction.UP);
      const foodToTheBottom = [createFood({ position: { x: 1, y: 2 } })];
      const groundWithFoodToTheBottom = createGround({ dimensions, players: [player], food: foodToTheBottom });
      expect(getMovementDirectionViaSense(player, groundWithFoodToTheBottom)).toEqual(Direction.DOWN);
      const foodToTheBottomLeft = [createFood({ position: { x: 0, y: 2 } })];
      const groundWithFoodToTheBottomLeft = createGround({ dimensions, players: [player], food: foodToTheBottomLeft });
      expect(getMovementDirectionViaSense(player, groundWithFoodToTheBottomLeft)).toEqual(Direction.DOWN_AND_LEFT);
      const foodToTheBottomRight = [createFood({ position: { x: 2, y: 2 } })];
      const groundWithFoodToTheBottomRight = createGround({
        dimensions,
        players: [player],
        food: foodToTheBottomRight,
      });
      expect(getMovementDirectionViaSense(player, groundWithFoodToTheBottomRight)).toEqual(Direction.DOWN_AND_RIGHT);
      const foodToTheTopLeft = [createFood({ position: { x: 0, y: 0 } })];
      const groundWithFoodToTheTopLeft = createGround({
        dimensions,
        players: [player],
        food: foodToTheTopLeft,
      });
      expect(getMovementDirectionViaSense(player, groundWithFoodToTheTopLeft)).toEqual(Direction.UP_AND_LEFT);
      const foodToTheTopRight = [createFood({ position: { x: 2, y: 0 } })];
      const groundWithFoodToTheTopRight = createGround({
        dimensions,
        players: [player],
        food: foodToTheTopRight,
      });
      expect(getMovementDirectionViaSense(player, groundWithFoodToTheTopRight)).toEqual(Direction.UP_AND_RIGHT);
    });
  });
  describe('it cannot reach a piece of food this turn', () => {
    it('should return undefined if the user cannot sense any food', () => {
      const player = createPlayer({ position: { x: 1, y: 1 }, sense: 1 });
      const dimensions = { width: 10, height: 10 };
      const food = [createFood({ position: { x: 1, y: 3 } })];
      const ground = createGround({ dimensions, players: [player], food });
      expect(getMovementDirectionViaSense(player, ground)).toBeUndefined();
    });
  });
});
