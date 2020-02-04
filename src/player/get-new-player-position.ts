import { Player } from './player';
import { Position } from '../global/types';
import { Ground } from '../ground/types';

enum Direction {
  UP,
  DOWN,
  LEFT,
  RIGHT,
}

const getRandomDirection = (availableDirections: Direction[]): Direction | void => {
  if (!availableDirections.length) {
    return;
  }
  const sparator = 1 / availableDirections.length;
  const randomValue = Math.random();
  const index = Math.max(Math.ceil(randomValue / sparator) - 1, 0);
  return availableDirections[index];
};

const isPositionFree = (xValue: number, yValue: number, direction: Direction, ground: Ground): boolean => {
  let nextPosition: Position;
  if (direction === Direction.UP) {
    nextPosition = {
      x: xValue,
      y: yValue - 1,
    };
  } else if (direction === Direction.DOWN) {
    nextPosition = {
      x: xValue,
      y: yValue + 1,
    };
  } else if (direction === Direction.LEFT) {
    nextPosition = {
      x: xValue - 1,
      y: yValue,
    };
  } else {
    nextPosition = {
      x: xValue + 1,
      y: yValue,
    };
  }
  if (
    nextPosition.x > ground.dimensions.width - 1 ||
    nextPosition.x < 0 ||
    nextPosition.y > ground.dimensions.height - 1 ||
    nextPosition.y < 0
  ) {
    return false;
  }
  const playerAtPosition = ground.players.find(
    ({ position }) => position.x === nextPosition.x && position.y === nextPosition.y,
  );
  return !playerAtPosition;
};

const getDirection = (xValue: number, yValue: number, ground: Ground): Direction | void => {
  const directionArray = [
    { value: Direction.UP, predicate: yValue > 0 },
    { value: Direction.DOWN, predicate: yValue < ground.dimensions.height - 1 },
    { value: Direction.LEFT, predicate: xValue > 0 },
    { value: Direction.RIGHT, predicate: xValue < ground.dimensions.width - 1 },
  ];
  const availableDirections = directionArray
    .filter(({ predicate, value }) => predicate && isPositionFree(xValue, yValue, value, ground))
    .map(({ value }) => value);
  return getRandomDirection(availableDirections);
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
    default:
      return {
        ...player.position,
      };
  }
};
