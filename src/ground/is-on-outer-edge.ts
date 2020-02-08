import { Position } from '../global/types';
import { Ground } from './types';

export const isOnOuterEdge = (position: Position, { dimensions }: Ground): boolean => {
  if (
    position.x === 0 ||
    position.x === dimensions.width - 1 ||
    position.y === 0 ||
    position.y === dimensions.height - 1
  ) {
    // check whether the position is outside the ground dimensions
    if (position.x >= dimensions.width || position.x < 0 || position.y >= dimensions.height || position.y < 0) {
      return false;
    }
    return true;
  }
  return false;
};
