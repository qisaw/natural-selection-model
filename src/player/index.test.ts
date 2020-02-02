import { createPlayer } from './index';
import { Player } from './player';

describe('createPlayer', () => {
  it('should create a player', () => {
    const player = createPlayer({ position: { x: 1, y: 1 } });
    expect(player instanceof Player).toEqual(true);
  });
});
