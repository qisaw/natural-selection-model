import uuid from 'uuid';

import { Player } from '../player/player';
import { InvalidDimensionsError } from './errors';
import { PlayersOutsideGridError } from '../player/errors';
import { GroundCreation, Ground } from './types';

const defaultDimensions = {
  height: 10,
  width: 10,
};
const defaultPlayers: Player[] = [];

export const createGround = ({ dimensions = defaultDimensions, players = defaultPlayers }: GroundCreation): Ground => {
  if (dimensions.height < 1 || dimensions.width < 1) {
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
  };
};
