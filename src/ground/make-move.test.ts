import { createPlayer } from '../player';
import { createGround } from './create-ground';
import { makeMove } from './make-move';
import { Player } from '../player/player';
describe('makeMove', () => {
  const dimensions = {
    width: 30,
    height: 30,
  };
  const players = [
    createPlayer({ position: { x: 0, y: 0 }, energy: 10 }),
    createPlayer({ position: { x: 10, y: 10 }, energy: 10 }),
    createPlayer({ position: { x: 20, y: 20 }, energy: 10 }),
  ];
  const ground = createGround({ dimensions, players });
  it('should move all players in a random manner', () => {
    //getNewPlayerPositionMock.mockReturnValue({ x: 1, y: 1 });
    const newGround = makeMove(ground);
    newGround.players.forEach(newPlayer => {
      // player is always defined here
      const oldPlayer = players.find(({ id }) => id === newPlayer.id) as Player;
      expect(oldPlayer.position).toBeDefined();
      expect(oldPlayer.position).not.toEqual(newPlayer.position);
    });
  });
});
