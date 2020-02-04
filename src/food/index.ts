import { FoodData } from './types';
import { Food } from './food';

export const createFood = (data: FoodData): Food => new Food(data);
