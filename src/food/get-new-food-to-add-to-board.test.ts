import { Food } from './food';
import { getNewFoodToAddToBoard } from './get-new-food-to-add-to-board';
import { createPlayer } from '../player/index';
import { createFood } from '.';
import { Player } from '../player/player';

describe('getNewFoodToAddToBoard', () => {
  it('should add food to the board', () => {
    const dimensions = {
      width: 10,
      height: 10,
    };
    const players: Player[] = [];
    const foodAlreadyExisting: Food[] = [];
    const newFood = getNewFoodToAddToBoard(1, 1000, dimensions, players, foodAlreadyExisting);
    expect(newFood).toHaveLength(1);
    expect(newFood[0] instanceof Food).toEqual(true);
    expect(newFood[0].energyAddition).toEqual(1000);
  });
  it('should not add food to a board where food or a player already exists', () => {
    const dimensions = {
      width: 2,
      height: 2,
    };
    /*
     * | x | f |
     * | f |   |
     * here the only spot for food is at position { x: 1, y: 1 }
     */
    const players = [createPlayer({ position: { x: 0, y: 0 } })];
    const foodAlreadyExisting = [createFood({ position: { x: 1, y: 0 } }), createFood({ position: { x: 0, y: 1 } })];
    const newFood = getNewFoodToAddToBoard(1, 1000, dimensions, players, foodAlreadyExisting);
    expect(newFood).toHaveLength(1);
    expect(newFood[0].position).toEqual({ x: 1, y: 1 });
  });
  describe('avoidng putting food in the same position', () => {
    let spy: jest.SpyInstance<number, []>;
    beforeEach(() => {
      spy = jest.spyOn(Math, 'random');
    });
    afterEach(() => {
      spy.mockRestore();
    });
    it('should not add 2 pieces of food to the same position', () => {
      const dimensions = {
        width: 2,
        height: 2,
      };
      /*
       * | x | f |
       * |   |   |
       * here the only spot for food is at position { x: 1, y: 1 } and { x: 0, y: 1 }
       */
      const players = [createPlayer({ position: { x: 0, y: 0 } })];
      const foodAlreadyExisting = [createFood({ position: { x: 1, y: 0 } })];
      // positions x: 1, y: 1 for the first run, put the first piece of food into position x: 1, y: 1
      spy
        .mockImplementationOnce(() => 0.5)
        .mockImplementationOnce(() => 0.5)
        //// positions x: 1, y: 1 for the second run, try put the sencond piece of food into the same postion as the first
        .mockImplementationOnce(() => 0.5)
        .mockImplementationOnce(() => 0.5)
        //// positions x: 0, y: _ for the third run, try put the sencond piece of food into the position the player is in
        .mockImplementationOnce(() => 0)
        .mockImplementationOnce(() => 0)
        //// positions x: 0, y: _ for the third run, try put the sencond piece of food into the position where existing food is
        .mockImplementationOnce(() => 0)
        .mockImplementationOnce(() => 0.5)
        // positions x: 0, y: 1 for the third run, try put the sencond piece of food into an empty position
        .mockImplementationOnce(() => 0)
        .mockImplementationOnce(() => 0.5);
      const newFood = getNewFoodToAddToBoard(2, 1000, dimensions, players, foodAlreadyExisting);
      expect(newFood).toHaveLength(2);
      expect(newFood.map(({ position }) => position).sort((a, b) => (a.x + a.y > b.x + b.y ? 1 : -1))).toEqual([
        { x: 0, y: 1 },
        { x: 1, y: 1 },
      ]);
    });
    it('give up and not add the food if no spot could be found', () => {
      const dimensions = {
        width: 2,
        height: 2,
      };
      /*
       * | x | f |
       * | x | x |
       * here there are no available spots for new food
       */
      const players = [
        createPlayer({ position: { x: 0, y: 0 } }),
        createPlayer({ position: { x: 0, y: 1 } }),
        createPlayer({ position: { x: 1, y: 1 } }),
      ];
      const foodAlreadyExisting = [createFood({ position: { x: 1, y: 0 } })];
      const newFood = getNewFoodToAddToBoard(1, 1000, dimensions, players, foodAlreadyExisting);
      expect(newFood).toEqual([]);
      expect(Math.random).toHaveBeenCalledTimes(200);
    });
  });
});
