import uuid from 'uuid/v4';
import { PlayerData } from './types';
import { Position } from '../global/types';
import { Food } from '../food/food';
import { getStartingPlayerEnergy } from '../settings';

export class Player {
  readonly position: Position;
  readonly id: string;
  readonly label: string;
  readonly energy: number;
  readonly foodEaten: Food[];
  constructor({ position, id, label, energy, foodEaten }: PlayerData) {
    this.position = position;
    this.id = id || uuid();
    this.label = label || 'x';
    this.energy = energy === undefined ? getStartingPlayerEnergy() : energy;
    this.foodEaten = foodEaten || [];
  }
}
