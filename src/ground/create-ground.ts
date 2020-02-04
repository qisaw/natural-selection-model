import uuid from 'uuid';

import { Player } from '../player/player';
import { InvalidDimensionsError } from './errors';
import { PlayersOutsideGridError } from '../player/errors';
import { GroundCreation, Ground } from './types';
import { Food } from '../food/food';

const defaultDimensions = {
  height: 10,
  width: 10,
};
const defaultPlayers: Player[] = [];

const defaultFood: Food[] = [];

export const createGround = ({
  dimensions = defaultDimensions,
  players = defaultPlayers,
  food = defaultFood,
}: GroundCreation): Ground => {
  if (dimensions.height < 2 || dimensions.width < 2) {
    throw new InvalidDimensionsError(dimensions);
  }
  const invalidPositionsOfPlayers = players.filter(
    ({ position: { x, y } }) => x >= dimensions.width || x < 0 || y >= dimensions.height || y < 0,
  );
  if (invalidPositionsOfPlayers.length) {
    throw new PlayersOutsideGridError(players);
  }
  const id = uuid();
  return {
    dimensions,
    players,
    id,
    food,
    playersDeadThisTurn: [],
  };
};
