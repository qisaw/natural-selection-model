import { createGround } from './create-ground';
import { printGround } from './print-ground';
import { createPlayer } from '../player';

describe('printGround', () => {
  it('should return the ground unchanged', () => {
    const dimensions = {
      height: 2,
      width: 2,
    };
    const players = [createPlayer({ position: { x: 1, y: 0 } })];
    const ground = createGround({ dimensions, players });
    expect(printGround(ground)).toBe(ground);
  });
});
