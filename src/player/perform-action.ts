import { Player } from './player';
import { Ground } from '../ground/types';
import { createPlayer } from '.';
import { getNewPlayerPosition } from './get-new-player-position';
import { PlayerNotInGroundError } from '../ground/errors';
import { getFoodFromGround } from '../food/get-food-from-ground';

export const performAction = (player: Player, ground: Ground): Ground => {
  const idx = ground.players.findIndex(({ id }: Player): boolean => id === player.id);
  if (idx === -1) {
    throw new PlayerNotInGroundError(player, ground);
  }
  if (player.energy === 0) {
    return { ...ground, players: ground.players.filter(({ id }: Player): boolean => id !== player.id) };
  }
  const newPosition = getNewPlayerPosition(player, ground);
  let newEnergy =
    newPosition.x === player.position.x && newPosition.y === player.position.y ? player.energy : player.energy - 1;
  const food = getFoodFromGround(ground, newPosition);
  let updatedFood = ground.food;
  if (food) {
    updatedFood = updatedFood.filter(({ id }) => id !== food.id);
    newEnergy += food.energyAddition;
  }
  const newPlayer = createPlayer({ ...player, position: newPosition, energy: newEnergy });
  const newPlayerArray = [...ground.players.slice(0, idx), newPlayer, ...ground.players.slice(idx + 1)];
  return {
    ...ground,
    food: updatedFood,
    players: newPlayerArray,
  };
};
