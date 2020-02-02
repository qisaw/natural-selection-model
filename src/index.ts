import { createGround } from './ground/create-ground';
import { printGround } from './ground/print-ground';
import { createPlayer } from './player';

const width = 10;
const height = 10;

const players = [
  createPlayer({ position: { x: 0, y: 1 } }),
  createPlayer({ position: { x: 0, y: 2 } }),
  createPlayer({ position: { x: 1, y: 3 } }),
];
const ground = createGround({
  dimensions: { width, height },
  players,
});

printGround(ground);
