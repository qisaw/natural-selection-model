import { createGround } from './create-ground';
import { getGroundAsString } from './get-ground-as-string';
import { createPlayer } from '../player';

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
  it('should put labels where players are', () => {
    const dimensions = {
      height: 2,
      width: 2,
    };
    const players = [createPlayer({ position: { x: 1, y: 0 }, label: 'a' })];
    const ground = createGround({ dimensions, players });
    const groundAsString = getGroundAsString(ground);
    const expectedString = ['| - | - |', '| a | - |'].join('\n');
    expect(groundAsString).toEqual(expectedString);
  });
});
