import { Player } from './player';
import { Position } from '../global/types';
import { Ground } from '../ground/types';
import { Direction } from '../global/direction';

const getRandomDirection = (availableDirections: Direction[]): Direction | void => {
  if (!availableDirections.length) {
    return;
  }
  const sparator = 1 / availableDirections.length;
  const randomValue = Math.random();
  const index = Math.max(Math.ceil(randomValue / sparator) - 1, 0);
  return availableDirections[index];
};

const getNextPosition = (xValue: number, yValue: number, direction: Direction): Position => {
  if (direction === Direction.UP) {
    return {
      x: xValue,
      y: yValue - 1,
    };
  }
  if (direction === Direction.DOWN) {
    return {
      x: xValue,
      y: yValue + 1,
    };
  }
  if (direction === Direction.LEFT) {
    return {
      x: xValue - 1,
      y: yValue,
    };
  }
  if (direction === Direction.RIGHT) {
    return {
      x: xValue + 1,
      y: yValue,
    };
  }
  if (direction === Direction.UP_AND_LEFT) {
    return {
      x: xValue - 1,
      y: yValue - 1,
    };
  }
  if (direction === Direction.UP_AND_RIGHT) {
    return {
      x: xValue + 1,
      y: yValue - 1,
    };
  }
  if (direction === Direction.DOWN_AND_LEFT) {
    return {
      x: xValue - 1,
      y: yValue + 1,
    };
  }
  return {
    x: xValue + 1,
    y: yValue + 1,
  };
};
const isPositionFree = (xValue: number, yValue: number, direction: Direction, ground: Ground): boolean => {
  const nextPosition = getNextPosition(xValue, yValue, direction);
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

const getDirection = (player: Player, ground: Ground): Direction | void => {
  const canMoveUp = player.position.y > 0;
  const canMoveDown = player.position.y < ground.dimensions.height - 1;
  const canMoveLeft = player.position.x > 0;
  const canMoveRight = player.position.x < ground.dimensions.width - 1;
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
  const directionsAvailableToPlayer = directionArray.filter(
    ({ predicate, value }) => predicate && isPositionFree(player.position.x, player.position.y, value, ground),
  );
  const directionsPlayerHasYetToMoveTo = directionsAvailableToPlayer.filter(({ value }) => {
    const possibleNextPosition = getNextPosition(player.position.x, player.position.y, value);
    return !player.previousPositions.has(possibleNextPosition);
  });
  const availableDirections = directionsPlayerHasYetToMoveTo.length
    ? directionsPlayerHasYetToMoveTo
    : directionsAvailableToPlayer;
  return getRandomDirection(availableDirections.map(({ value }) => value));
};

export const getNewPlayerPosition = (player: Player, ground: Ground): Position => {
  // @TODO error checking for player in ground
  const direction = getDirection(player, ground);
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
