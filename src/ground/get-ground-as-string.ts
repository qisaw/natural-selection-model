import { Ground } from './types';
import { Position } from '../global/types';

type HasPosition = {
  position: Position;
};

export const getGroundAsString = (ground: Ground): string => {
  return new Array(ground.dimensions.height)
    .fill(null)
    .map((_, rowNumber) => {
      const predicateForRow = ({ position: { x } }: HasPosition): boolean => rowNumber === x;
      const playersInThisRow = ground.players.filter(predicateForRow);
      const foodInThisRow = ground.food.filter(predicateForRow);
      const row = new Array(ground.dimensions.width)
        .fill(null)
        .map((_, columnNumber) => {
          const predicateForSpot = ({ position: { y } }: HasPosition): boolean => columnNumber === y;
          const playerInSpot = playersInThisRow.find(predicateForSpot);
          if (playerInSpot) {
            return ` ${playerInSpot.label} `;
          }
          const foodInSpot = foodInThisRow.find(predicateForSpot);
          if (foodInSpot) {
            return ` ${foodInSpot.label} `;
          }
          return ' - ';
        })
        .join('|');
      return `|${row}|`;
    })
    .join('\n');
};
