import uuid from 'uuid/v4';
import { PlayerData, Position } from './types';

export class Player {
  readonly position: Position;
  readonly id: string;
  readonly label: string;
  readonly energy: number;
  constructor({ position: addedPosition, id, label, energy }: PlayerData) {
    this.position = addedPosition;
    this.id = id || uuid();
    this.label = label || 'x';
    this.energy = energy || 1000;
  }
}
