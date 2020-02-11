import { createPlayer } from '../player';
import { createFood } from '.';
import { createGround } from '../ground/create-ground';
import { addNewFoodToGround } from './add-food-to-ground';

describe('addNewFoodToGround', () => {
  const dimensions = {
    width: 2,
    height: 2,
  };
  /*
   * the board state is
   * | x | f |
   * |   |   |
   * here there are 2 available spots for food and we choose x: 1 y: 1
   */
  const previousPositions = new Set([{ x: 0, y: 0 }]);
  const players = [createPlayer({ position: { x: 0, y: 0 }, previousPositions })];
  const foodAlreadyExisting = [createFood({ position: { x: 1, y: 0 } })];
  const ground = createGround({ dimensions, food: foodAlreadyExisting, players });
  describe('food is addded', () => {
    const newFood = [createFood({ position: { x: 1, y: 1 } })];
    const newGround = addNewFoodToGround(ground, newFood);
    it('should add the new food to the ground, along with the existing food', () => {
      expect(newGround.food).toHaveLength(2);
      expect(newGround.food.map(({ id }) => id).sort()).toEqual([foodAlreadyExisting[0].id, newFood[0].id].sort());
    });
    it('should clear all players previousPositions', () => {
      expect(newGround.players[0].previousPositions).toEqual(new Set());
    });
  });
  describe('food is not added', () => {
    const newGround = addNewFoodToGround(ground, []);
    it('should not add the new food to the ground, along with the existing food', () => {
      expect(newGround.food).toHaveLength(1);
    });
    it('should not clear players previousPositions', () => {
      expect(newGround.players[0].previousPositions).toEqual(previousPositions);
    });
  });
});
