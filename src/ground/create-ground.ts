import { v4 as uuid } from 'uuid';

import { Player } from '../player/player';
import { InvalidDimensionsError } from './errors';
import { PlayersOutsideGridError } from '../player/errors';
import { GroundCreation, Ground, GroundDimensions } from './types';
import { Food } from '../food/food';
import { Position } from '../global/types';
import { FoodOutsideGridError } from '../food/errors';

const defaultDimensions = {
  height: 10,
  width: 10,
};
const defaultPlayers: Player[] = [];

const defaultFood: Food[] = [];

interface WithPositions {
  position: Position;
}
const getInvalidPositionedItems = <T extends WithPositions>(things: T[], dimensions: GroundDimensions): T[] =>
  things.filter(({ position: { x, y } }) => x >= dimensions.width || x < 0 || y >= dimensions.height || y < 0);

// @TODO enforce that food and players don't intersect
export const createGround = ({
  dimensions = defaultDimensions,
  players = defaultPlayers,
  food = defaultFood,
}: GroundCreation): Ground => {
  if (dimensions.height < 2 || dimensions.width < 2) {
    throw new InvalidDimensionsError(dimensions);
  }
  const invalidPositionsOfPlayers = getInvalidPositionedItems(players, dimensions);
  if (invalidPositionsOfPlayers.length) {
    throw new PlayersOutsideGridError(invalidPositionsOfPlayers);
  }
  const invalidPositionsOfFood = getInvalidPositionedItems(food, dimensions);
  if (invalidPositionsOfFood.length) {
    throw new FoodOutsideGridError(invalidPositionsOfFood);
  }
  const id = uuid();
  return {
    dimensions,
    players,
    id,
    food,
  };
};
