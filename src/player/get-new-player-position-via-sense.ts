import { Player } from './player';
import { Ground } from '../ground/types';
import { Direction } from '../global/direction';
import { Position } from '../global/types';
import { Food } from '../food/food';

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
  const bestFoodWithinSense = ground.food.reduce((bestFood: Food | void, food) => {
    const {
      position: { x, y },
    } = food;
    const isWithinXSense = x >= player.position.x - player.sense && x <= player.position.x + player.sense;
    const isWithinYSense = y >= player.position.y - player.sense && y <= player.position.y + player.sense;
    if (isWithinYSense && isWithinXSense) {
      if (!bestFood) {
        return food;
      }
      return bestFood.energyAddition >= food.energyAddition ? bestFood : food;
    }
    return bestFood;
  }, undefined);
  if (!bestFoodWithinSense) {
    return;
  }
  return getNextDirectionToTargetPosition(player.position, bestFoodWithinSense.position);
};
