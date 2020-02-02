import { Player } from './player';
import { Position } from './types';
import { Ground } from '../ground/types';

enum Direction {
  UP,
  DOWN,
  LEFT,
  RIGHT,
}

const getDirectionWhenAllDirectionsAvailable = (): Direction => {
  const randomValue = Math.random();
  if (randomValue < 0.25) {
    return Direction.UP;
  }
  if (randomValue < 0.5) {
    return Direction.DOWN;
  }
  if (randomValue < 0.75) {
    return Direction.LEFT;
  }
  return Direction.RIGHT;
};
const getDirectionWhenInTopRow = (): Direction => {
  const randomValue = Math.random();
  if (randomValue < 0.33) {
    return Direction.DOWN;
  }
  if (randomValue < 0.66) {
    return Direction.LEFT;
  }
  return Direction.RIGHT;
};
const getDirectionWhenInLeftMostRow = (): Direction => {
  const randomValue = Math.random();
  if (randomValue < 0.33) {
    return Direction.UP;
  }
  if (randomValue < 0.66) {
    return Direction.DOWN;
  }
  return Direction.RIGHT;
};
const getDirectionWhenInBottomRow = (): Direction => {
  const randomValue = Math.random();
  if (randomValue < 0.33) {
    return Direction.UP;
  }
  if (randomValue < 0.66) {
    return Direction.LEFT;
  }
  return Direction.RIGHT;
};
const getDirectionWhenInRightMostRow = (): Direction => {
  const randomValue = Math.random();
  if (randomValue < 0.33) {
    return Direction.UP;
  }
  if (randomValue < 0.66) {
    return Direction.DOWN;
  }
  return Direction.LEFT;
};
const getDirectionWhenInTopLeftCorner = (): Direction => {
  const randomValue = Math.random();
  if (randomValue < 0.5) {
    return Direction.DOWN;
  }
  return Direction.RIGHT;
};
const getDirectionWhenInTopRightCorner = (): Direction => {
  const randomValue = Math.random();
  if (randomValue < 0.5) {
    return Direction.DOWN;
  }
  return Direction.LEFT;
};
const getDirectionWhenInBottomLeftCorner = (): Direction => {
  const randomValue = Math.random();
  if (randomValue < 0.5) {
    return Direction.UP;
  }
  return Direction.RIGHT;
};
const getDirectionWhenInBottomRightCorner = (): Direction => {
  const randomValue = Math.random();
  if (randomValue < 0.5) {
    return Direction.UP;
  }
  return Direction.LEFT;
};
const getDirection = (xValue: number, yValue: number, ground: Ground): Direction => {
  if (yValue === 0 && xValue === 0) {
    return getDirectionWhenInTopLeftCorner();
  }
  if (yValue === 0 && xValue === ground.dimensions.width - 1) {
    return getDirectionWhenInTopRightCorner();
  }
  if (yValue === ground.dimensions.height - 1 && xValue === 0) {
    return getDirectionWhenInBottomLeftCorner();
  }
  if (yValue === ground.dimensions.height - 1 && xValue === ground.dimensions.width - 1) {
    return getDirectionWhenInBottomRightCorner();
  }
  if (yValue === 0) {
    return getDirectionWhenInTopRow();
  }
  if (xValue === 0) {
    return getDirectionWhenInLeftMostRow();
  }
  if (yValue === ground.dimensions.height - 1) {
    return getDirectionWhenInBottomRow();
  }
  if (xValue === ground.dimensions.width - 1) {
    return getDirectionWhenInRightMostRow();
  }
  return getDirectionWhenAllDirectionsAvailable();
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
