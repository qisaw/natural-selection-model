import { Ground } from './types';
import { performAction } from '../player/perform-action';
import { getPlayerMovementsForTurns } from './get-player-movements-for-turn';
import { createPlayer } from '../player';

export const makeMove = (ground: Ground): Ground => {
  const { players: allPlayers } = ground;
  const players = allPlayers.filter(({ timeToLive }) => timeToLive > 0);

  let newGround = { ...ground, players };
  for (const [, playersToMove] of getPlayerMovementsForTurns(players)) {
    newGround = playersToMove.reduce((nextGround, player) => performAction(player, nextGround), ground);
  }
  const finalPlayers = newGround.players.map(player => createPlayer({ ...player, timeToLive: player.timeToLive - 1 }));
  return { ...newGround, players: finalPlayers };
};
