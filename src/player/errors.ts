import { Player } from './player';
import { BaseError } from '../errors/base-error';
import { GroundDimensions } from '../ground/types';

export class PlayersOutsideGridError extends BaseError {
  constructor(players: Player[]) {
    super('PlayersOutsideGridError', 'players were outside the grid', players);
  }
}

export class PlayerNotInGroundError extends BaseError {
  constructor(player: Player, dimensions: GroundDimensions) {
    super('PlayerNotInGroundError', 'players were outside the ground', { player, dimensions });
  }
}
