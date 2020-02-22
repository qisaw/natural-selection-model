import { Position } from '../global/types';
import { Food } from '../food/food';
import { Player } from './player';
import { DeepSet } from '../utils/deep-set';
export interface PlayerData {
  position: Position;
  id?: string;
  label?: string;
  energy?: number;
  foodEaten?: Food[];
  speed?: number;
  previousPositions?: DeepSet<Position>;
  timeToLive?: number;
  sense?: number;
}

export type PlayerMovementPattern = Map<string, boolean[]>;
