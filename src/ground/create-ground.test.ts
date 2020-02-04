import { createGround } from './create-ground';
import { createPlayer } from '../player';
import { InvalidDimensionsError } from './errors';
import { PlayersOutsideGridError } from '../player/errors';
import { createFood } from '../food';
import { FoodOutsideGridError } from '../food/errors';

describe('createGround', () => {
  describe('happy paths', () => {
    it('should set default dimensions', () => {
      const ground = createGround({});
      expect(ground.dimensions).toEqual({ height: 10, width: 10 });
    });
    it('should set default players as empty', () => {
      const ground = createGround({});
      expect(ground.players).toEqual([]);
    });
    it('should have an id', () => {
      const ground = createGround({});
      expect(ground.id).toBeDefined();
      expect(typeof ground.id).toEqual('string');
    });
    it('should set dimensions and players', () => {
      const players = [createPlayer({ position: { x: 1, y: 1 } })];
      const dimensions = {
        height: 5,
        width: 5,
      };
      const ground = createGround({ dimensions, players });
      expect(ground.dimensions).toEqual({ height: 5, width: 5 });
      expect(ground.players).toEqual(players);
    });
    it('should set food to empty by default', () => {
      const ground = createGround({});
      expect(ground.food).toEqual([]);
    });
    it('should food', () => {
      const dimensions = {
        height: 5,
        width: 5,
      };
      const food = [createFood({ position: { x: 1, y: 1 } })];
      const ground = createGround({ dimensions, food });
      expect(ground.dimensions).toEqual({ height: 5, width: 5 });
      expect(ground.food).toEqual(food);
    });
  });
  describe('unhappy paths', () => {
    it('should throw InvalidDimensionsError if dimensions are less than 2', () => {
      expect(() => createGround({ dimensions: { height: 1, width: 2 } })).toThrow(InvalidDimensionsError);
      expect(() => createGround({ dimensions: { height: 2, width: 1 } })).toThrow(InvalidDimensionsError);
    });
    it('should throw PlayersOutsideGridError if a player is outside the grid', () => {
      const dimensions = {
        height: 5,
        width: 5,
      };
      const playersOutsideRow = [createPlayer({ position: { x: 5, y: 0 } })];
      const playersOutsideColumn = [createPlayer({ position: { x: 0, y: 5 } })];
      const playersInNegativeRow = [createPlayer({ position: { x: -1, y: 0 } })];
      const playersInNegativeColumn = [createPlayer({ position: { x: 0, y: -1 } })];
      expect(() => createGround({ dimensions, players: playersOutsideRow })).toThrow(PlayersOutsideGridError);
      expect(() => createGround({ dimensions, players: playersOutsideColumn })).toThrow(PlayersOutsideGridError);
      expect(() => createGround({ dimensions, players: playersInNegativeColumn })).toThrow(PlayersOutsideGridError);
      expect(() => createGround({ dimensions, players: playersInNegativeRow })).toThrow(PlayersOutsideGridError);
    });
    it('should throw FoodOutsideGridError if food is outised the grid', () => {
      const dimensions = {
        height: 5,
        width: 5,
      };
      const foodOutsideRow = [createFood({ position: { x: 5, y: 0 } })];
      const foodOutsideColumn = [createFood({ position: { x: 0, y: 5 } })];
      const foodInNegativeRow = [createFood({ position: { x: -1, y: 0 } })];
      const foodInNegativeColumn = [createFood({ position: { x: 0, y: -1 } })];
      expect(() => createGround({ dimensions, food: foodOutsideRow })).toThrow(FoodOutsideGridError);
      expect(() => createGround({ dimensions, food: foodOutsideColumn })).toThrow(FoodOutsideGridError);
      expect(() => createGround({ dimensions, food: foodInNegativeColumn })).toThrow(FoodOutsideGridError);
      expect(() => createGround({ dimensions, food: foodInNegativeRow })).toThrow(FoodOutsideGridError);
    });
  });
});
