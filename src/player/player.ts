import uuid from 'uuid/v4';
import { PlayerData, Position } from './types';

export class Player {
  readonly position: Position;
  readonly id: string;
  constructor({ position: addedPosition, id }: PlayerData) {
    this.position = addedPosition;
    this.id = id || uuid();
  }
}
