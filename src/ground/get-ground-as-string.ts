import { Ground } from './types';

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
            return ` ${playerInSpot.label} `;
          }
          return ' - ';
        })
        .join('|');
      return `|${row}|`;
    })
    .join('\n');
};
