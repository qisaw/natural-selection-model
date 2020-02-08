import { Player } from './player';
import { Ground } from '../ground/types';
import { getNewPlayerPosition } from './get-new-player-position';
import { createPlayer } from '.';
import { canReproduce } from './can-reproduce';

export const reproduceIfPossible = (player: Player, ground: Ground): Player[] => {
  if (canReproduce(player, ground)) {
    const newPosition = getNewPlayerPosition(player, ground);
    return [createPlayer({ ...player, id: undefined, position: newPosition, foodEaten: [] })];
  }
  return [];
};
