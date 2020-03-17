import { v4 as uuid } from 'uuid';
import { Position } from '../global/types';
import { FoodData } from './types';

const defultEnergyAddition = 1;
export class Food {
  readonly position: Position;
  readonly id: string;
  readonly energyAddition: number;
  readonly label: string;
  constructor({ position, energyAddition, label }: FoodData) {
    this.position = position;
    this.id = uuid();
    this.energyAddition = energyAddition || defultEnergyAddition;
    this.label = label || '*';
  }
}
