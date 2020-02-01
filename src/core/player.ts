import uuid from 'uuid/v4';
import { Position } from './common-types';

export interface PlayerData {
  position: Position;
}

export class Player {
  readonly position: Position;
  readonly id: string;
  constructor({ position: addedPosition }: PlayerData) {
    this.position = addedPosition;
    this.id = uuid();
  }
}

export const createPlayer = (data: PlayerData): Player => new Player(data);
