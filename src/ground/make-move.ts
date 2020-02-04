import groupBy from 'lodash.groupby';
import { Ground } from './types';
import { getNewPlayerPosition } from '../player/get-new-player-position';
import { createPlayer } from '../player';
import { Player } from '../player/player';

type groupedPlayers = {
  playersDeadThisTurn: Player[] | void;
  playersStillAlive: Player[] | void;
};
export const makeMove = (ground: Ground): Ground => {
  const { players } = ground;
  // @TODO don't run in the same order constantly. This will give players at the beginning of the array
  // priority and therefore an advantage compared to players at the end of the array.
  // This is because if there 2 or more players are competing for a piece of food,
  // the player earlier in the array will always get the food first.
  // We'd want to sort the array in a random manner each call of makeMove
  const newGround = players.reduce((newGround, player, idx) => {
    if (player.energyAddition === 0) {
      return newGround;
    }
    const newPosition = getNewPlayerPosition(player, newGround);
    // @TODO ensure we don't change the energy if the player didn't move
    const newPlayer = createPlayer({ ...player, position: newPosition, energy: player.energyAddition - 1 });
    const newPlayerArray = [...newGround.players.slice(0, idx), newPlayer, ...newGround.players.slice(idx + 1)];
    return { ...newGround, players: newPlayerArray };
  }, ground);
  // @TODO be careful when implementing eating that we don't have a dead person eaten more than once
  // We might need to refactor the order of this when we do this. But for now it works and is super simple.
  const { playersDeadThisTurn, playersStillAlive } = groupBy(newGround.players, player =>
    player.energyAddition === 0 ? 'playersDeadThisTurn' : 'playersStillAlive',
  ) as groupedPlayers;
  return {
    ...newGround,
    playersDeadThisTurn: playersDeadThisTurn || [],
    players: playersStillAlive || [],
  };
};
