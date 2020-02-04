import { BaseError } from '../errors/base-error';
import { Food } from './food';

export class FoodOutsideGridError extends BaseError {
  constructor(food: Food[]) {
    super('PlayersOutsideGridError', 'players were outside the grid', food);
  }
}
