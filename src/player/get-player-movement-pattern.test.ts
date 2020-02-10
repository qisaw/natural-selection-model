import { createPlayer } from '.';
import { getPlayerMovementPattern } from './get-player-movement-pattern';

describe('getPlayerMovementPattern', () => {
  it('should return an object with the keys as ids of the players passed in', () => {
    const position = { x: 1, y: 1 };
    const players = [
      createPlayer({ position, speed: 1 }),
      createPlayer({ position, speed: 2 }),
      createPlayer({ position, speed: 3 }),
    ];
    expect(Array.from(getPlayerMovementPattern(players, 3).keys()).sort()).toEqual(players.sort());
  });
  it('should return true the same number of times as the speed of the player', () => {
    const position = { x: 1, y: 1 };
    const playerOne = createPlayer({ position, speed: 1 });
    const playerTwo = createPlayer({ position, speed: 2 });
    const playerThree = createPlayer({ position, speed: 3 });
    const players = [playerOne, playerTwo, playerThree];
    const values = getPlayerMovementPattern(players, 3);
    expect((values.get(playerOne) || []).sort()).toEqual([false, false, true]);
    expect((values.get(playerTwo) || []).sort()).toEqual([false, true, true]);
    expect((values.get(playerThree) || []).sort()).toEqual([true, true, true]);
  });
  it('should only return the numOfItems as specified in maxTurns', () => {
    const position = { x: 1, y: 1 };
    const playerOne = createPlayer({ position, speed: 10 });
    const players = [playerOne];
    const values = getPlayerMovementPattern(players, 3);
    expect((values.get(playerOne) || []).sort()).toEqual([true, true, true]);
  });
});
