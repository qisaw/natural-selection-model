import { LOG_LEVEL } from '../logger/log-levels';

type Overrides = {
  logLevel?: LOG_LEVEL;
  humanReadableLogs?: boolean;
  startingPlayerEnergy?: number;
  shouldMutateSpeed?: boolean;
  maxNumOfAttemptsToGetEmptySpot?: number;
  energyAdditionForFood?: number;
  startingPlayerSpeed?: number;
  defaultPlayerTimeToLive?: number;
  useTimeToLive?: boolean;
};
let overrides: Overrides = {};

export const setOverrides = (addedOvedrrides: Overrides): void => {
  overrides = { ...addedOvedrrides };
};

type AllowedKeys = keyof Overrides;
export const unsetOverrides = (keys: AllowedKeys[]): void => {
  for (const key of keys) {
    overrides[key] = undefined;
  }
};

export const logLevel = (): LOG_LEVEL => overrides.logLevel || LOG_LEVEL.info;
export const humanReadableLogs = (): boolean =>
  overrides.humanReadableLogs === undefined ? true : overrides.humanReadableLogs;
export const startingPlayerEnergy = (): number => overrides.startingPlayerEnergy || 1000;
export const shouldMutateSpeed = (): boolean =>
  overrides.shouldMutateSpeed === undefined ? true : overrides.shouldMutateSpeed;
export const maxNumOfAttemptsToGetEmptySpot = (): number => overrides.maxNumOfAttemptsToGetEmptySpot || 100;
export const energyAdditionForFood = (): number => overrides.energyAdditionForFood || 1000;
export const startingPlayerSpeed = (): number => overrides.startingPlayerSpeed || 2;
export const defaultPlayerTimeToLive = (): number => overrides.defaultPlayerTimeToLive || 10;
export const useTimeToLive = (): boolean => (overrides.useTimeToLive === undefined ? true : overrides.useTimeToLive);
