import { createGround } from './create-ground';
import { printGround } from './print-ground';
import { createPlayer } from '../player';
import { humanReadableLogs } from '../settings';

//eslint-disable-next-line @typescript-eslint/no-explicit-any
const humanReadableLogsMock = humanReadableLogs as jest.MockedFunction<typeof humanReadableLogs>;
jest.mock('../settings');

describe('printGround', () => {
  describe('when humanReadableLogs is set', () => {
    it('should return the ground unchanged', () => {
      humanReadableLogsMock.mockReturnValue(true);
      const dimensions = {
        height: 2,
        width: 2,
      };
      const players = [createPlayer({ position: { x: 1, y: 0 } })];
      const ground = createGround({ dimensions, players });
      expect(printGround(ground)).toBe(ground);
    });
  });
  describe('when humanReadableLogs is not set', () => {
    it('should return the ground unchanged', () => {
      humanReadableLogsMock.mockReturnValue(false);
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
