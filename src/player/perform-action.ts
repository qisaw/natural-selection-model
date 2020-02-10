import { Player } from './player';
import { Ground } from '../ground/types';
import { createPlayer } from '.';
import { getNewPlayerPosition } from './get-new-player-position';
import { getFoodFromGround } from '../food/get-food-from-ground';
import { reproduceIfPossible } from './reproduce-if-possible';
import { Position } from '../global/types';
import { getEnergyConsumption } from './get-energy-consumption';

const setPlayerInPlayersArray = (player: Player, players: Player[]): Player[] => {
  const idx = players.findIndex(({ id }: Player): boolean => id === player.id);
  return [...players.slice(0, idx), player, ...players.slice(idx + 1)];
};
const hasPlayerMoved = (player: Player, position: Position): boolean =>
  position.x !== player.position.x || position.y !== player.position.y;

export const performAction = (player: Player, ground: Ground): Ground => {
  if (ground.players.findIndex(({ id }: Player): boolean => id === player.id) === -1) {
    return ground;
  }
  if (player.energy <= 0) {
    return { ...ground, players: ground.players.filter(({ id }: Player): boolean => id !== player.id) };
  }
  const newPlayers = reproduceIfPossible(player, ground);
  if (newPlayers.length) {
    const updatedPlayer = { ...player, foodEaten: [] };
    const newPlayerArray = [...setPlayerInPlayersArray(updatedPlayer, ground.players), ...newPlayers];
    return { ...ground, players: newPlayerArray };
  }
  const newPosition = getNewPlayerPosition(player, ground);
  let newEnergy = hasPlayerMoved(player, newPosition)
    ? Math.max(player.energy - getEnergyConsumption(player), 0)
    : player.energy;
  const food = getFoodFromGround(ground, newPosition);
  let updatedFood = ground.food;
  if (food) {
    updatedFood = updatedFood.filter(({ id }) => id !== food.id);
    newEnergy += food.energyAddition;
  }
  const newPlayer = createPlayer({ ...player, position: newPosition, energy: newEnergy });
  const newPlayerArray = setPlayerInPlayersArray(newPlayer, ground.players);
  return {
    ...ground,
    food: updatedFood,
    players: newPlayerArray,
  };
};
