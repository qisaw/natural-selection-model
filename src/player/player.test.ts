import { Player } from './player';
import uuid from 'uuid';
import { Food } from '../food/food';
import { startingPlayerEnergy, defaultPlayerTimeToLive } from '../settings';
import { DeepSet } from '../utils/deep-set';

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
    const player2 = new Player({ position: { x: 1, y: 2 }, energy: 0 });
    expect(player.energy).toEqual(10);
    expect(player2.energy).toEqual(0);
  });
  it('should set the default energy', () => {
    const player = new Player({ position: { x: 1, y: 2 } });
    expect(player.energy).toEqual(startingPlayerEnergy());
  });
  it('should set foodEaten', () => {
    const foodEaten = [new Food({ position: { x: 1, y: 2 } })];
    const player = new Player({ position: { x: 1, y: 2 }, foodEaten });
    expect(player.foodEaten).toEqual(foodEaten);
  });
  it('should set default foodEaten', () => {
    const player = new Player({ position: { x: 1, y: 2 } });
    expect(player.foodEaten).toEqual([]);
  });
  it('should set the speed', () => {
    const player = new Player({ position: { x: 1, y: 2 }, speed: 1 });
    expect(player.speed).toEqual(1);
  });
  it('should set the default speed', () => {
    const player = new Player({ position: { x: 1, y: 2 } });
    expect(player.speed).toEqual(2);
  });
  it('should set previousPositions', () => {
    const previousPositions = new DeepSet([{ x: 1, y: 1 }]);
    const player = new Player({ position: { x: 1, y: 2 }, previousPositions });
    expect(player.previousPositions).toEqual(previousPositions);
  });
  it('should default previousPositions to empty array', () => {
    const player = new Player({ position: { x: 1, y: 2 } });
    expect(player.previousPositions).toEqual(new DeepSet());
  });
  it('should set the default player time to live', () => {
    const player = new Player({ position: { x: 1, y: 1 } });
    expect(player.timeToLive).toEqual(defaultPlayerTimeToLive());
  });
  it('should set the player time to live', () => {
    const player = new Player({ position: { x: 1, y: 1 }, timeToLive: 2 });
    expect(player.timeToLive).toEqual(2);
  });
});
