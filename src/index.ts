import median from 'median';
import { createGround } from './ground/create-ground';
import { createPlayer } from './player';
import { makeMove } from './ground/make-move';
import { getGroundAsString } from './ground/get-ground-as-string';
import { createFood } from './food';
import { Player } from './player/player';
import { GroundDimensions } from './ground/types';
import { Food } from './food/food';

const width = 30;
const height = 30;
const numOfFoodToCreate = 50;
const dimensions = { width, height };
const MAX_TURNS = 1000 * 1000;

const createRandomPlayers = (numOfPlayers: number, dimensions: GroundDimensions): Player[] => {
  const players: Player[] = [];
  for (let i = 0; i < numOfPlayers; i++) {
    let xPosition = Math.round(Math.random() * (dimensions.width - 1));
    let yPosition = Math.round(Math.random() * (dimensions.height - 1));
    while (!!players.find(({ position }) => position.x === xPosition && position.y && yPosition)) {
      xPosition = Math.round(Math.random() * (dimensions.width - 1));
      yPosition = Math.round(Math.random() * (dimensions.height - 1));
    }
    const position = {
      x: xPosition,
      y: yPosition,
    };
    const label = 'O';
    const speed = 2;
    players.push(createPlayer({ position, label, speed }));
  }
  return players;
};

const createRandomFood = (
  numOfFood: number,
  dimensions: GroundDimensions,
  players: Player[],
  foodAlreadyExisting: Food[],
): Food[] => {
  const foodArray: Food[] = [];
  for (let i = 0; i < numOfFood; i++) {
    let xPosition = Math.round(Math.random() * (dimensions.width - 1));
    let yPosition = Math.round(Math.random() * (dimensions.height - 1));
    while (
      !!players.find(({ position }) => position.x === xPosition && position.y === yPosition) ||
      !!foodAlreadyExisting.find(({ position }) => position.x === xPosition && position.y === yPosition) ||
      !!foodArray.find(({ position }) => position.x === xPosition && position.y === yPosition)
    ) {
      xPosition = Math.round(Math.random() * (dimensions.width - 1));
      yPosition = Math.round(Math.random() * (dimensions.height - 1));
    }
    const position = {
      x: xPosition,
      y: yPosition,
    };
    const food = createFood({ position, energyAddition: 1000 });
    foodArray.push(food);
  }
  return foodArray;
};

const players = createRandomPlayers(32, dimensions);
const food = createRandomFood(numOfFoodToCreate, dimensions, players, []);

const initialGround = createGround({
  dimensions,
  players,
  food,
});

const delay = (ms: number): Promise<void> => new Promise(res => setTimeout(res, ms));
const main = async (): Promise<void> => {
  let ground = initialGround;
  // eslint-disable-next-line no-console
  console.log('--------- ground --------- turn 0 ---------');
  // eslint-disable-next-line no-console
  console.log(getGroundAsString(ground));
  await delay(100);
  let turnNumber = 0;
  while (ground.players.length && turnNumber < MAX_TURNS) {
    ground = makeMove(ground);
    if (turnNumber % 1000 === 0) {
      const newFood = createRandomFood(numOfFoodToCreate, dimensions, ground.players, ground.food);
      ground = { ...ground, food: [...ground.food, ...newFood] };
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
    await delay(1);
    turnNumber++;
  }
};
main();
