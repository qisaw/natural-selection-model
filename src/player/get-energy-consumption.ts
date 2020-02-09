import { Player } from './player';

// @TODO for now every player has mass 1
// Change this later when we are adding variables
const mass = 1;
export const getEnergyConsumption = (player: Player): number => {
  return mass * Math.pow(player.speed, 2);
};
