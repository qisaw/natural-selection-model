import { Position } from '../global/types';
import { Ground } from '../ground/types';

export const isPositionFreeOfPlayers = (position: Position, ground: Ground): boolean => {
  if (
    position.x > ground.dimensions.width - 1 ||
    position.x < 0 ||
    position.y > ground.dimensions.height - 1 ||
    position.y < 0
  ) {
    return false;
  }
  const playerAtPosition = ground.players.find(
    ({ position: playerAtPosition }) => playerAtPosition.x === position.x && playerAtPosition.y === position.y,
  );
  return !playerAtPosition;
};
