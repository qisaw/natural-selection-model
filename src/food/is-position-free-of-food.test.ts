import { createFood } from '.';
import { createGround } from '../ground/create-ground';
import { isPositionFreeOfFood } from './is-position-free-of-food';

/*
 * | - | x |
 * | - | - |
 */
const dimensions = {
  width: 2,
  height: 2,
};
const food = [createFood({ position: { x: 1, y: 0 } })];
const ground = createGround({ dimensions, food });
describe('isPositionFreeOfPlayers', () => {
  it('should return true if the position not have food in it', () => {
    expect(isPositionFreeOfFood({ x: 1, y: 0 }, ground)).toEqual(false);
  });
  it('should return flase if the position has food in it', () => {
    expect(isPositionFreeOfFood({ x: 1, y: 1 }, ground)).toEqual(true);
  });
  it('should return true if the position is not in the ground', () => {
    expect(isPositionFreeOfFood({ x: -1, y: 1 }, ground)).toEqual(false);
    expect(isPositionFreeOfFood({ x: 1, y: -1 }, ground)).toEqual(false);
    expect(isPositionFreeOfFood({ x: 2, y: 1 }, ground)).toEqual(false);
    expect(isPositionFreeOfFood({ x: 1, y: 2 }, ground)).toEqual(false);
  });
});
