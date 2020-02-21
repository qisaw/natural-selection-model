import { createPlayer } from '../player';
import { createGround } from './create-ground';
import { makeMove } from './make-move';
import { Player } from '../player/player';
import { setOverrides, unsetOverrides } from '../settings';
import { createFood } from '../food';
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
  describe('when useTimetoLive is set', () => {
    beforeEach(() => {
      setOverrides({ useTimeToLive: true });
    });
    afterEach(() => {
      unsetOverrides(['useTimeToLive']);
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
    it('should filter out players that have died after they have reproduced', () => {
      const players = [
        createPlayer({
          position: { x: 0, y: 0 },
          energy: 10,
          timeToLive: 1,
          speed: 1,
          foodEaten: [createFood({ position: { x: 1, y: 1 } }), createFood({ position: { x: 1, y: 1 } })],
        }),
      ];
      const ground = createGround({ dimensions, players });
      const nextGround = makeMove(ground);
      // created user now has time to live 0
      expect(nextGround.players).toHaveLength(2);
      const groundWhereUserOneIsDead = makeMove(nextGround);
      expect(groundWhereUserOneIsDead.players).toHaveLength(1);
      expect(groundWhereUserOneIsDead.players[0].id).not.toEqual(players[0].id);
    });
  });
  describe('when useTimetoLive is not set', () => {
    beforeEach(() => {
      setOverrides({ useTimeToLive: false });
    });
    afterEach(() => {
      unsetOverrides(['useTimeToLive']);
    });
    it('should not filter out all players with 0 timeToLive', () => {
      const players = [createPlayer({ position: { x: 0, y: 0 }, energy: 10, timeToLive: 0 })];
      const ground = createGround({ dimensions, players });
      const newGround = makeMove(ground);
      expect(newGround.players).toHaveLength(1);
      expect(newGround.players[0].id).toEqual(players[0].id);
    });
    it('should reduce player numbers by 1 on every call of makeMove', () => {
      const players = [createPlayer({ position: { x: 0, y: 0 }, energy: 10, timeToLive: 1 })];
      const ground = createGround({ dimensions, players });
      const newGround = makeMove(ground);
      expect(newGround.players[0].timeToLive).toEqual(1);
    });
  });
});
