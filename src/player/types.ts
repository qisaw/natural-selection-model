import { Position } from '../global/types';
import { Food } from '../food/food';
import { Player } from './player';
export interface PlayerData {
  position: Position;
  id?: string;
  label?: string;
  energy?: number;
  foodEaten?: Food[];
  speed?: number;
  previousPositions?: Set<Position>;
}

export type PlayerMovementPattern = Map<Player, boolean[]>;
