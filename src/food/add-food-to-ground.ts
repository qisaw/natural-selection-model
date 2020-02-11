import { Ground } from '../ground/types';
import { Food } from './food';
import { createGround } from '../ground/create-ground';
import { createPlayer } from '../player';
import { DeepSet } from '../utils/deep-set';

export const addNewFoodToGround = (ground: Ground, foodToAdd: Food[]): Ground => {
  if (!foodToAdd.length) {
    return ground;
  }
  const players = ground.players.map(player => createPlayer({ ...player, previousPositions: new DeepSet() }));
  const food = [...ground.food, ...foodToAdd];
  return createGround({ ...ground, food, players });
};
