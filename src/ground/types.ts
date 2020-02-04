import { Player } from '../player/player';
import { Food } from '../food/food';

export interface GroundDimensions {
  width: number;
  height: number;
}

export interface GroundCreation {
  dimensions?: GroundDimensions;
  players?: Player[];
  food?: Food[];
}

export interface Ground {
  dimensions: GroundDimensions;
  players: Player[];
  playersDeadThisTurn: Player[];
  food: Food[];
  id: string;
}
