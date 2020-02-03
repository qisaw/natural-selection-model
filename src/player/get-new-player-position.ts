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
  const directionArray = [
    { value: Direction.UP, predicate: yValue > 0 },
    { value: Direction.DOWN, predicate: yValue < ground.dimensions.height - 1 },
    { value: Direction.LEFT, predicate: xValue > 0 },
    { value: Direction.RIGHT, predicate: xValue < ground.dimensions.width - 1 },
  ];
  const availableDirections = directionArray.filter(({ predicate }) => predicate).map(({ value }) => value);
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
  }
};
