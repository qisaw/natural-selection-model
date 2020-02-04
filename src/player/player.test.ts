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
  it('should default to x as the label', () => {
    const player = new Player({ position: { x: 1, y: 2 } });
    expect(player.label).toEqual('x');
  });
  it('should set the label if passed in', () => {
    const player = new Player({ position: { x: 1, y: 2 }, label: 'a' });
    expect(player.label).toEqual('a');
  });
  it('should set the energy', () => {
    const player = new Player({ position: { x: 1, y: 2 }, energy: 10 });
    expect(player.energy).toEqual(10);
  });
  it('should set the default energy', () => {
    const player = new Player({ position: { x: 1, y: 2 } });
    expect(player.energy).toEqual(1000);
  });
});
