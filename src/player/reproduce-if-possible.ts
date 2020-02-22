import { Player } from './player';
import { Ground } from '../ground/types';
import { createPlayer } from '.';
import { canReproduce } from './can-reproduce';
import { shouldMutateSpeed, defaultPlayerTimeToLive, mutateSense } from '../settings';
import { DeepSet } from '../utils/deep-set';
import { getFreePostionsAroundPlayer } from './get-free-positions-around-player';

interface ReproductionResult {
  originalPlayer: Player;
  newPlayers: Player[];
}

const getValueOfChild = (preCondition: () => boolean) => (parentValue: number): number => {
  if (preCondition()) {
    const rand = Math.random();
    if (rand <= 0.333) {
      return parentValue;
    } else if (rand <= 0.666) {
      return parentValue + 1;
    }
    return Math.max(1, parentValue - 1);
  }
  return parentValue;
};

export const reproduceIfPossible = (player: Player, ground: Ground): ReproductionResult => {
  if (canReproduce(player, ground)) {
    const newPosition = getFreePostionsAroundPlayer(player, ground, false)[0];
    const newSpeed = getValueOfChild(shouldMutateSpeed)(player.speed);
    const newSense = getValueOfChild(mutateSense)(player.sense);
    const originalPlayer = { ...player, foodEaten: player.foodEaten.slice(2) };
    const newPlayer = createPlayer({
      ...player,
      speed: newSpeed,
      sense: newSense,
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
