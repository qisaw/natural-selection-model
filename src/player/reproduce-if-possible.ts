import { Player } from './player';
import { Ground } from '../ground/types';
import { getNewPlayerPosition } from './get-new-player-position';
import { createPlayer } from '.';
import { canReproduce } from './can-reproduce';
import { shouldMutateSpeed } from '../settings';
import { DeepSet } from '../utils/deep-set';

interface ReproductionResult {
  originalPlayer: Player;
  newPlayers: Player[];
}

export const reproduceIfPossible = (player: Player, ground: Ground): ReproductionResult => {
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
    const originalPlayer = { ...player, foodEaten: player.foodEaten.slice(2) };
    const newPlayer = createPlayer({
      ...player,
      speed: newSpeed,
      id: undefined,
      position: newPosition,
      foodEaten: [],
      previousPositions: new DeepSet(),
    });
    return {
      originalPlayer,
      newPlayers: [newPlayer],
    };
  }
  return {
    originalPlayer: player,
    newPlayers: [],
  };
};
