import { BaseError } from '../errors/base-error';
import { GroundDimensions, Ground } from './types';
import { Player } from '../player/player';

export class InvalidDimensionsError extends BaseError {
  constructor(dimensions: GroundDimensions) {
    super('InvalidDimensionsError', 'Invalid dimensions', dimensions);
  }
}

export class PlayerNotInGroundError extends BaseError {
  constructor(player: Player, ground: Ground) {
    super('PlayerNotInGroundError', 'Player not in ground', {
      playerId: player.id,
      groundId: ground.id,
      groundPlayersId: ground.players.map(({ id }) => id),
    });
  }
}
