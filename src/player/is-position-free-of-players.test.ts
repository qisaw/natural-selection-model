import { createPlayer } from '.';
import { createGround } from '../ground/create-ground';
import { isPositionFreeOfPlayers } from './is-position-free-of-players';

/*
 * | - | x |
 * | - | - |
 */
const dimensions = {
  width: 2,
  height: 2,
};
const players = [createPlayer({ position: { x: 1, y: 0 } })];
const ground = createGround({ dimensions, players });
describe('isPositionFreeOfPlayers', () => {
  it('should return true if the position not have players in it', () => {
    expect(isPositionFreeOfPlayers({ x: 1, y: 0 }, ground)).toEqual(false);
  });
  it('should return flase if the position has players in it', () => {
    expect(isPositionFreeOfPlayers({ x: 1, y: 1 }, ground)).toEqual(true);
  });
  it('should return true if the position is not in the ground', () => {
    expect(isPositionFreeOfPlayers({ x: -1, y: 1 }, ground)).toEqual(false);
    expect(isPositionFreeOfPlayers({ x: 1, y: -1 }, ground)).toEqual(false);
    expect(isPositionFreeOfPlayers({ x: 2, y: 1 }, ground)).toEqual(false);
    expect(isPositionFreeOfPlayers({ x: 1, y: 2 }, ground)).toEqual(false);
  });
});
