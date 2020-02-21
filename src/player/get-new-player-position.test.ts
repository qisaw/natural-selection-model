import { createPlayer } from '.';
import { createGround } from '../ground/create-ground';
import { getNewPlayerPosition } from './get-new-player-position';
import { DeepSet } from '../utils/deep-set';
import { createFood } from '../food';
import { setOverrides, unsetOverrides } from '../settings';
import * as Sense from './get-new-player-position-via-sense';

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
        it('should move the user up 1/8th of the time', () => {
          jest.spyOn(Math, 'random').mockReturnValue(0.125);
          const playerToMove = players[0];
          const position = getNewPlayerPosition(playerToMove, ground);
          expect(position.x).toEqual(playerToMove.position.x);
          expect(position.y).toEqual(playerToMove.position.y - 1);
        });
        it('should move the user down 1/8 of the time', () => {
          jest.spyOn(Math, 'random').mockReturnValue(0.25);
          const playerToMove = players[0];
          const position = getNewPlayerPosition(playerToMove, ground);
          expect(position.x).toEqual(playerToMove.position.x);
          expect(position.y).toEqual(playerToMove.position.y + 1);
        });
        it('should move the user left 1/8 of the time', () => {
          jest.spyOn(Math, 'random').mockReturnValue(0.375);
          const playerToMove = players[0];
          const position = getNewPlayerPosition(playerToMove, ground);
          expect(position.x).toEqual(playerToMove.position.x - 1);
          expect(position.y).toEqual(playerToMove.position.y);
        });
        it('should move the user right 1/8 of the time', () => {
          jest.spyOn(Math, 'random').mockReturnValue(0.5);
          const playerToMove = players[0];
          const position = getNewPlayerPosition(playerToMove, ground);
          expect(position.x).toEqual(playerToMove.position.x + 1);
          expect(position.y).toEqual(playerToMove.position.y);
        });
        it('should move the user up and left 1/8 of the time', () => {
          jest.spyOn(Math, 'random').mockReturnValue(0.625);
          const playerToMove = players[0];
          const position = getNewPlayerPosition(playerToMove, ground);
          expect(position.x).toEqual(playerToMove.position.x - 1);
          expect(position.y).toEqual(playerToMove.position.y - 1);
        });
        it('should move the user up and right 1/8 of the time', () => {
          jest.spyOn(Math, 'random').mockReturnValue(0.75);
          const playerToMove = players[0];
          const position = getNewPlayerPosition(playerToMove, ground);
          expect(position.x).toEqual(playerToMove.position.x + 1);
          expect(position.y).toEqual(playerToMove.position.y - 1);
        });
        it('should move the user down and left 1/8 of the time', () => {
          jest.spyOn(Math, 'random').mockReturnValue(0.875);
          const playerToMove = players[0];
          const position = getNewPlayerPosition(playerToMove, ground);
          expect(position.x).toEqual(playerToMove.position.x - 1);
          expect(position.y).toEqual(playerToMove.position.y + 1);
        });
        it('should move the user down and right 1/8 of the time', () => {
          jest.spyOn(Math, 'random').mockReturnValue(1);
          const playerToMove = players[0];
          const position = getNewPlayerPosition(playerToMove, ground);
          expect(position.x).toEqual(playerToMove.position.x + 1);
          expect(position.y).toEqual(playerToMove.position.y + 1);
        });
      });
      describe('when the user is in the top row', () => {
        const playersOnTopRow = [createPlayer({ position: { x: 1, y: 0 } })];
        const ground = createGround({
          dimensions,
          players: playersOnTopRow,
        });
        it('should move the user down 1/5 of the time', () => {
          jest.spyOn(Math, 'random').mockReturnValue(0.2);
          const playerToMove = playersOnTopRow[0];
          const position = getNewPlayerPosition(playerToMove, ground);
          expect(position.x).toEqual(playerToMove.position.x);
          expect(position.y).toEqual(playerToMove.position.y + 1);
        });
        it('should move the user left 1/5 of the time', () => {
          jest.spyOn(Math, 'random').mockReturnValue(0.4);
          const playerToMove = playersOnTopRow[0];
          const position = getNewPlayerPosition(playerToMove, ground);
          expect(position.x).toEqual(playerToMove.position.x - 1);
          expect(position.y).toEqual(playerToMove.position.y);
        });
        it('should move the user right 1/5 of the time', () => {
          jest.spyOn(Math, 'random').mockReturnValue(0.6);
          const playerToMove = playersOnTopRow[0];
          const position = getNewPlayerPosition(playerToMove, ground);
          expect(position.x).toEqual(playerToMove.position.x + 1);
          expect(position.y).toEqual(playerToMove.position.y);
        });
        it('should move the user down and left 1/5 of the time', () => {
          jest.spyOn(Math, 'random').mockReturnValue(0.8);
          const playerToMove = playersOnTopRow[0];
          const position = getNewPlayerPosition(playerToMove, ground);
          expect(position.x).toEqual(playerToMove.position.x - 1);
          expect(position.y).toEqual(playerToMove.position.y + 1);
        });
        it('should move the user down and right 1/5 of the time', () => {
          jest.spyOn(Math, 'random').mockReturnValue(1);
          const playerToMove = playersOnTopRow[0];
          const position = getNewPlayerPosition(playerToMove, ground);
          expect(position.x).toEqual(playerToMove.position.x + 1);
          expect(position.y).toEqual(playerToMove.position.y + 1);
        });
      });
      describe('when the user is in the left most row', () => {
        const playersLeftMost = [createPlayer({ position: { x: 0, y: 1 } })];
        const ground = createGround({
          dimensions,
          players: playersLeftMost,
        });
        it('should move the user up 1/5 of the time', () => {
          jest.spyOn(Math, 'random').mockReturnValue(0.2);
          const playerToMove = playersLeftMost[0];
          const position = getNewPlayerPosition(playerToMove, ground);
          expect(position.x).toEqual(playerToMove.position.x);
          expect(position.y).toEqual(playerToMove.position.y - 1);
        });
        it('should move the user down 1/5 of the time', () => {
          jest.spyOn(Math, 'random').mockReturnValue(0.4);
          const playerToMove = playersLeftMost[0];
          const position = getNewPlayerPosition(playerToMove, ground);
          expect(position.x).toEqual(playerToMove.position.x);
          expect(position.y).toEqual(playerToMove.position.y + 1);
        });
        it('should move the user right 1/5 of the time', () => {
          jest.spyOn(Math, 'random').mockReturnValue(0.6);
          const playerToMove = playersLeftMost[0];
          const position = getNewPlayerPosition(playerToMove, ground);
          expect(position.x).toEqual(playerToMove.position.x + 1);
          expect(position.y).toEqual(playerToMove.position.y);
        });
        it('should move the user down and right 1/5 of the time', () => {
          jest.spyOn(Math, 'random').mockReturnValue(0.8);
          const playerToMove = playersLeftMost[0];
          const position = getNewPlayerPosition(playerToMove, ground);
          expect(position.x).toEqual(playerToMove.position.x + 1);
          expect(position.y).toEqual(playerToMove.position.y - 1);
        });
        it('should move the user up and right 1/5 of the time', () => {
          jest.spyOn(Math, 'random').mockReturnValue(1);
          const playerToMove = playersLeftMost[0];
          const position = getNewPlayerPosition(playerToMove, ground);
          expect(position.x).toEqual(playerToMove.position.x + 1);
          expect(position.y).toEqual(playerToMove.position.y + 1);
        });
      });
      describe('when the user is in the bottom most row', () => {
        const playersBottom = [createPlayer({ position: { x: 1, y: dimensions.height - 1 } })];
        const ground = createGround({
          dimensions,
          players: playersBottom,
        });
        it('should move the user up 1/5 of the time', () => {
          jest.spyOn(Math, 'random').mockReturnValue(0.2);
          const playerToMove = playersBottom[0];
          const position = getNewPlayerPosition(playerToMove, ground);
          expect(position.x).toEqual(playerToMove.position.x);
          expect(position.y).toEqual(playerToMove.position.y - 1);
        });
        it('should move the user left 1/5 of the time', () => {
          jest.spyOn(Math, 'random').mockReturnValue(0.4);
          const playerToMove = playersBottom[0];
          const position = getNewPlayerPosition(playerToMove, ground);
          expect(position.x).toEqual(playerToMove.position.x - 1);
          expect(position.y).toEqual(playerToMove.position.y);
        });
        it('should move the user right 1/5 of the time', () => {
          jest.spyOn(Math, 'random').mockReturnValue(0.6);
          const playerToMove = playersBottom[0];
          const position = getNewPlayerPosition(playerToMove, ground);
          expect(position.x).toEqual(playerToMove.position.x + 1);
          expect(position.y).toEqual(playerToMove.position.y);
        });
        it('should move the user up and left 1/5 of the time', () => {
          jest.spyOn(Math, 'random').mockReturnValue(0.8);
          const playerToMove = playersBottom[0];
          const position = getNewPlayerPosition(playerToMove, ground);
          expect(position.x).toEqual(playerToMove.position.x - 1);
          expect(position.y).toEqual(playerToMove.position.y - 1);
        });
        it('should move the user up and right 1/5 of the time', () => {
          jest.spyOn(Math, 'random').mockReturnValue(1);
          const playerToMove = playersBottom[0];
          const position = getNewPlayerPosition(playerToMove, ground);
          expect(position.x).toEqual(playerToMove.position.x + 1);
          expect(position.y).toEqual(playerToMove.position.y - 1);
        });
      });
      describe('when the user is in the right most row', () => {
        const playersRightMost = [createPlayer({ position: { x: dimensions.width - 1, y: 1 } })];
        const ground = createGround({
          dimensions,
          players: playersRightMost,
        });
        it('should move the user up 1/5 of the time', () => {
          jest.spyOn(Math, 'random').mockReturnValue(0.2);
          const playerToMove = playersRightMost[0];
          const position = getNewPlayerPosition(playerToMove, ground);
          expect(position.x).toEqual(playerToMove.position.x);
          expect(position.y).toEqual(playerToMove.position.y - 1);
        });
        it('should move the user down 1/5 of the time', () => {
          jest.spyOn(Math, 'random').mockReturnValue(0.4);
          const playerToMove = playersRightMost[0];
          const position = getNewPlayerPosition(playerToMove, ground);
          expect(position.x).toEqual(playerToMove.position.x);
          expect(position.y).toEqual(playerToMove.position.y + 1);
        });
        it('should move the user left 1/5 of the time', () => {
          jest.spyOn(Math, 'random').mockReturnValue(0.6);
          const playerToMove = playersRightMost[0];
          const position = getNewPlayerPosition(playerToMove, ground);
          expect(position.x).toEqual(playerToMove.position.x - 1);
          expect(position.y).toEqual(playerToMove.position.y);
        });
        it('should move the user down and left 1/5 of the time', () => {
          jest.spyOn(Math, 'random').mockReturnValue(0.8);
          const playerToMove = playersRightMost[0];
          const position = getNewPlayerPosition(playerToMove, ground);
          expect(position.x).toEqual(playerToMove.position.x - 1);
          expect(position.y).toEqual(playerToMove.position.y - 1);
        });
        it('should move the user up and left 1/5 of the time', () => {
          jest.spyOn(Math, 'random').mockReturnValue(1);
          const playerToMove = playersRightMost[0];
          const position = getNewPlayerPosition(playerToMove, ground);
          expect(position.x).toEqual(playerToMove.position.x - 1);
          expect(position.y).toEqual(playerToMove.position.y + 1);
        });
      });
      describe('when the user is in the top left corner', () => {
        const playersTopLeftCorner = [createPlayer({ position: { x: 0, y: 0 } })];
        const ground = createGround({
          dimensions,
          players: playersTopLeftCorner,
        });
        it('should move the user down 1/3 of the time', () => {
          jest.spyOn(Math, 'random').mockReturnValue(0.33);
          const playerToMove = playersTopLeftCorner[0];
          const position = getNewPlayerPosition(playerToMove, ground);
          expect(position.x).toEqual(playerToMove.position.x);
          expect(position.y).toEqual(playerToMove.position.y + 1);
        });
        it('should move the user right 1/3 of the time', () => {
          jest.spyOn(Math, 'random').mockReturnValue(0.66);
          const playerToMove = playersTopLeftCorner[0];
          const position = getNewPlayerPosition(playerToMove, ground);
          expect(position.x).toEqual(playerToMove.position.x + 1);
          expect(position.y).toEqual(playerToMove.position.y);
        });
        it('should move the user down and right 1/3 of the time', () => {
          jest.spyOn(Math, 'random').mockReturnValue(1);
          const playerToMove = playersTopLeftCorner[0];
          const position = getNewPlayerPosition(playerToMove, ground);
          expect(position.x).toEqual(playerToMove.position.x + 1);
          expect(position.y).toEqual(playerToMove.position.y + 1);
        });
      });
      describe('when the user is in the top right corner', () => {
        const playersTopRightCorner = [createPlayer({ position: { x: dimensions.width - 1, y: 0 } })];
        const ground = createGround({
          dimensions,
          players: playersTopRightCorner,
        });
        it('should move the user down 1/3 of the time', () => {
          jest.spyOn(Math, 'random').mockReturnValue(0.33);
          const playerToMove = playersTopRightCorner[0];
          const position = getNewPlayerPosition(playerToMove, ground);
          expect(position.x).toEqual(playerToMove.position.x);
          expect(position.y).toEqual(playerToMove.position.y + 1);
        });
        it('should move the user left 1/3 of the time', () => {
          jest.spyOn(Math, 'random').mockReturnValue(0.66);
          const playerToMove = playersTopRightCorner[0];
          const position = getNewPlayerPosition(playerToMove, ground);
          expect(position.x).toEqual(playerToMove.position.x - 1);
          expect(position.y).toEqual(playerToMove.position.y);
        });
        it('should move the user down and left 1/3 of the time', () => {
          jest.spyOn(Math, 'random').mockReturnValue(1);
          const playerToMove = playersTopRightCorner[0];
          const position = getNewPlayerPosition(playerToMove, ground);
          expect(position.x).toEqual(playerToMove.position.x - 1);
          expect(position.y).toEqual(playerToMove.position.y + 1);
        });
      });
      describe('when the user is in the bottom left corner', () => {
        const playersBottomLeftCorner = [createPlayer({ position: { x: 0, y: dimensions.height - 1 } })];
        const ground = createGround({
          dimensions,
          players: playersBottomLeftCorner,
        });
        it('should move the user up 1/3 of the time', () => {
          jest.spyOn(Math, 'random').mockReturnValue(0.33);
          const playerToMove = playersBottomLeftCorner[0];
          const position = getNewPlayerPosition(playerToMove, ground);
          expect(position.x).toEqual(playerToMove.position.x);
          expect(position.y).toEqual(playerToMove.position.y - 1);
        });
        it('should move the user right 1/3 of the time', () => {
          jest.spyOn(Math, 'random').mockReturnValue(0.66);
          const playerToMove = playersBottomLeftCorner[0];
          const position = getNewPlayerPosition(playerToMove, ground);
          expect(position.x).toEqual(playerToMove.position.x + 1);
          expect(position.y).toEqual(playerToMove.position.y);
        });
        it('should move the user up and right 1/3 of the time', () => {
          jest.spyOn(Math, 'random').mockReturnValue(1);
          const playerToMove = playersBottomLeftCorner[0];
          const position = getNewPlayerPosition(playerToMove, ground);
          expect(position.x).toEqual(playerToMove.position.x + 1);
          expect(position.y).toEqual(playerToMove.position.y - 1);
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
        it('should move the user up 1/3 of the time', () => {
          jest.spyOn(Math, 'random').mockReturnValue(0.33);
          const playerToMove = playersBottomRightCorner[0];
          const position = getNewPlayerPosition(playerToMove, ground);
          expect(position.x).toEqual(playerToMove.position.x);
          expect(position.y).toEqual(playerToMove.position.y - 1);
        });
        it('should move the user left 1/3 of the time', () => {
          jest.spyOn(Math, 'random').mockReturnValue(0.66);
          const playerToMove = playersBottomRightCorner[0];
          const position = getNewPlayerPosition(playerToMove, ground);
          expect(position.x).toEqual(playerToMove.position.x - 1);
          expect(position.y).toEqual(playerToMove.position.y);
        });
        it('should move the user up and left 1/3 of the time', () => {
          jest.spyOn(Math, 'random').mockReturnValue(1);
          const playerToMove = playersBottomRightCorner[0];
          const position = getNewPlayerPosition(playerToMove, ground);
          expect(position.x).toEqual(playerToMove.position.x - 1);
          expect(position.y).toEqual(playerToMove.position.y - 1);
        });
      });
    });
    describe('preventing going back over the same places', () => {
      it('should move the user to places where they have not yet been first', () => {
        /*
         * | M | M | M |
         * | M | X | M |
         * |   | M | M |
         *  Here the user has already moved everywhere except the bottom left
         */
        const previousPositions = new DeepSet([
          { x: 0, y: 0 },
          { x: 0, y: 1 },
          { x: 0, y: 2 },
          { x: 1, y: 0 },
          { x: 1, y: 1 },
          { x: 1, y: 2 },
          { x: 2, y: 1 },
          { x: 2, y: 2 },
        ]);
        const playerToMove = createPlayer({ position: { x: 1, y: 1 }, previousPositions });
        const ground = createGround({ dimensions, players: [playerToMove] });
        const position = getNewPlayerPosition(playerToMove, ground);
        expect(position.x).toEqual(playerToMove.position.x + 1);
        expect(position.y).toEqual(playerToMove.position.y - 1);
      });
      it('should just pick a valid direction if the user already moved all possible ways', () => {
        /*
         * | M | M | M |
         * | M | X | M |
         * | M | M | M |
         *  Here the user has already moved everywhere
         */
        const previousPositions = new DeepSet([
          { x: 0, y: 0 },
          { x: 0, y: 1 },
          { x: 0, y: 2 },
          { x: 1, y: 0 },
          { x: 1, y: 1 },
          { x: 1, y: 2 },
          { x: 2, y: 0 },
          { x: 2, y: 1 },
          { x: 2, y: 2 },
        ]);
        const playerToMove = createPlayer({ position: { x: 1, y: 1 }, previousPositions });
        const ground = createGround({ dimensions, players: [playerToMove] });
        const position = getNewPlayerPosition(playerToMove, ground);
        expect(position).not.toEqual(playerToMove.position);
      });
    });
    describe('senses', () => {
      beforeEach(() => {
        jest.spyOn(Sense, 'getMovementDirectionViaSense');
      });
      describe('useSense is set', () => {
        beforeEach(() => {
          setOverrides({
            useSense: true,
          });
        });
        afterEach(() => {
          unsetOverrides(['useSense']);
        });
        it('should move to food, if they can see it', () => {
          /*
           * | - | - | - |
           * | F | y | - |
           * | - | - | - |
           * we want to move y
           * the only available move for y is right one
           */
          const players = [createPlayer({ position: { x: 1, y: 1 } })];
          const food = [createFood({ position: { x: 0, y: 1 } })];
          const ground = createGround({ dimensions, players, food });
          expect(getNewPlayerPosition(players[0], ground)).toEqual({ x: 0, y: 1 });
          expect(Sense.getMovementDirectionViaSense).toHaveBeenCalled();
        });
      });
      describe('useSense is not set', () => {
        beforeEach(() => {
          setOverrides({
            useSense: false,
          });
        });
        afterEach(() => {
          unsetOverrides(['useSense']);
        });
        it('should not call getMovementDirectionViaSense', () => {
          /*
           * | - | - | - |
           * | F | y | - |
           * | - | - | - |
           * we want to move y
           * the only available move for y is right one
           */
          const players = [createPlayer({ position: { x: 1, y: 1 } })];
          const food = [createFood({ position: { x: 0, y: 1 } })];
          const ground = createGround({ dimensions, players, food });
          getNewPlayerPosition(players[0], ground);
          expect(Sense.getMovementDirectionViaSense).not.toHaveBeenCalled();
        });
      });
    });
    describe('collisions', () => {
      it('should not move to a position where there is another player', () => {
        /*
         * | x | x | x |
         * | x | y | - |
         * | x | x | x |
         * we want to move y
         * the only available move for y is right one
         */
        const players = [
          createPlayer({ position: { x: 0, y: 1 } }),
          createPlayer({ position: { x: 1, y: 0 } }),
          createPlayer({ position: { x: 1, y: 2 } }),
          createPlayer({ position: { x: 1, y: 1 } }),
          createPlayer({ position: { x: 0, y: 0 } }),
          createPlayer({ position: { x: 0, y: 2 } }),
          createPlayer({ position: { x: 2, y: 0 } }),
          createPlayer({ position: { x: 2, y: 2 } }),
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
         * | x | x | x |
         * | x | y | x |
         * | x | x | x |
         * no available moves for y
         */
        const players = [
          createPlayer({ position: { x: 0, y: 1 } }),
          createPlayer({ position: { x: 1, y: 0 } }),
          createPlayer({ position: { x: 1, y: 2 } }),
          createPlayer({ position: { x: 2, y: 1 } }),
          createPlayer({ position: { x: 1, y: 1 } }),
          createPlayer({ position: { x: 0, y: 0 } }),
          createPlayer({ position: { x: 0, y: 2 } }),
          createPlayer({ position: { x: 2, y: 0 } }),
          createPlayer({ position: { x: 2, y: 2 } }),
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
