import { Player } from './player';
import { BaseError } from '../errors/base-error';

export class PlayersOutsideGridError extends BaseError {
  constructor(players: Player[]) {
    super('PlayersOutsideGridError', 'players were outside the grid', players);
  }
}
