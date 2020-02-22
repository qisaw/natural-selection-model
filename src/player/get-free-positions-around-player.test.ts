import { createGround } from '../ground/create-ground';
import { createPlayer } from '.';
import { getFreePostionsAroundPlayer } from './get-free-positions-around-player';
import { Position } from '../global/types';
import { createFood } from '../food';

const sortFn = (a: Position, b: Position): number => {
  if (a.x > b.x) {
    return -1;
  }
  if (a.x < b.x) {
    return 1;
  }
  if (a.y > b.y) {
    return -1;
  }
  if (a.y < b.y) {
    return 1;
  }
  return 0;
};
describe('getFreePostionsAroundPlayer', () => {
  const dimensions = { width: 10, height: 10 };
  describe('base cases', () => {
    describe('empty board', () => {
      it('should by default allow users to move all directions', () => {
        const player = createPlayer({ position: { x: 1, y: 1 } });
        const ground = createGround({ dimensions, players: [player] });
        expect(getFreePostionsAroundPlayer(player, ground, true).sort(sortFn)).toEqual(
          [
            { x: 0, y: 0 },
            { x: 0, y: 1 },
            { x: 0, y: 2 },
            { x: 1, y: 0 },
            { x: 1, y: 2 },
            { x: 2, y: 0 },
            { x: 2, y: 1 },
            { x: 2, y: 2 },
          ].sort(sortFn),
        );
      });
      it('should not return all up directions when in the top row', () => {
        const player = createPlayer({ position: { x: 1, y: 0 } });
        const ground = createGround({ dimensions, players: [player] });
        expect(getFreePostionsAroundPlayer(player, ground, true).sort(sortFn)).toEqual(
          [
            { x: 0, y: 0 },
            { x: 0, y: 1 },
            { x: 1, y: 1 },
            { x: 2, y: 0 },
            { x: 2, y: 1 },
          ].sort(sortFn),
        );
      });
      it('should not return all down directions when in the bottom row', () => {
        const player = createPlayer({ position: { x: 1, y: 9 } });
        const ground = createGround({ dimensions, players: [player] });
        expect(getFreePostionsAroundPlayer(player, ground, true).sort(sortFn)).toEqual(
          [
            { x: 0, y: 9 },
            { x: 0, y: 8 },
            { x: 1, y: 8 },
            { x: 2, y: 9 },
            { x: 2, y: 8 },
          ].sort(sortFn),
        );
      });
      it('should not return all right directions when in the right most row', () => {
        const player = createPlayer({ position: { x: 9, y: 1 } });
        const ground = createGround({ dimensions, players: [player] });
        expect(getFreePostionsAroundPlayer(player, ground, true).sort(sortFn)).toEqual(
          [
            { x: 9, y: 0 },
            { x: 9, y: 2 },
            { x: 8, y: 0 },
            { x: 8, y: 1 },
            { x: 8, y: 2 },
          ].sort(sortFn),
        );
      });
      it('should not return all the left directions when in the left most row', () => {
        const player = createPlayer({ position: { x: 0, y: 1 } });
        const ground = createGround({ dimensions, players: [player] });
        expect(getFreePostionsAroundPlayer(player, ground, true).sort(sortFn)).toEqual(
          [
            { x: 0, y: 0 },
            { x: 0, y: 2 },
            { x: 1, y: 0 },
            { x: 1, y: 1 },
            { x: 1, y: 2 },
          ].sort(sortFn),
        );
      });
      it('should not return all top and left dimensions when in the top left corner', () => {
        const player = createPlayer({ position: { x: 0, y: 0 } });
        const ground = createGround({ dimensions, players: [player] });
        expect(getFreePostionsAroundPlayer(player, ground, true).sort(sortFn)).toEqual(
          [
            { x: 0, y: 1 },
            { x: 1, y: 0 },
            { x: 1, y: 1 },
          ].sort(sortFn),
        );
      });
      it('should not return all top and right dimensions when in the top right corner', () => {
        const player = createPlayer({ position: { x: 9, y: 0 } });
        const ground = createGround({ dimensions, players: [player] });
        expect(getFreePostionsAroundPlayer(player, ground, true).sort(sortFn)).toEqual(
          [
            { x: 9, y: 1 },
            { x: 8, y: 0 },
            { x: 8, y: 1 },
          ].sort(sortFn),
        );
      });
      it('should not return all bottom and left dimensions when in the bottom left corner', () => {
        const player = createPlayer({ position: { x: 0, y: 9 } });
        const ground = createGround({ dimensions, players: [player] });
        expect(getFreePostionsAroundPlayer(player, ground, true).sort(sortFn)).toEqual(
          [
            { x: 1, y: 9 },
            { x: 0, y: 8 },
            { x: 1, y: 8 },
          ].sort(sortFn),
        );
      });
      it('should not return all bottom and right dimensions when in the bottom right corner', () => {
        const player = createPlayer({ position: { x: 9, y: 9 } });
        const ground = createGround({ dimensions, players: [player] });
        expect(getFreePostionsAroundPlayer(player, ground, true).sort(sortFn)).toEqual(
          [
            { x: 8, y: 9 },
            { x: 8, y: 8 },
            { x: 9, y: 8 },
          ].sort(sortFn),
        );
      });
    });
    describe('dont return values which have players in them', () => {
      it('should return empty array if all surroundings are filled with players', () => {
        /*
         * | x | x | x |
         * | x | Y | x |
         * | x | x | x |
         */
        const player = createPlayer({ position: { x: 1, y: 1 } });
        const otherPlayers = [
          { x: 0, y: 0 },
          { x: 1, y: 0 },
          { x: 2, y: 0 },
          { x: 0, y: 1 },
          { x: 2, y: 1 },
          { x: 0, y: 2 },
          { x: 1, y: 2 },
          { x: 2, y: 2 },
        ].map(position => createPlayer({ position }));
        const ground = createGround({ dimensions, players: [player, ...otherPlayers] });
        expect(getFreePostionsAroundPlayer(player, ground, true)).toEqual([]);
      });
      it('should postions which are not filled with players', () => {
        /*
         * | - | x | - |
         * | x | Y | - |
         * | x | - | x |
         */
        const player = createPlayer({ position: { x: 1, y: 1 } });
        const otherPlayers = [
          { x: 1, y: 0 },
          { x: 0, y: 1 },
          { x: 0, y: 2 },
          { x: 2, y: 2 },
        ].map(position => createPlayer({ position }));
        const ground = createGround({ dimensions, players: [player, ...otherPlayers] });
        expect(getFreePostionsAroundPlayer(player, ground, true).sort(sortFn)).toEqual(
          [
            { x: 0, y: 0 },
            { x: 2, y: 0 },
            { x: 2, y: 1 },
            { x: 1, y: 2 },
          ].sort(sortFn),
        );
      });
    });
    describe('food', () => {
      it('should ignore food if allowPositionsWithFood is true', () => {
        /*
         * | F | x | x |
         * | x | Y | x |
         * | x | x | x |
         */
        const player = createPlayer({ position: { x: 1, y: 1 } });
        const otherPlayers = [
          { x: 1, y: 0 },
          { x: 2, y: 0 },
          { x: 0, y: 1 },
          { x: 2, y: 1 },
          { x: 0, y: 2 },
          { x: 1, y: 2 },
          { x: 2, y: 2 },
        ].map(position => createPlayer({ position }));
        const food = createFood({ position: { x: 0, y: 0 } });
        const ground = createGround({ dimensions, players: [player, ...otherPlayers], food: [food] });
        expect(getFreePostionsAroundPlayer(player, ground, true)).toEqual([{ x: 0, y: 0 }]);
      });
      it('should not ignore food if allowPositionsWithFood is false', () => {
        /*
         * | F | x | x |
         * | x | Y | x |
         * | x | x | x |
         */
        const player = createPlayer({ position: { x: 1, y: 1 } });
        const otherPlayers = [
          { x: 1, y: 0 },
          { x: 2, y: 0 },
          { x: 0, y: 1 },
          { x: 2, y: 1 },
          { x: 0, y: 2 },
          { x: 1, y: 2 },
          { x: 2, y: 2 },
        ].map(position => createPlayer({ position }));
        const food = createFood({ position: { x: 0, y: 0 } });
        const ground = createGround({ dimensions, players: [player, ...otherPlayers], food: [food] });
        expect(getFreePostionsAroundPlayer(player, ground, false)).toEqual([]);
      });
    });
  });
});
