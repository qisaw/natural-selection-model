import deepEqual from 'deep-equal';

import { getNewPlayerPosition } from './get-new-player-position';
import { Player } from './player';
import { Ground } from '../ground/types';
import { isOnOuterEdge } from '../ground/is-on-outer-edge';

export const canReproduce = (player: Player, ground: Ground): boolean => {
  if (!isOnOuterEdge(player.position, ground)) {
    return false;
  }
  // @TODO, just find an empty spot
  if (deepEqual(getNewPlayerPosition(player, ground), player.position)) {
    return false;
  }
  return player.foodEaten.length >= 2;
};
