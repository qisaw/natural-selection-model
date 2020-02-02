import { Ground } from './types';
import { humanReadableLogs } from '../settings';
import { getGroundAsString } from './get-ground-as-string';
import { info } from '../logger';

export const printGround = (ground: Ground): Ground => {
  const groundAsString = getGroundAsString(ground);
  if (humanReadableLogs()) {
    // use console.log here so we can line up the board properly
    // eslint-disable-next-line no-console
    console.log('------- ground -------');
    // eslint-disable-next-line no-console
    console.log(groundAsString);
  } else {
    info('board', groundAsString);
  }
  return ground;
};
