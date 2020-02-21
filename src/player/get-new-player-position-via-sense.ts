import { Player } from './player';
import { Ground } from '../ground/types';
import { Position } from '../global/types';

export const getNewPlayerPositionViaSense = (player: Player, ground: Ground): Position | void => {
  if (player.sense === 0) {
    return;
  }
  if (ground.food.length === 0) {
    return;
  }
  if (!ground.players.find(({ id }) => id === player.id)) {
    return;
  }
};
