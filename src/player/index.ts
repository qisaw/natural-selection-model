import { Player } from './player';
import { PlayerData } from './types';

export const createPlayer = (data: PlayerData): Player => new Player(data);
