import { Player } from './player';
import { Ground } from '../ground/types';
import { Direction } from '../global/direction';
import { Position } from '../global/types';

const getNextDirectionToTargetPosition = (currentPosition: Position, targetPosition: Position): Direction | void => {
  if (currentPosition.x < targetPosition.x) {
    if (currentPosition.y === targetPosition.y) {
      return Direction.RIGHT;
    }
    if (currentPosition.y < targetPosition.y) {
      return Direction.DOWN_AND_RIGHT;
    }
    return Direction.UP_AND_RIGHT;
  }
  if (currentPosition.x > targetPosition.x) {
    if (currentPosition.y === targetPosition.y) {
      return Direction.LEFT;
    }
    if (currentPosition.y < targetPosition.y) {
      return Direction.DOWN_AND_LEFT;
    }
    return Direction.UP_AND_LEFT;
  }

  if (currentPosition.y < targetPosition.y) {
    return Direction.DOWN;
  }
  if (currentPosition.y > targetPosition.y) {
    return Direction.UP;
  }
};

export const getMovementDirectionViaSense = (player: Player, ground: Ground): Direction | void => {
  if (player.sense === 0) {
    return;
  }
  if (ground.food.length === 0) {
    return;
  }
  if (!ground.players.find(({ id }) => id === player.id)) {
    return;
  }
  const closesetFoodWithinSense = ground.food.find(({ position: { x, y } }) => {
    const isWithinXSense = x >= player.position.x - 1 && x <= player.position.x + 1;
    const isWithinYSense = y >= player.position.y - 1 && y <= player.position.y + 1;
    return isWithinXSense && isWithinYSense;
  });
  if (!closesetFoodWithinSense) {
    return;
  }
  return getNextDirectionToTargetPosition(player.position, closesetFoodWithinSense.position);
};
