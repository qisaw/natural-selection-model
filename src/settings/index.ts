export enum LOG_LEVEL {
  debug,
  info,
  warn,
  error,
  fatal,
}

export const logLevel = (process.env.LOG_LEVEl || LOG_LEVEL.info) as LOG_LEVEL;
export const humanReadableLogs = process.env.HUMAN_READABLE_LOG === 'true' ? true : false;
