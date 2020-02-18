import { Ground } from './types';
import { performAction } from '../player/perform-action';
import { getPlayerMovementsForTurns } from './get-player-movements-for-turn';
import { createPlayer } from '../player';
import { useTimeToLive } from '../settings';

export const makeMove = (ground: Ground): Ground => {
  const { players: allPlayers } = ground;
  let newGround = ground;
  let players = ground.players;
  if (useTimeToLive()) {
    players = allPlayers.filter(({ timeToLive }) => timeToLive > 0);
    newGround = { ...ground, players };
  }
  for (const [, playersToMove] of getPlayerMovementsForTurns(players)) {
    newGround = playersToMove.reduce((nextGround, player) => performAction(player, nextGround), ground);
  }
  if (useTimeToLive()) {
    const finalPlayers = newGround.players.map(player =>
      createPlayer({ ...player, timeToLive: player.timeToLive - 1 }),
    );
    return { ...newGround, players: finalPlayers };
  }
  return newGround;
};
