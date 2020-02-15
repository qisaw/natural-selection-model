import median from 'median';
import { createGround } from './ground/create-ground';
import { makeMove } from './ground/make-move';
import { getGroundAsString } from './ground/get-ground-as-string';
import { getNewFoodToAddToBoard } from './food/get-new-food-to-add-to-board';
import { addNewFoodToGround } from './food/add-food-to-ground';
import { createPlayersInRandomPositions } from './player/create-players-in-random-positions';

const width = 30;
const height = 30;
const numOfFoodToCreate = 50;
const dimensions = { width, height };
const MAX_TURNS = 1000 * 1000;

const players = createPlayersInRandomPositions(32, dimensions, [], []);
const food = getNewFoodToAddToBoard(numOfFoodToCreate, dimensions, players, []);

const initialGround = createGround({
  dimensions,
  players,
  food,
});

const main = (): void => {
  let ground = initialGround;
  // eslint-disable-next-line no-console
  console.log('--------- ground --------- turn 0 ---------');
  // eslint-disable-next-line no-console
  console.log(getGroundAsString(ground));
  let turnNumber = 0;
  while (ground.players.length && turnNumber < MAX_TURNS) {
    ground = makeMove(ground);
    if (turnNumber % 1000 === 0 && turnNumber > 0) {
      const newFood = getNewFoodToAddToBoard(numOfFoodToCreate, dimensions, ground.players, ground.food);
      ground = addNewFoodToGround(ground, newFood);
    }
    // eslint-disable-next-line no-console
    console.clear();
    // eslint-disable-next-line no-console
    console.log(`--------- ground --------- turn ${turnNumber + 1} ---------`);
    // eslint-disable-next-line no-console
    console.log(getGroundAsString(ground));
    // eslint-disable-next-line no-console
    console.log('------------------------ results ------------------------');
    const playerSpeeds = ground.players.map(({ speed }) => speed);
    const meanSpeed = playerSpeeds.reduce((sum, next) => sum + next, 0) / playerSpeeds.length;
    const medianSpeed = median(playerSpeeds);
    // eslint-disable-next-line no-console
    console.log(`Num of Players: ${ground.players.length}`);
    // eslint-disable-next-line no-console
    console.log(`Num of Food: ${ground.food.length}`);
    // eslint-disable-next-line no-console
    console.log(`Mean Speed: ${meanSpeed}`);
    // eslint-disable-next-line no-console
    console.log(`Median Speed: ${medianSpeed}`);
    // eslint-disable-next-line no-console
    console.log('------------------------ results ------------------------');
    turnNumber++;
  }
};
main();
