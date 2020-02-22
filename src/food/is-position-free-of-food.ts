import { Position } from '../global/types';
import { Ground } from '../ground/types';

export const isPositionFreeOfFood = (position: Position, ground: Ground): boolean => {
  if (
    position.x > ground.dimensions.width - 1 ||
    position.x < 0 ||
    position.y > ground.dimensions.height - 1 ||
    position.y < 0
  ) {
    return false;
  }
  const playerAtPosition = ground.food.find(
    ({ position: positionOfFood }) => positionOfFood.x === position.x && positionOfFood.y === position.y,
  );
  return !playerAtPosition;
};
