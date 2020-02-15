import { GroundDimensions } from '../ground/types';
import { Player } from './player';
import { createPlayer } from '.';
import { Food } from '../food/food';
import { maxNumOfAttemptsToGetEmptySpot } from '../settings';

export const createPlayersInRandomPositions = (
  idealNumOfPlayersToAdd: number,
  dimensions: GroundDimensions,
  existingPlayers: Player[],
  foodAlreadyExisting: Food[],
): Player[] => {
  const players: Player[] = [];
  for (let i = 0; i < idealNumOfPlayersToAdd; i++) {
    let xPosition = Math.round(Math.random() * (dimensions.width - 1));
    let yPosition = Math.round(Math.random() * (dimensions.height - 1));
    let attempts = 1;
    let positionFound = true;
    while (
      !!foodAlreadyExisting.find(({ position }) => position.x === xPosition && position.y === yPosition) ||
      !!existingPlayers.find(({ position }) => position.x === xPosition && position.y === yPosition) ||
      !!players.find(({ position }) => position.x === xPosition && position.y && yPosition)
    ) {
      if (attempts >= maxNumOfAttemptsToGetEmptySpot()) {
        positionFound = false;
        break;
      }
      xPosition = Math.round(Math.random() * (dimensions.width - 1));
      yPosition = Math.round(Math.random() * (dimensions.height - 1));
      attempts++;
    }
    if (positionFound) {
      const position = {
        x: xPosition,
        y: yPosition,
      };
      const label = 'x';
      const speed = 2;
      players.push(createPlayer({ position, label, speed }));
    }
  }
  return players;
};
