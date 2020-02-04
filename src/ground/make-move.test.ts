import { createPlayer } from '../player';
import { createGround } from './create-ground';
import { makeMove } from './make-move';
import { Player } from '../player/player';
import * as playerPositions from '../player/get-new-player-position';

jest.mock('../player/get-new-player-position');
type GetNewPlayerPositionMockType = jest.MockedFunction<typeof playerPositions.getNewPlayerPosition>;
describe('makeMove', () => {
  let getNewPlayerPositionMock: GetNewPlayerPositionMockType;
  beforeEach(() => {
    getNewPlayerPositionMock = playerPositions.getNewPlayerPosition as GetNewPlayerPositionMockType;
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
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
    const newGround = makeMove(ground);
    newGround.players.forEach(newPlayer => {
      // player is always defined here
      const oldPlayer = players.find(({ id }) => id === newPlayer.id) as Player;
      expect(oldPlayer.position).toBeDefined();
      expect(oldPlayer.position).not.toEqual(newPlayer.position);
    });
  });
  it('should run getNewPlayerPosition sequentially for each player with updated grounds and energies', () => {
    getNewPlayerPositionMock.mockReturnValue({ x: 1, y: 1 });
    makeMove(ground);
    expect(getNewPlayerPositionMock).toHaveBeenCalledTimes(3);
    expect(getNewPlayerPositionMock.mock.calls[0]).toEqual([players[0], ground]);
    expect(getNewPlayerPositionMock.mock.calls[1]).toEqual([
      players[1],
      {
        ...ground,
        players: [createPlayer({ ...players[0], position: { x: 1, y: 1 }, energy: 9 }), players[1], players[2]],
      },
    ]);
    expect(getNewPlayerPositionMock.mock.calls[2]).toEqual([
      players[2],
      {
        ...ground,
        players: [
          createPlayer({ ...players[0], position: { x: 1, y: 1 }, energy: 9 }),
          createPlayer({ ...players[1], position: { x: 1, y: 1 }, energy: 9 }),
          players[2],
        ],
      },
    ]);
  });
  it('should put into the dead players array if their energy has been depleted', () => {
    const playersNoEnergy = [createPlayer({ position: { x: 1, y: 1 }, energy: 0 })];
    const ground = createGround({ dimensions, players: playersNoEnergy });
    expect(makeMove(ground)).toEqual({ ...ground, players: [], playersDeadThisTurn: playersNoEnergy });
  });
});
