import bunyan from 'bunyan';
import bunyanFormat from 'bunyan-format';
import { logLevel, humanReadableLogs } from '../settings';

const format = bunyanFormat({
  outputMode: humanReadableLogs() ? 'short' : 'bunyan',
});

const LOG = bunyan.createLogger({
  name: 'ground',
  level: logLevel(),
  stream: format,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const debug = (msg: string, error?: any): void => LOG.debug({ msg, error });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const info = (msg: string, data?: any): void => LOG.info({ msg, data });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const warn = (msg: string, data?: any): void => LOG.warn({ msg, data });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const error = (msg: string, data?: any): void => LOG.error({ msg, data });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fatal = (msg: string, data?: any): void => LOG.fatal({ msg, data });
