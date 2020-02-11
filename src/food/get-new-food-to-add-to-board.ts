import { GroundDimensions } from '../ground/types';
import { Player } from '../player/player';
import { Food } from './food';
import { createFood } from '.';

const MAX_NUM_OF_ATTEMPTS_TO_GET_EMPTY_FOOD_SPOT = 100;

export const getNewFoodToAddToBoard = (
  idealNumOfFoodToAdd: number,
  dimensions: GroundDimensions,
  players: Player[],
  foodAlreadyExisting: Food[],
): Food[] => {
  const foodArray: Food[] = [];
  for (let i = 0; i < idealNumOfFoodToAdd; i++) {
    let xPosition = Math.round(Math.random() * (dimensions.width - 1));
    let yPosition = Math.round(Math.random() * (dimensions.height - 1));
    let attempts = 1;
    let positionFound = true;
    while (
      !!players.find(({ position }) => position.x === xPosition && position.y === yPosition) ||
      !!foodAlreadyExisting.find(({ position }) => position.x === xPosition && position.y === yPosition) ||
      !!foodArray.find(({ position }) => position.x === xPosition && position.y === yPosition)
    ) {
      if (attempts >= MAX_NUM_OF_ATTEMPTS_TO_GET_EMPTY_FOOD_SPOT) {
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
      const food = createFood({ position, energyAddition: 1000 });
      foodArray.push(food);
    }
  }
  return foodArray;
};
