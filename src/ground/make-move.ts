import { Ground } from './types';
import { getNewPlayerPosition } from '../player/get-new-player-position';
import { createPlayer } from '../player';

export const makeMove = (ground: Ground): Ground => {
  const { players } = ground;
  return players.reduce((newGround, player, idx) => {
    const newPosition = getNewPlayerPosition(player, newGround);
    const newPlayer = createPlayer({ ...player, position: newPosition });
    const newPlayerArray = [...newGround.players.slice(0, idx), newPlayer, ...newGround.players.slice(idx + 1)];
    return { ...newGround, players: newPlayerArray };
  }, ground);
};
