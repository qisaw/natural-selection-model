import { Player } from './player';
import { Ground } from '../ground/types';
import { createPlayer } from '.';
import { getNewPlayerPosition } from './get-new-player-position';
import { getFoodFromGround } from '../food/get-food-from-ground';
import { reproduceIfPossible } from './reproduce-if-possible';
import { Position } from '../global/types';
import { getEnergyConsumption } from './get-energy-consumption';
import { DeepSet } from '../utils/deep-set';

const setPlayerInPlayersArray = (player: Player, players: Player[]): Player[] => {
  const idx = players.findIndex(({ id }: Player): boolean => id === player.id);
  return [...players.slice(0, idx), player, ...players.slice(idx + 1)];
};
const hasPlayerMoved = (player: Player, position: Position): boolean =>
  position.x !== player.position.x || position.y !== player.position.y;

export const performAction = (player: Player, ground: Ground): Ground => {
  // If the player does not exist in the ground anymore, don't do anything
  if (ground.players.findIndex(({ id }: Player): boolean => id === player.id) === -1) {
    return ground;
  }

  // If the player has no energy left to move, we consider that player dead, and remove them from the board
  if (player.energy <= 0) {
    return { ...ground, players: ground.players.filter(({ id }: Player): boolean => id !== player.id) };
  }

  // First try to reproduce. If we do reproduce, then we don't move that turn.
  const reproductionResult = reproduceIfPossible(player, ground);
  if (reproductionResult.newPlayers.length) {
    const newPlayerArray = [
      ...setPlayerInPlayersArray(reproductionResult.originalPlayer, ground.players),
      ...reproductionResult.newPlayers,
    ];
    return { ...ground, players: newPlayerArray };
  }

  // Try to move
  const newPosition = getNewPlayerPosition(player, ground);
  let newEnergy = hasPlayerMoved(player, newPosition)
    ? Math.max(player.energy - getEnergyConsumption(player), 0)
    : player.energy;

  // See if there is food to eat in the new position
  const food = getFoodFromGround(ground, newPosition);
  let updatedFood = ground.food;
  const playerFood = [...player.foodEaten];
  if (food) {
    updatedFood = updatedFood.filter(({ id }) => id !== food.id);
    newEnergy += food.energyAddition;
    playerFood.push(food);
  }

  const newPlayer = createPlayer({
    ...player,
    position: newPosition,
    energy: newEnergy,
    foodEaten: playerFood,
    previousPositions: new DeepSet(Array.from(player.previousPositions.values())).add(player.position),
  });
  const newPlayerArray = setPlayerInPlayersArray(newPlayer, ground.players);
  return {
    ...ground,
    food: updatedFood,
    players: newPlayerArray,
  };
};
