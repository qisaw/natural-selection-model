import { createPlayer } from '../player';
import { getPlayerMovementsForTurns } from './get-player-movements-for-turn';
import { Player } from '../player/player';

describe('getPlayerMovementsForTurns', () => {
  it('should an object with the same number of keys as the maximum speed of the players', () => {
    const position = { x: 1, y: 1 };
    const players = [
      createPlayer({ position, speed: 1 }),
      createPlayer({ position, speed: 2 }),
      createPlayer({ position, speed: 10 }),
    ];
    const playerMovementForTurns = getPlayerMovementsForTurns(players);
    const expectedArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    expect(Array.from(playerMovementForTurns.keys()).sort()).toEqual(expectedArray);
  });
  it('should return an empty map if no players are passed in', () => {
    const players: Player[] = [];
    const playerMovementForTurns = getPlayerMovementsForTurns(players);
    expect(Array.from(playerMovementForTurns.keys())).toEqual([]);
  });
  it('should add the maxSpeed player to every key', () => {
    const position = { x: 1, y: 1 };
    const players = [createPlayer({ position, speed: 10 })];
    const playerMovementForTurns = getPlayerMovementsForTurns(players);
    const expectedKeys = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    expectedKeys.forEach(key => {
      expect(playerMovementForTurns.get(key)).toEqual(players);
    });
  });
  it('should add each player same number of times its speed is', () => {
    const position = { x: 1, y: 1 };
    const playerOne = createPlayer({ position, speed: 1 });
    const playerTwo = createPlayer({ position, speed: 2 });
    const playerThree = createPlayer({ position, speed: 10 });
    const players = [playerOne, playerTwo, playerThree];
    const playerMovementForTurns = getPlayerMovementsForTurns(players);
    let playerOneCount = 0;
    let playerTwoCount = 0;
    let playerThreeCount = 0;
    for (const value of playerMovementForTurns.values()) {
      const doesPlayerOneExist = value.find(({ id }) => id === playerOne.id);
      const doesPlayerTwoExist = value.find(({ id }) => id === playerTwo.id);
      const doesPlayerThreeExist = value.find(({ id }) => id === playerThree.id);
      if (doesPlayerOneExist) {
        playerOneCount += 1;
      }
      if (doesPlayerTwoExist) {
        playerTwoCount += 1;
      }
      if (doesPlayerThreeExist) {
        playerThreeCount += 1;
      }
    }
    expect(playerOneCount).toEqual(1);
    expect(playerTwoCount).toEqual(2);
    expect(playerThreeCount).toEqual(10);
  });
});
