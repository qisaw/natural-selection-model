export enum LOG_LEVEL {
  debug,
  info,
  warn,
  error,
  fatal,
}

export const logLevel = (): LOG_LEVEL => (process.env.LOG_LEVEl || LOG_LEVEL.info) as LOG_LEVEL;
export const humanReadableLogs = (): boolean => (process.env.HUMAN_READABLE_LOG === 'true' ? true : false);
export const getStartingPlayerEnergy = (): number => 1000;
export const shouldMutateSpeed = (): boolean => (process.env.MUTATE_SPEED === 'false' ? false : true);
export const maxNumOfAttemptsToGetEmptySpot = (): number => 100;
