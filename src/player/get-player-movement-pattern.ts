import { Player } from './player';
import { knuthShuffle } from 'knuth-shuffle';
import { PlayerMovementPattern } from './types';

export const getPlayerMovementPattern = (players: Player[], maxTurns: number): PlayerMovementPattern => {
  return players.reduce((allPlayers: PlayerMovementPattern, player: Player) => {
    const playerMovenment = knuthShuffle(new Array(maxTurns).fill(true, 0, player.speed).fill(false, player.speed));
    allPlayers.set(player, playerMovenment);
    return allPlayers;
  }, new Map() as PlayerMovementPattern);
};
