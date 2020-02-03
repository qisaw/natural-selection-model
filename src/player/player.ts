import uuid from 'uuid/v4';
import { PlayerData, Position } from './types';

export class Player {
  readonly position: Position;
  readonly id: string;
  readonly label: string;
  constructor({ position: addedPosition, id, label }: PlayerData) {
    this.position = addedPosition;
    this.id = id || uuid();
    this.label = label || 'x';
  }
}
