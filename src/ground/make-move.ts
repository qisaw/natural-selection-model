import { Ground } from './types';
import { performAction } from '../player/perform-action';

export const makeMove = (ground: Ground): Ground => {
  const { players } = ground;
  // @TODO don't run in the same order constantly. This will give players at the beginning of the array
  // priority and therefore an advantage compared to players at the end of the array.
  // This is because if there 2 or more players are competing for a piece of food,
  // the player earlier in the array will always get the food first.
  // We'd want to sort the array in a random manner each call of makeMove
  return players.reduce((nextGround, player) => performAction(player, nextGround), ground);
};
