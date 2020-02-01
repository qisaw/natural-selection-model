import { InvalidDimensionsError, PlayersOutsideGridError } from '../errors';
import { info } from './logger';
import { humanReadableLogs } from '../settings';
import { Player } from './player';
import { Ground, GroundCreation } from './common-types';
import uuid from 'uuid/v4';

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

export const getGroundAsString = (ground: Ground): string => {
  return new Array(ground.dimensions.height)
    .fill(null)
    .map((_, rowNumber) => {
      const playersInThisRow = ground.players.filter(({ position: { x } }) => rowNumber === x);
      const row = new Array(ground.dimensions.width)
        .fill(null)
        .map((_, columnNumber) => {
          const playerInSpot = playersInThisRow.find(({ position: { y } }) => columnNumber === y);
          if (playerInSpot) {
            return ' x ';
          }
          return ' - ';
        })
        .join('|');
      return `|${row}|`;
    })
    .join('\n');
};
export const printGround = (ground: Ground): Ground => {
  const groundAsString = getGroundAsString(ground);
  if (humanReadableLogs) {
    // use console.log here so we can line up the board properly
    // eslint-disable-next-line no-console
    console.log('------- ground -------');
    // eslint-disable-next-line no-console
    console.log(groundAsString);
  } else {
    info('board', groundAsString);
  }
  return ground;
};
