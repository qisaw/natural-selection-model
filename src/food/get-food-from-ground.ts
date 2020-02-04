import { Position } from '../global/types';
import { Ground } from '../ground/types';
import { Food } from './food';

export const getFoodFromGround = (ground: Ground, position: Position): Food | void =>
  ground.food.find(({ position: { x, y } }) => x === position.x && y === position.y);
