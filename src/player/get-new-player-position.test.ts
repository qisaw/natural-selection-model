import { createPlayer } from '.';
import { createGround } from '../ground/create-ground';
import { getNewPlayerPosition } from './get-new-player-position';

const dimensions = {
  width: 10,
  height: 10,
};
describe('getNewPlayerPosition', () => {
  describe('happy paths', () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });
    describe('moving directions', () => {
      describe('when all directions are available', () => {
        const players = [createPlayer({ position: { x: 1, y: 1 } })];
        const ground = createGround({
          dimensions,
          players,
        });
        it('should move the user up 1/4th of the time', () => {
          jest.spyOn(Math, 'random').mockReturnValue(0.24);
          const playerToMove = players[0];
          const position = getNewPlayerPosition(playerToMove, ground);
          expect(position.x).toEqual(playerToMove.position.x);
          expect(position.y).toEqual(playerToMove.position.y - 1);
        });
        it('should move the user down 1/4 of the time', () => {
          jest.spyOn(Math, 'random').mockReturnValue(0.49);
          const playerToMove = players[0];
          const position = getNewPlayerPosition(playerToMove, ground);
          expect(position.x).toEqual(playerToMove.position.x);
          expect(position.y).toEqual(playerToMove.position.y + 1);
        });
        it('should move the user left 1/4 of the time', () => {
          jest.spyOn(Math, 'random').mockReturnValue(0.74);
          const playerToMove = players[0];
          const position = getNewPlayerPosition(playerToMove, ground);
          expect(position.x).toEqual(playerToMove.position.x - 1);
          expect(position.y).toEqual(playerToMove.position.y);
        });
        it('should move the user right 1/4 of the time', () => {
          jest.spyOn(Math, 'random').mockReturnValue(0.99);
          const playerToMove = players[0];
          const position = getNewPlayerPosition(playerToMove, ground);
          expect(position.x).toEqual(playerToMove.position.x + 1);
          expect(position.y).toEqual(playerToMove.position.y);
        });
      });
      describe('when the user is in the top row', () => {
        const playersOnTopRow = [createPlayer({ position: { x: 1, y: 0 } })];
        const ground = createGround({
          dimensions,
          players: playersOnTopRow,
        });
        it('should move the user down 1/3 of the time', () => {
          jest.spyOn(Math, 'random').mockReturnValue(0.32);
          const playerToMove = playersOnTopRow[0];
          const position = getNewPlayerPosition(playerToMove, ground);
          expect(position.x).toEqual(playerToMove.position.x);
          expect(position.y).toEqual(playerToMove.position.y + 1);
        });
        it('should move the user left 1/3 of the time', () => {
          jest.spyOn(Math, 'random').mockReturnValue(0.65);
          const playerToMove = playersOnTopRow[0];
          const position = getNewPlayerPosition(playerToMove, ground);
          expect(position.x).toEqual(playerToMove.position.x - 1);
          expect(position.y).toEqual(playerToMove.position.y);
        });
        it('should move the user right 1/3 of the time', () => {
          jest.spyOn(Math, 'random').mockReturnValue(0.99);
          const playerToMove = playersOnTopRow[0];
          const position = getNewPlayerPosition(playerToMove, ground);
          expect(position.x).toEqual(playerToMove.position.x + 1);
          expect(position.y).toEqual(playerToMove.position.y);
        });
      });
      describe('when the user is in the left most row', () => {
        const playersLeftMost = [createPlayer({ position: { x: 0, y: 1 } })];
        const ground = createGround({
          dimensions,
          players: playersLeftMost,
        });
        it('should move the user up 1/3 of the time', () => {
          jest.spyOn(Math, 'random').mockReturnValue(0.32);
          const playerToMove = playersLeftMost[0];
          const position = getNewPlayerPosition(playerToMove, ground);
          expect(position.x).toEqual(playerToMove.position.x);
          expect(position.y).toEqual(playerToMove.position.y - 1);
        });
        it('should move the user down 1/3 of the time', () => {
          jest.spyOn(Math, 'random').mockReturnValue(0.65);
          const playerToMove = playersLeftMost[0];
          const position = getNewPlayerPosition(playerToMove, ground);
          expect(position.x).toEqual(playerToMove.position.x);
          expect(position.y).toEqual(playerToMove.position.y + 1);
        });
        it('should move the user right 1/3 of the time', () => {
          jest.spyOn(Math, 'random').mockReturnValue(0.99);
          const playerToMove = playersLeftMost[0];
          const position = getNewPlayerPosition(playerToMove, ground);
          expect(position.x).toEqual(playerToMove.position.x + 1);
          expect(position.y).toEqual(playerToMove.position.y);
        });
      });
      describe('when the user is in the bottom most row', () => {
        const playersBottom = [createPlayer({ position: { x: 1, y: dimensions.height - 1 } })];
        const ground = createGround({
          dimensions,
          players: playersBottom,
        });
        it('should move the user up 1/3 of the time', () => {
          jest.spyOn(Math, 'random').mockReturnValue(0.32);
          const playerToMove = playersBottom[0];
          const position = getNewPlayerPosition(playerToMove, ground);
          expect(position.x).toEqual(playerToMove.position.x);
          expect(position.y).toEqual(playerToMove.position.y - 1);
        });
        it('should move the user left 1/3 of the time', () => {
          jest.spyOn(Math, 'random').mockReturnValue(0.65);
          const playerToMove = playersBottom[0];
          const position = getNewPlayerPosition(playerToMove, ground);
          expect(position.x).toEqual(playerToMove.position.x - 1);
          expect(position.y).toEqual(playerToMove.position.y);
        });
        it('should move the user right 1/3 of the time', () => {
          jest.spyOn(Math, 'random').mockReturnValue(0.99);
          const playerToMove = playersBottom[0];
          const position = getNewPlayerPosition(playerToMove, ground);
          expect(position.x).toEqual(playerToMove.position.x + 1);
          expect(position.y).toEqual(playerToMove.position.y);
        });
      });
      describe('when the user is in the right most row', () => {
        const playersRightMost = [createPlayer({ position: { x: dimensions.width - 1, y: 1 } })];
        const ground = createGround({
          dimensions,
          players: playersRightMost,
        });
        it('should move the user up 1/3 of the time', () => {
          jest.spyOn(Math, 'random').mockReturnValue(0.32);
          const playerToMove = playersRightMost[0];
          const position = getNewPlayerPosition(playerToMove, ground);
          expect(position.x).toEqual(playerToMove.position.x);
          expect(position.y).toEqual(playerToMove.position.y - 1);
        });
        it('should move the user down 1/3 of the time', () => {
          jest.spyOn(Math, 'random').mockReturnValue(0.65);
          const playerToMove = playersRightMost[0];
          const position = getNewPlayerPosition(playerToMove, ground);
          expect(position.x).toEqual(playerToMove.position.x);
          expect(position.y).toEqual(playerToMove.position.y + 1);
        });
        it('should move the user left 1/3 of the time', () => {
          jest.spyOn(Math, 'random').mockReturnValue(0.99);
          const playerToMove = playersRightMost[0];
          const position = getNewPlayerPosition(playerToMove, ground);
          expect(position.x).toEqual(playerToMove.position.x - 1);
          expect(position.y).toEqual(playerToMove.position.y);
        });
      });
      describe('when the user is in the top left corner', () => {
        const playersTopLeftCorner = [createPlayer({ position: { x: 0, y: 0 } })];
        const ground = createGround({
          dimensions,
          players: playersTopLeftCorner,
        });
        it('should move the user down 1/2 of the time', () => {
          jest.spyOn(Math, 'random').mockReturnValue(0.49);
          const playerToMove = playersTopLeftCorner[0];
          const position = getNewPlayerPosition(playerToMove, ground);
          expect(position.x).toEqual(playerToMove.position.x);
          expect(position.y).toEqual(playerToMove.position.y + 1);
        });
        it('should move the user right 1/2 of the time', () => {
          jest.spyOn(Math, 'random').mockReturnValue(0.99);
          const playerToMove = playersTopLeftCorner[0];
          const position = getNewPlayerPosition(playerToMove, ground);
          expect(position.x).toEqual(playerToMove.position.x + 1);
          expect(position.y).toEqual(playerToMove.position.y);
        });
      });
      describe('when the user is in the top right corner', () => {
        const playersTopRightCorner = [createPlayer({ position: { x: dimensions.width - 1, y: 0 } })];
        const ground = createGround({
          dimensions,
          players: playersTopRightCorner,
        });
        it('should move the user down 1/2 of the time', () => {
          jest.spyOn(Math, 'random').mockReturnValue(0.49);
          const playerToMove = playersTopRightCorner[0];
          const position = getNewPlayerPosition(playerToMove, ground);
          expect(position.x).toEqual(playerToMove.position.x);
          expect(position.y).toEqual(playerToMove.position.y + 1);
        });
        it('should move the user left 1/2 of the time', () => {
          jest.spyOn(Math, 'random').mockReturnValue(0.99);
          const playerToMove = playersTopRightCorner[0];
          const position = getNewPlayerPosition(playerToMove, ground);
          expect(position.x).toEqual(playerToMove.position.x - 1);
          expect(position.y).toEqual(playerToMove.position.y);
        });
      });
      describe('when the user is in the bottom left corner', () => {
        const playersBottomLeftCorner = [createPlayer({ position: { x: 0, y: dimensions.height - 1 } })];
        const ground = createGround({
          dimensions,
          players: playersBottomLeftCorner,
        });
        it('should move the user up 1/2 of the time', () => {
          jest.spyOn(Math, 'random').mockReturnValue(0.49);
          const playerToMove = playersBottomLeftCorner[0];
          const position = getNewPlayerPosition(playerToMove, ground);
          expect(position.x).toEqual(playerToMove.position.x);
          expect(position.y).toEqual(playerToMove.position.y - 1);
        });
        it('should move the user right 1/2 of the time', () => {
          jest.spyOn(Math, 'random').mockReturnValue(0.99);
          const playerToMove = playersBottomLeftCorner[0];
          const position = getNewPlayerPosition(playerToMove, ground);
          expect(position.x).toEqual(playerToMove.position.x + 1);
          expect(position.y).toEqual(playerToMove.position.y);
        });
      });
      describe('when the user is in the bottom right corner', () => {
        const playersBottomRightCorner = [
          createPlayer({ position: { x: dimensions.width - 1, y: dimensions.height - 1 } }),
        ];
        const ground = createGround({
          dimensions,
          players: playersBottomRightCorner,
        });
        it('should move the user up 1/2 of the time', () => {
          jest.spyOn(Math, 'random').mockReturnValue(0.49);
          const playerToMove = playersBottomRightCorner[0];
          const position = getNewPlayerPosition(playerToMove, ground);
          expect(position.x).toEqual(playerToMove.position.x);
          expect(position.y).toEqual(playerToMove.position.y - 1);
        });
        it('should move the user left 1/2 of the time', () => {
          jest.spyOn(Math, 'random').mockReturnValue(0.99);
          const playerToMove = playersBottomRightCorner[0];
          const position = getNewPlayerPosition(playerToMove, ground);
          expect(position.x).toEqual(playerToMove.position.x - 1);
          expect(position.y).toEqual(playerToMove.position.y);
        });
      });
    });
    describe('collisions', () => {
      it('should not move to a position where there is another player', () => {
        /*
         * | - | x | - |
         * | x | y | - |
         * | - | x | - |
         * we want to move y
         * the only available move for y is right one
         */
        const players = [
          createPlayer({ position: { x: 0, y: 1 } }),
          createPlayer({ position: { x: 1, y: 0 } }),
          createPlayer({ position: { x: 1, y: 2 } }),
          createPlayer({ position: { x: 1, y: 1 } }),
        ];
        const ground = createGround({
          dimensions,
          players,
        });
        const playerToMove = players[3];
        const mathRandomMock = jest.spyOn(Math, 'random');
        mathRandomMock.mockReturnValue(0);
        expect(getNewPlayerPosition(playerToMove, ground).x).toEqual(playerToMove.position.x + 1);
        expect(getNewPlayerPosition(playerToMove, ground).y).toEqual(playerToMove.position.y);
        mathRandomMock.mockReturnValue(0.5);
        expect(getNewPlayerPosition(playerToMove, ground).x).toEqual(playerToMove.position.x + 1);
        expect(getNewPlayerPosition(playerToMove, ground).y).toEqual(playerToMove.position.y);
        mathRandomMock.mockReturnValue(1);
        expect(getNewPlayerPosition(playerToMove, ground).x).toEqual(playerToMove.position.x + 1);
        expect(getNewPlayerPosition(playerToMove, ground).y).toEqual(playerToMove.position.y);
      });
      it('should not make any moves if a player is totally surrounded', () => {
        /*
         * | - | x | - |
         * | x | y | x |
         * | - | x | - |
         * we want to move y
         * the only available move for y is right one
         */
        const players = [
          createPlayer({ position: { x: 0, y: 1 } }),
          createPlayer({ position: { x: 1, y: 0 } }),
          createPlayer({ position: { x: 1, y: 2 } }),
          createPlayer({ position: { x: 2, y: 1 } }),
          createPlayer({ position: { x: 1, y: 1 } }),
        ];
        const playerToMove = players[4];
        const ground = createGround({
          dimensions,
          players,
        });
        expect(getNewPlayerPosition(playerToMove, ground)).toEqual(playerToMove.position);
      });
    });
  });
});