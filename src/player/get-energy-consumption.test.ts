import { createPlayer } from '.';
import { getEnergyConsumption } from './get-energy-consumption';

describe('getEnergyConsumption', () => {
  it('should use the e=mv^2', () => {
    const position = { x: 1, y: 1 };
    // for a player with 1 mass and 1 velocity
    // it should use 1 energy to move 1 distance
    const playerOne = createPlayer({ position, speed: 1 });
    expect(getEnergyConsumption(playerOne)).toEqual(1);
    // for a player with 1 mass and 2 velocity
    // it sholud use 4 energy to move 1 distance
    const playerTwo = createPlayer({ position, speed: 2 });
    expect(getEnergyConsumption(playerTwo)).toEqual(4);
    // for a player with 1 mass and 3 velocity
    // it should use 9 energy to move 1 distance
    const playerThree = createPlayer({ position, speed: 3 });
    expect(getEnergyConsumption(playerThree)).toEqual(9);
  });
});
