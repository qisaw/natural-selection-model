import { Player } from './player';
import { Ground } from '../ground/types';
import { Direction } from '../global/direction';
import { Position } from '../global/types';
import { Food } from '../food/food';
import { isPositionFreeOfPlayers } from './is-position-free-of-players';
import { getPositionFromDirection } from '../utils/get-position-from-direction';

const getNextDirectionToTargetPosition = (currentPosition: Position, targetPosition: Position): Direction => {
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
  return Direction.NO_DIRECTION;
};

export const getMovementDirectionViaSense = (player: Player, ground: Ground): Direction => {
  if (player.sense === 0) {
    return Direction.NO_DIRECTION;
  }
  if (ground.food.length === 0) {
    return Direction.NO_DIRECTION;
  }
  if (!ground.players.find(({ id }) => id === player.id)) {
    return Direction.NO_DIRECTION;
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
    return Direction.NO_DIRECTION;
  }
  const nextDirection = getNextDirectionToTargetPosition(player.position, bestFoodWithinSense.position);
  const nextPosition = getPositionFromDirection(player.position, nextDirection);
  return isPositionFreeOfPlayers(nextPosition, ground) ? nextDirection : Direction.NO_DIRECTION;
};
