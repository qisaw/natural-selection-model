import deepEqual from 'deep-equal';

import { getNewPlayerPosition } from './get-new-player-position';
import { Player } from './player';
import { Ground } from '../ground/types';

export const canReproduce = (player: Player, ground: Ground): boolean => {
  const availablePosition = getNewPlayerPosition(player, ground);
  if (deepEqual(availablePosition, player.position)) {
    return false;
  }
  return player.foodEaten.length >= 2;
};
