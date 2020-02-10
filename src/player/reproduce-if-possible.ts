import { Player } from './player';
import { Ground } from '../ground/types';
import { getNewPlayerPosition } from './get-new-player-position';
import { createPlayer } from '.';
import { canReproduce } from './can-reproduce';
import { shouldMutateSpeed } from '../settings';

export const reproduceIfPossible = (player: Player, ground: Ground): Player[] => {
  if (canReproduce(player, ground)) {
    const newPosition = getNewPlayerPosition(player, ground);
    let newSpeed;
    if (shouldMutateSpeed()) {
      const rand = Math.random();
      if (rand <= 0.333) {
        newSpeed = player.speed;
      } else if (rand <= 0.666) {
        newSpeed = player.speed + 1;
      } else {
        newSpeed = Math.max(1, player.speed - 1);
      }
    } else {
      newSpeed = player.speed;
    }
    return [createPlayer({ ...player, speed: newSpeed, id: undefined, position: newPosition, foodEaten: [] })];
  }
  return [];
};
