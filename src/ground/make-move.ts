import { Ground } from './types';
import { Player } from '../player/player';
import { getNewPlayerPosition } from '../player/get-new-player-position';
import { createPlayer } from '../player';

export const makeMove = (ground: Ground): Ground => {
  const { players } = ground;
  const playersWithUpdatedPositions = players.map(
    (player: Player): Player => {
      const newPosition = getNewPlayerPosition(player, ground);
      return createPlayer({ ...player, position: newPosition });
    },
  );
  return {
    ...ground,
    players: playersWithUpdatedPositions,
  };
};
