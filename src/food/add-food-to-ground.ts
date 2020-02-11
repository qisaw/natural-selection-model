import { Ground } from '../ground/types';
import { Food } from './food';
import { createGround } from '../ground/create-ground';
import { createPlayer } from '../player';

export const addNewFoodToGround = (ground: Ground, foodToAdd: Food[]): Ground => {
  if (!foodToAdd.length) {
    return ground;
  }
  const players = ground.players.map(player => createPlayer({ ...player, previousPositions: new Set() }));
  const food = [...ground.food, ...foodToAdd];
  return createGround({ ...ground, food, players });
};
