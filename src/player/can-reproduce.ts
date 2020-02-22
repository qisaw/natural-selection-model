import { Player } from './player';
import { Ground } from '../ground/types';
import { isOnOuterEdge } from '../ground/is-on-outer-edge';
import { getFreePostionsAroundPlayer } from './get-free-positions-around-player';

export const canReproduce = (player: Player, ground: Ground): boolean => {
  if (!isOnOuterEdge(player.position, ground)) {
    return false;
  }
  return player.foodEaten.length >= 2 && !!getFreePostionsAroundPlayer(player, ground, false).length;
};
