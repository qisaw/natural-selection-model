import { Ground } from './types';
import { performAction } from '../player/perform-action';
import { getPlayerMovementsForTurns } from './get-player-movements-for-turn';
import { createPlayer } from '../player';
import { useTimeToLive } from '../settings';

export const makeMove = (ground: Ground): Ground => {
  let newGround = ground;
  if (useTimeToLive()) {
    const players = ground.players.filter(({ timeToLive }) => timeToLive > 0);
    newGround = { ...ground, players };
  }
  for (const [, playersToMove] of getPlayerMovementsForTurns(newGround.players)) {
    newGround = playersToMove.reduce((nextGround, nextPlayerId) => {
      const player = nextGround.players.find(({ id }) => nextPlayerId === id);
      if (player) {
        return performAction(player, nextGround);
      }
      return newGround;
    }, newGround);
  }
  if (useTimeToLive()) {
    const finalPlayers = newGround.players.map(player =>
      createPlayer({ ...player, timeToLive: player.timeToLive - 1 }),
    );
    newGround = { ...newGround, players: finalPlayers };
  }
  return newGround;
};
