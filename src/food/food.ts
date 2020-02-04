import uuid from 'uuid/v4';
import { Position } from '../global/types';
import { FoodData } from './types';

const defultEnergyAddition = 1;
export class Food {
  readonly position: Position;
  readonly id: string;
  readonly energyAddition: number;
  constructor({ position, energyAddition }: FoodData) {
    this.position = position;
    this.id = uuid();
    this.energyAddition = energyAddition || defultEnergyAddition;
  }
}
