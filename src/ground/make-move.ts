import { Ground } from './types';
import { performAction } from '../player/perform-action';
import { knuthShuffle } from 'knuth-shuffle';

export const makeMove = (ground: Ground): Ground => {
  const { players } = ground;
  return knuthShuffle([...players]).reduce((nextGround, player) => performAction(player, nextGround), ground);
};
