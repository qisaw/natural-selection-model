import { GroundDimensions } from '../core/common-types';
import { Player } from '../core/player';

export class MyError extends Error {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(name: string, message: string, data?: any) {
    super(message);
    this.name = name;
    this.data = data;
  }
}

export class InvalidDimensionsError extends MyError {
  constructor(dimensions: GroundDimensions) {
    super('InvalidDimensionsError', 'Invalid dimensions', dimensions);
  }
}

export class PlayersOutsideGridError extends MyError {
  constructor(players: Player[]) {
    super('PlayersOutsideGridError', 'players were outside the grid', players);
  }
}
