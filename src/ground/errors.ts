import { BaseError } from '../errors/base-error';
import { GroundDimensions } from './types';

export class InvalidDimensionsError extends BaseError {
  constructor(dimensions: GroundDimensions) {
    super('InvalidDimensionsError', 'Invalid dimensions', dimensions);
  }
}
