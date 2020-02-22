import { Player } from './player';
import { Ground } from '../ground/types';
import { getNewPlayerPosition } from './get-new-player-position';
import { createPlayer } from '.';
import { canReproduce } from './can-reproduce';
import { shouldMutateSpeed, defaultPlayerTimeToLive } from '../settings';
import { DeepSet } from '../utils/deep-set';

interface ReproductionResult {
  originalPlayer: Player;
  newPlayers: Player[];
}

const getSpeedOfChild = (parentSpeed: number): number => {
  if (shouldMutateSpeed()) {
    const rand = Math.random();
    if (rand <= 0.333) {
      return parentSpeed;
    } else if (rand <= 0.666) {
      return parentSpeed + 1;
    }
    return Math.max(1, parentSpeed - 1);
  }
  return parentSpeed;
};

export const reproduceIfPossible = (player: Player, ground: Ground): ReproductionResult => {
  if (canReproduce(player, ground)) {
    // @TODO, just get an empty spot
    const newPosition = getNewPlayerPosition(player, ground);
    const newSpeed = getSpeedOfChild(player.speed);
    const originalPlayer = { ...player, foodEaten: player.foodEaten.slice(2) };
    const newPlayer = createPlayer({
      ...player,
      speed: newSpeed,
      id: undefined,
      position: newPosition,
      foodEaten: [],
      previousPositions: new DeepSet(),
      timeToLive: defaultPlayerTimeToLive(),
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
