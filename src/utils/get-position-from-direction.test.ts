import { getPositionFromDirection } from './get-position-from-direction';
import { Direction } from '../global/direction';
describe('getPositionFromDirection', () => {
  const currentPosition = {
    x: 1,
    y: 1,
  };
  describe('UP', () => {
    it('should get the correct position', () => {
      expect(getPositionFromDirection(currentPosition, Direction.UP)).toEqual({
        x: 1,
        y: 0,
      });
    });
  });
  describe('DOWN', () => {
    it('should get the correct position', () => {
      expect(getPositionFromDirection(currentPosition, Direction.DOWN)).toEqual({
        x: 1,
        y: 2,
      });
    });
  });
  describe('LEFT', () => {
    it('should get the correct position', () => {
      expect(getPositionFromDirection(currentPosition, Direction.LEFT)).toEqual({
        x: 0,
        y: 1,
      });
    });
  });
  describe('RIGHT', () => {
    it('should get the correct position', () => {
      expect(getPositionFromDirection(currentPosition, Direction.RIGHT)).toEqual({
        x: 2,
        y: 1,
      });
    });
  });
  describe('DOWN_AND_LEFT', () => {
    it('should get the correct position', () => {
      expect(getPositionFromDirection(currentPosition, Direction.DOWN_AND_LEFT)).toEqual({
        x: 0,
        y: 2,
      });
    });
  });
  describe('DOWN_AND_RIGHT', () => {
    it('should get the correct position', () => {
      expect(getPositionFromDirection(currentPosition, Direction.DOWN_AND_RIGHT)).toEqual({
        x: 2,
        y: 2,
      });
    });
  });
  describe('UP_AND_LEFT', () => {
    it('should get the correct position', () => {
      expect(getPositionFromDirection(currentPosition, Direction.UP_AND_LEFT)).toEqual({
        x: 0,
        y: 0,
      });
    });
  });
  describe('UP_AND_RIGHT', () => {
    it('should get the correct position', () => {
      expect(getPositionFromDirection(currentPosition, Direction.UP_AND_RIGHT)).toEqual({
        x: 2,
        y: 0,
      });
    });
  });
  describe('NO_DIRECTION', () => {
    it('should get the correct position', () => {
      expect(getPositionFromDirection(currentPosition, Direction.NO_DIRECTION)).toEqual({
        x: 1,
        y: 1,
      });
    });
  });
});
