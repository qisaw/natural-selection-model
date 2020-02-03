import { Player } from './player';
import uuid from 'uuid';

describe('Player', () => {
  it('should create a player with position data', () => {
    const player = new Player({ position: { x: 1, y: 2 } });
    const { position } = player;
    expect(position.x).toEqual(1);
    expect(position.y).toEqual(2);
  });
  it('should create a player with an id', () => {
    const player = new Player({ position: { x: 1, y: 2 } });
    const { id } = player;
    expect(id).toBeDefined();
  });
  it('should create a player with an id if passed in', () => {
    const id = uuid();
    const player = new Player({ position: { x: 1, y: 2 }, id });
    const { id: playerId } = player;
    expect(playerId).toEqual(id);
  });
});
