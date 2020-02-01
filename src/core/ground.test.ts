import { createGround, getGroundAsString, printGround } from './ground';
import { createPlayer } from './player';
import { InvalidDimensionsError, PlayersOutsideGridError } from '../errors';

describe('ground', () => {
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
    });
    describe('unhappy paths', () => {
      it('should throw InvalidDimensionsError if dimensions are not positive numbers', () => {
        const dimensions = {
          height: 0,
          width: 5,
        };
        expect(() => createGround({ dimensions })).toThrow(InvalidDimensionsError);
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
    });
  });
  describe('getGroundAsString', () => {
    it('should return a valid string', () => {
      const dimensions = {
        height: 2,
        width: 2,
      };
      const ground = createGround({ dimensions });
      const groundAsString = getGroundAsString(ground);
      const expectedString = ['| - | - |', '| - | - |'].join('\n');
      expect(groundAsString).toEqual(expectedString);
    });
    it('should put xs where players are', () => {
      const dimensions = {
        height: 2,
        width: 2,
      };
      const players = [createPlayer({ position: { x: 1, y: 0 } })];
      const ground = createGround({ dimensions, players });
      const groundAsString = getGroundAsString(ground);
      const expectedString = ['| - | - |', '| x | - |'].join('\n');
      expect(groundAsString).toEqual(expectedString);
    });
  });
  describe('printGround', () => {
    it('should return the ground unchanged', () => {
      const dimensions = {
        height: 2,
        width: 2,
      };
      const players = [createPlayer({ position: { x: 1, y: 0 } })];
      const ground = createGround({ dimensions, players });
      expect(printGround(ground)).toBe(ground);
    });
  });
});
