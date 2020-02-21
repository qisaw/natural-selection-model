import { Position } from '../global/types';
import { Direction } from '../global/direction';

export const getPositionFromDirection = (currentPosition: Position, direction: Direction): Position => {
  // @TODO error checking to ensure we don't step off the board
  switch (direction) {
    case Direction.UP:
      return {
        x: currentPosition.x,
        y: currentPosition.y - 1,
      };
    case Direction.DOWN:
      return {
        x: currentPosition.x,
        y: currentPosition.y + 1,
      };
    case Direction.LEFT:
      return {
        x: currentPosition.x - 1,
        y: currentPosition.y,
      };
    case Direction.RIGHT:
      return {
        x: currentPosition.x + 1,
        y: currentPosition.y,
      };
    case Direction.DOWN_AND_LEFT:
      return {
        x: currentPosition.x - 1,
        y: currentPosition.y + 1,
      };
    case Direction.DOWN_AND_RIGHT:
      return {
        x: currentPosition.x + 1,
        y: currentPosition.y + 1,
      };
    case Direction.UP_AND_LEFT:
      return {
        x: currentPosition.x - 1,
        y: currentPosition.y - 1,
      };
    case Direction.UP_AND_RIGHT:
      return {
        x: currentPosition.x + 1,
        y: currentPosition.y - 1,
      };
    default:
      return currentPosition;
  }
};
