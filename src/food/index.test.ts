import { createFood } from '.';
import { Food } from './food';

describe('createFood', () => {
  it('should create a food class', () => {
    const food = createFood({ position: { x: 1, y: 1 } });
    expect(food instanceof Food).toBe(true);
  });
});
