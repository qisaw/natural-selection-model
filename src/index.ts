import { createGround } from './ground/create-ground';
import { createPlayer } from './player';
import { makeMove } from './ground/make-move';
import { getGroundAsString } from './ground/get-ground-as-string';
import { createFood } from './food';

const width = 30;
const height = 30;
const MAX_TURNS = 1000 * 1000;

const players = [
  createPlayer({ position: { x: 0, y: 1 }, label: 'a', speed: 1 }),
  createPlayer({ position: { x: 0, y: 2 }, label: 'b', speed: 1 }),
  createPlayer({ position: { x: 1, y: 3 }, label: 'c', speed: 1 }),
  createPlayer({ position: { x: 1, y: 4 }, label: 'd', speed: 1 }),
  createPlayer({ position: { x: 1, y: 5 }, label: 'e', speed: 1 }),
  createPlayer({ position: { x: 1, y: 6 }, label: 'f', speed: 1 }),
  createPlayer({ position: { x: 1, y: 7 }, label: 'g', speed: 1 }),
  createPlayer({ position: { x: 1, y: 8 }, label: 'h', speed: 1 }),
  createPlayer({ position: { x: 1, y: 9 }, label: 'i', speed: 1 }),
  createPlayer({ position: { x: 9, y: 4 }, label: 'j', speed: 1 }),
  createPlayer({ position: { x: 8, y: 4 }, label: 'k', speed: 1 }),
  createPlayer({ position: { x: 7, y: 4 }, label: 'l', speed: 1 }),
  createPlayer({ position: { x: 6, y: 4 }, label: 'm', speed: 1 }),
  createPlayer({ position: { x: 5, y: 4 }, label: 'n', speed: 1 }),
  createPlayer({ position: { x: 4, y: 4 }, label: 'o', speed: 1 }),
  createPlayer({ position: { x: 3, y: 4 }, label: 'p', speed: 1 }),
  createPlayer({ position: { x: 2, y: 4 }, label: 'q', speed: 1 }),
  createPlayer({ position: { x: 1, y: 4 }, label: 'r', speed: 1 }),
  createPlayer({ position: { x: 0, y: 4 }, label: 's', speed: 1 }),
  createPlayer({ position: { x: 1, y: 3 }, label: 't', speed: 1 }),
  createPlayer({ position: { x: 2, y: 3 }, label: 'u', speed: 1 }),
  createPlayer({ position: { x: 3, y: 3 }, label: 'v', speed: 1 }),
  createPlayer({ position: { x: 4, y: 3 }, label: 'w', speed: 1 }),
  createPlayer({ position: { x: 5, y: 3 }, label: 'x', speed: 1 }),
  createPlayer({ position: { x: 6, y: 3 }, label: 'y', speed: 1 }),
  createPlayer({ position: { x: 7, y: 3 }, label: 'z', speed: 1 }),
  createPlayer({ position: { x: 8, y: 3 }, label: '1', speed: 1 }),
  createPlayer({ position: { x: 9, y: 3 }, label: '2', speed: 1 }),
  createPlayer({ position: { x: 1, y: 6 }, label: '3', speed: 1 }),
  createPlayer({ position: { x: 2, y: 6 }, label: '4', speed: 1 }),
  createPlayer({ position: { x: 3, y: 6 }, label: '5', speed: 1 }),
  createPlayer({ position: { x: 4, y: 6 }, label: '6', speed: 1 }),
  createPlayer({ position: { x: 5, y: 6 }, label: '7', speed: 1 }),
];

const food = [
  createFood({ position: { x: 20, y: 21 }, energyAddition: 1000 }),
  createFood({ position: { x: 20, y: 22 }, energyAddition: 1000 }),
  createFood({ position: { x: 21, y: 23 }, energyAddition: 1000 }),
  createFood({ position: { x: 21, y: 24 }, energyAddition: 1000 }),
  createFood({ position: { x: 21, y: 25 }, energyAddition: 1000 }),
  createFood({ position: { x: 21, y: 26 }, energyAddition: 1000 }),
  createFood({ position: { x: 21, y: 27 }, energyAddition: 1000 }),
  createFood({ position: { x: 21, y: 28 }, energyAddition: 1000 }),
  createFood({ position: { x: 21, y: 29 }, energyAddition: 1000 }),
  createFood({ position: { x: 29, y: 24 }, energyAddition: 1000 }),
  createFood({ position: { x: 28, y: 24 }, energyAddition: 1000 }),
  createFood({ position: { x: 27, y: 24 }, energyAddition: 1000 }),
  createFood({ position: { x: 26, y: 24 }, energyAddition: 1000 }),
  createFood({ position: { x: 25, y: 24 }, energyAddition: 1000 }),
  createFood({ position: { x: 24, y: 24 }, energyAddition: 1000 }),
  createFood({ position: { x: 23, y: 24 }, energyAddition: 1000 }),
];
const initialGround = createGround({
  dimensions: { width, height },
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
  let i = 0;
  while (ground.players.length && i < MAX_TURNS) {
    ground = makeMove(ground);
    if (i % 1000 === 0) {
      ground = { ...ground, food: [...ground.food, ...food] };
    }
    // eslint-disable-next-line no-console
    console.clear();
    // eslint-disable-next-line no-console
    console.log(`--------- ground --------- turn ${i + 1} ---------`);
    // eslint-disable-next-line no-console
    console.log(getGroundAsString(ground));
    await delay(1);
    i++;
  }
};
main();
