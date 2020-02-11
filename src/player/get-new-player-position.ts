import { Player } from './player';
import { Position } from '../global/types';
import { Ground } from '../ground/types';

enum Direction {
  UP,
  DOWN,
  LEFT,
  RIGHT,
  UP_AND_LEFT,
  UP_AND_RIGHT,
  DOWN_AND_LEFT,
  DOWN_AND_RIGHT,
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
  } else if (direction === Direction.RIGHT) {
    nextPosition = {
      x: xValue + 1,
      y: yValue,
    };
  } else if (direction === Direction.UP_AND_LEFT) {
    nextPosition = {
      x: xValue - 1,
      y: yValue - 1,
    };
  } else if (direction === Direction.UP_AND_RIGHT) {
    nextPosition = {
      x: xValue + 1,
      y: yValue - 1,
    };
  } else if (direction === Direction.DOWN_AND_LEFT) {
    nextPosition = {
      x: xValue - 1,
      y: yValue + 1,
    };
  } else {
    nextPosition = {
      x: xValue + 1,
      y: yValue + 1,
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
  const canMoveUp = yValue > 0;
  const canMoveDown = yValue < ground.dimensions.height - 1;
  const canMoveLeft = xValue > 0;
  const canMoveRight = xValue < ground.dimensions.width - 1;
  const directionArray = [
    { value: Direction.UP, predicate: canMoveUp },
    { value: Direction.DOWN, predicate: canMoveDown },
    { value: Direction.LEFT, predicate: canMoveLeft },
    { value: Direction.RIGHT, predicate: canMoveRight },
    { value: Direction.UP_AND_LEFT, predicate: canMoveUp && canMoveLeft },
    { value: Direction.UP_AND_RIGHT, predicate: canMoveUp && canMoveRight },
    { value: Direction.DOWN_AND_LEFT, predicate: canMoveDown && canMoveLeft },
    { value: Direction.DOWN_AND_RIGHT, predicate: canMoveDown && canMoveRight },
  ];
  const availableDirections = directionArray
    .filter(({ predicate, value }) => predicate && isPositionFree(xValue, yValue, value, ground))
    .map(({ value }) => value);
  return getRandomDirection(availableDirections);
};

export const getNewPlayerPosition = (player: Player, ground: Ground): Position => {
  // @TODO error checking for player in ground
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
    case Direction.DOWN_AND_LEFT:
      return {
        x: player.position.x - 1,
        y: player.position.y + 1,
      };
    case Direction.DOWN_AND_RIGHT:
      return {
        x: player.position.x + 1,
        y: player.position.y + 1,
      };
    case Direction.UP_AND_LEFT:
      return {
        x: player.position.x - 1,
        y: player.position.y - 1,
      };
    case Direction.UP_AND_RIGHT:
      return {
        x: player.position.x + 1,
        y: player.position.y - 1,
      };
    default:
      return {
        ...player.position,
      };
  }
};
