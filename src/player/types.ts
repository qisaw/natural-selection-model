import { Position } from '../global/types';
import { Food } from '../food/food';
export interface PlayerData {
  position: Position;
  id?: string;
  label?: string;
  energy?: number;
  foodEaten?: Food[];
  speed?: number;
}
