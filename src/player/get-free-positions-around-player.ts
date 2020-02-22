import { Player } from './player';
import { Position } from '../global/types';
import { Direction } from '../global/direction';
import { isPositionFreeOfPlayers } from './is-position-free-of-players';
import { getPositionFromDirection } from '../utils/get-position-from-direction';
import { isPositionFreeOfFood } from '../food/is-position-free-of-food';
import { Ground } from '../ground/types';

export const getFreePostionsAroundPlayer = (
  player: Player,
  ground: Ground,
  allowPositionsWithFood: boolean,
): Position[] => {
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
  return directionArray.reduce((allowedPositions, nextDirection) => {
    if (!nextDirection.predicate) {
      return allowedPositions;
    }
    const position = getPositionFromDirection(player.position, nextDirection.value);
    if (!isPositionFreeOfPlayers(position, ground)) {
      return allowedPositions;
    }
    if (!allowPositionsWithFood && !isPositionFreeOfFood(position, ground)) {
      return allowedPositions;
    }
    allowedPositions.push(position);
    return allowedPositions;
  }, [] as Position[]);
};
