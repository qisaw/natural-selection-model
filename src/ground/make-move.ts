import { Ground } from './types';
import { performAction } from '../player/perform-action';
import { getPlayerMovementsForTurns } from './get-player-movements-for-turn';

export const makeMove = (ground: Ground): Ground => {
  const { players } = ground;
  let newGround = ground;
  for (const [, playersToMove] of getPlayerMovementsForTurns(players)) {
    newGround = playersToMove.reduce((nextGround, player) => performAction(player, nextGround), ground);
  }
  return newGround;
};
