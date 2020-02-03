import { createGround } from './ground/create-ground';
import { printGround } from './ground/print-ground';
import { createPlayer } from './player';
import { makeMove } from './ground/make-move';

const width = 10;
const height = 10;

const players = [
  createPlayer({ position: { x: 0, y: 1 } }),
  createPlayer({ position: { x: 0, y: 2 } }),
  createPlayer({ position: { x: 1, y: 3 } }),
];
const initialGround = createGround({
  dimensions: { width, height },
  players,
});

let ground = initialGround;
printGround(ground);

for (let i = 0; i < 10; i++) {
  ground = makeMove(ground);
  printGround(ground);
}
