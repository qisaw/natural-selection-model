import { createGround } from './ground/create-ground';
import { createPlayer } from './player';
import { makeMove } from './ground/make-move';
import { getGroundAsString } from './ground/get-ground-as-string';
import { createFood } from './food';

const width = 30;
const height = 30;

const players = [
  createPlayer({ position: { x: 0, y: 1 }, label: 'a' }),
  createPlayer({ position: { x: 0, y: 2 }, label: 'b' }),
  createPlayer({ position: { x: 1, y: 3 }, label: 'c' }),
  createPlayer({ position: { x: 1, y: 4 }, label: 'd' }),
  createPlayer({ position: { x: 1, y: 5 }, label: 'e' }),
  createPlayer({ position: { x: 1, y: 6 }, label: 'f' }),
  createPlayer({ position: { x: 1, y: 7 }, label: 'g' }),
  createPlayer({ position: { x: 1, y: 8 }, label: 'h' }),
  createPlayer({ position: { x: 1, y: 9 }, label: 'i' }),
  createPlayer({ position: { x: 9, y: 4 }, label: 'j' }),
  createPlayer({ position: { x: 8, y: 4 }, label: 'k' }),
  createPlayer({ position: { x: 7, y: 4 }, label: 'l' }),
  createPlayer({ position: { x: 6, y: 4 }, label: 'm' }),
  createPlayer({ position: { x: 5, y: 4 }, label: 'n' }),
  createPlayer({ position: { x: 4, y: 4 }, label: 'o' }),
  createPlayer({ position: { x: 3, y: 4 }, label: 'p' }),
  createPlayer({ position: { x: 2, y: 4 }, label: 'q' }),
  createPlayer({ position: { x: 1, y: 4 }, label: 'r' }),
  createPlayer({ position: { x: 0, y: 4 }, label: 's' }),
  createPlayer({ position: { x: 1, y: 3 }, label: 't' }),
  createPlayer({ position: { x: 2, y: 3 }, label: 'u' }),
  createPlayer({ position: { x: 3, y: 3 }, label: 'v' }),
  createPlayer({ position: { x: 4, y: 3 }, label: 'w' }),
  createPlayer({ position: { x: 5, y: 3 }, label: 'x' }),
  createPlayer({ position: { x: 6, y: 3 }, label: 'y' }),
  createPlayer({ position: { x: 7, y: 3 }, label: 'z' }),
  createPlayer({ position: { x: 8, y: 3 }, label: '1' }),
  createPlayer({ position: { x: 9, y: 3 }, label: '2' }),
  createPlayer({ position: { x: 1, y: 6 }, label: '3' }),
  createPlayer({ position: { x: 2, y: 6 }, label: '4' }),
  createPlayer({ position: { x: 3, y: 6 }, label: '5' }),
  createPlayer({ position: { x: 4, y: 6 }, label: '6' }),
  createPlayer({ position: { x: 5, y: 6 }, label: '7' }),
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
  while (ground.players.length) {
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
    await delay(100);
    i++;
  }
};
main();
