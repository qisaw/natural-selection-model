import { Player } from '../player/player';

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
  id: string;
}
