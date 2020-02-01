import { createPlayer } from './player';

describe('createPlayer', () => {
  it('should create a player with position data', () => {
    const player = createPlayer({ position: { x: 1, y: 2 } });
    const { position } = player;
    expect(position.x).toEqual(1);
    expect(position.y).toEqual(2);
  });
});
