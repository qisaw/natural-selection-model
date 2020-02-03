import { Player } from './player';
import { Position } from './types';
import { Ground } from '../ground/types';

enum Direction {
  UP,
  DOWN,
  LEFT,
  RIGHT,
}

const getRandomDirection = (availableDirections: Direction[]): Direction => {
  const sparator = 1 / availableDirections.length;
  const randomValue = Math.random();
  const index = Math.ceil(randomValue / sparator) - 1;
  return availableDirections[index];
};

const getDirection = (xValue: number, yValue: number, ground: Ground): Direction => {
  if (yValue === 0 && xValue === 0) {
    return getRandomDirection([Direction.DOWN, Direction.RIGHT]);
  }
  if (yValue === 0 && xValue === ground.dimensions.width - 1) {
    return getRandomDirection([Direction.DOWN, Direction.LEFT]);
  }
  if (yValue === ground.dimensions.height - 1 && xValue === 0) {
    return getRandomDirection([Direction.UP, Direction.RIGHT]);
  }
  if (yValue === ground.dimensions.height - 1 && xValue === ground.dimensions.width - 1) {
    return getRandomDirection([Direction.UP, Direction.LEFT]);
  }
  if (yValue === 0) {
    return getRandomDirection([Direction.DOWN, Direction.LEFT, Direction.RIGHT]);
  }
  if (xValue === 0) {
    return getRandomDirection([Direction.UP, Direction.DOWN, Direction.RIGHT]);
  }
  if (yValue === ground.dimensions.height - 1) {
    return getRandomDirection([Direction.UP, Direction.LEFT, Direction.RIGHT]);
  }
  if (xValue === ground.dimensions.width - 1) {
    return getRandomDirection([Direction.UP, Direction.DOWN, Direction.LEFT]);
  }
  return getRandomDirection([Direction.UP, Direction.DOWN, Direction.LEFT, Direction.RIGHT]);
};

export const getNewPlayerPosition = (player: Player, ground: Ground): Position => {
  const direction = getDirection(player.position.x, player.position.y, ground);
  switch (direction) {
    case Direction.UP:
      return {
        x: player.position.x,
        y: player.position.y - 1,
      };
    case Direction.DOWN:
      return {
        x: player.position.x,
        y: player.position.y + 1,
      };
    case Direction.LEFT:
      return {
        x: player.position.x - 1,
        y: player.position.y,
      };
    case Direction.RIGHT:
      return {
        x: player.position.x + 1,
        y: player.position.y,
      };
  }
};
