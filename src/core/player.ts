import { Position } from './common-types';

export interface PlayerData {
  position: Position;
}

export class Player {
  readonly position: Position;
  constructor({ position: addedPosition }: PlayerData) {
    this.position = addedPosition;
  }
}

export const createPlayer = (data: PlayerData): Player => new Player(data);
