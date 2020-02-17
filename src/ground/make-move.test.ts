import { createPlayer } from '../player';
import { createGround } from './create-ground';
import { makeMove } from './make-move';
import { Player } from '../player/player';
describe('makeMove', () => {
  const dimensions = {
    width: 30,
    height: 30,
  };
  it('should move all players in a random manner', () => {
    const players = [
      createPlayer({ position: { x: 0, y: 0 }, energy: 10 }),
      createPlayer({ position: { x: 10, y: 10 }, energy: 10 }),
      createPlayer({ position: { x: 20, y: 20 }, energy: 10 }),
    ];
    const ground = createGround({ dimensions, players });
    //getNewPlayerPositionMock.mockReturnValue({ x: 1, y: 1 });
    const newGround = makeMove(ground);
    newGround.players.forEach(newPlayer => {
      // player is always defined here
      const oldPlayer = players.find(({ id }) => id === newPlayer.id) as Player;
      expect(oldPlayer.position).toBeDefined();
      expect(oldPlayer.position).not.toEqual(newPlayer.position);
    });
  });
  it('should filter out all players with 0 timeToLive', () => {
    const players = [createPlayer({ position: { x: 0, y: 0 }, energy: 10, timeToLive: 0 })];
    const ground = createGround({ dimensions, players });
    const newGround = makeMove(ground);
    expect(newGround.players).toHaveLength(0);
  });
  it('should reduce player numbers by 1 on every call of makeMove', () => {
    const players = [createPlayer({ position: { x: 0, y: 0 }, energy: 10, timeToLive: 1 })];
    const ground = createGround({ dimensions, players });
    const newGround = makeMove(ground);
    expect(newGround.players[0].timeToLive).toEqual(0);
  });
});
