import { Player } from './player';

export interface Position {
  x: number;
  y: number;
}

export interface GroundDimensions {
  width: number;
  height: number;
}

export interface GroundCreation {
  dimensions?: GroundDimensions;
  players?: Player[];
}

export interface Ground {
  dimensions: GroundDimensions;
  players: Player[];
}
