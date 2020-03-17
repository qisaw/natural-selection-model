import { v4 as uuid } from 'uuid';
import { PlayerData } from './types';
import { Position } from '../global/types';
import { Food } from '../food/food';
import { startingPlayerEnergy, startingPlayerSpeed, defaultPlayerTimeToLive, defaultSense } from '../settings';
import { DeepSet } from '../utils/deep-set';

export class Player {
  readonly position: Position;
  readonly id: string;
  readonly label: string;
  readonly energy: number;
  readonly foodEaten: Food[];
  readonly speed: number;
  readonly previousPositions: DeepSet<Position>;
  readonly timeToLive: number;
  readonly sense: number;

  constructor({ position, id, label, energy, foodEaten, speed, previousPositions, timeToLive, sense }: PlayerData) {
    this.position = position;
    this.id = id || uuid();
    this.label = label || 'x';
    this.energy = energy === undefined ? startingPlayerEnergy() : energy;
    this.foodEaten = foodEaten || [];
    this.speed = speed || startingPlayerSpeed();
    this.previousPositions = previousPositions || new DeepSet();
    this.timeToLive = timeToLive === undefined ? defaultPlayerTimeToLive() : timeToLive;
    this.sense = sense === undefined ? defaultSense() : sense;
  }
}
