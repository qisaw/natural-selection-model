import { getFoodFromGround } from './get-food-from-ground';
import { createFood } from '.';
import { createGround } from '../ground/create-ground';

describe('getFoodFromGround', () => {
  const dimensions = { width: 5, height: 5 };
  const food = [createFood({ position: { x: 1, y: 1 } })];
  const ground = createGround({ dimensions, food });
  it('shoud return food if food exists on the ground', () => {
    const position = {
      x: 1,
      y: 1,
    };
    const foodAtPosition = getFoodFromGround(ground, position);
    expect(foodAtPosition).toEqual(food[0]);
  });
  it('shoud return void if no food exists on the ground', () => {
    const position = {
      x: 1,
      y: 2,
    };
    const foodAtPosition = getFoodFromGround(ground, position);
    expect(foodAtPosition).toBeUndefined();
  });
});
