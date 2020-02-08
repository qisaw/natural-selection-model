import { createGround } from './create-ground';
import { isOnOuterEdge } from './is-on-outer-edge';

describe('isOnOuterEdge', () => {
  const dimensions = {
    width: 5,
    height: 15,
  };
  const ground = createGround({ dimensions });
  it('should return true if the position is in the top row', () => {
    expect(isOnOuterEdge({ x: 3, y: 0 }, ground)).toEqual(true);
  });
  it('should return true if the position is in the bottom row', () => {
    expect(isOnOuterEdge({ x: 3, y: 14 }, ground)).toEqual(true);
  });
  it('should return true if the position is in the first column', () => {
    expect(isOnOuterEdge({ x: 0, y: 1 }, ground)).toEqual(true);
  });
  it('should return true if the position is in the last column', () => {
    expect(isOnOuterEdge({ x: 4, y: 1 }, ground)).toEqual(true);
  });
  it('should return false if not in first/last column/row', () => {
    expect(isOnOuterEdge({ x: 1, y: 1 }, ground)).toEqual(false);
  });
  it('should return false if not in width/height range', () => {
    expect(isOnOuterEdge({ x: 0, y: 15 }, ground)).toEqual(false);
    expect(isOnOuterEdge({ x: 0, y: -1 }, ground)).toEqual(false);
    expect(isOnOuterEdge({ x: 4, y: 15 }, ground)).toEqual(false);
    expect(isOnOuterEdge({ x: 4, y: -1 }, ground)).toEqual(false);
    expect(isOnOuterEdge({ x: 5, y: 0 }, ground)).toEqual(false);
    expect(isOnOuterEdge({ x: -1, y: 0 }, ground)).toEqual(false);
    expect(isOnOuterEdge({ x: 5, y: 14 }, ground)).toEqual(false);
    expect(isOnOuterEdge({ x: -1, y: 14 }, ground)).toEqual(false);
  });
});
