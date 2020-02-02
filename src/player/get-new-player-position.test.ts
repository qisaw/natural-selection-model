import { createPlayer } from '.';
import { createGround } from '../ground/create-ground';
import { getNewPlayerPosition } from './get-new-player-position';

describe('getNewPlayerPosition', () => {
  const players = [createPlayer({ position: { x: 1, y: 1 } })];
  const dimensions = {
    width: 10,
    height: 10,
  };
  const ground = createGround({
    dimensions,
    players,
  });
  describe('happy paths', () => {
    it('should return position', () => {
      const newDimensions = getNewPlayerPosition(players[0], ground);
      expect(newDimensions.x).toBeDefined();
      expect(newDimensions.y).toBeDefined();
    });
    describe('moving directions', () => {
      afterEach(() => {
        jest.restoreAllMocks();
      });
      describe('when all directions are available', () => {
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
        const playersRightLeftCorner = [
          createPlayer({ position: { x: dimensions.width - 1, y: dimensions.height - 1 } }),
        ];
        it('should move the user up 1/2 of the time', () => {
          jest.spyOn(Math, 'random').mockReturnValue(0.49);
          const playerToMove = playersRightLeftCorner[0];
          const position = getNewPlayerPosition(playerToMove, ground);
          expect(position.x).toEqual(playerToMove.position.x);
          expect(position.y).toEqual(playerToMove.position.y - 1);
        });
        it('should move the user left 1/2 of the time', () => {
          jest.spyOn(Math, 'random').mockReturnValue(0.99);
          const playerToMove = playersRightLeftCorner[0];
          const position = getNewPlayerPosition(playerToMove, ground);
          expect(position.x).toEqual(playerToMove.position.x - 1);
          expect(position.y).toEqual(playerToMove.position.y);
        });
      });
    });
  });
});
