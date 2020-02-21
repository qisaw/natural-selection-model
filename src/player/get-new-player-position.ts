import { Player } from './player';
import { Position } from '../global/types';
import { Ground } from '../ground/types';
import { Direction } from '../global/direction';
import { getPositionFromDirection } from '../utils/get-position-from-direction';

const getRandomDirection = (availableDirections: Direction[]): Direction => {
  if (!availableDirections.length) {
    return Direction.NO_DIRECTION;
  }
  const sparator = 1 / availableDirections.length;
  const randomValue = Math.random();
  const index = Math.max(Math.ceil(randomValue / sparator) - 1, 0);
  return availableDirections[index];
};

const isPositionFree = (xValue: number, yValue: number, direction: Direction, ground: Ground): boolean => {
  const nextPosition = getPositionFromDirection({ x: xValue, y: yValue }, direction);
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

const getDirection = (player: Player, ground: Ground): Direction => {
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
    const possibleNextPosition = getPositionFromDirection(player.position, value);
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
  return getPositionFromDirection(player.position, direction);
};
