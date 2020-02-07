import { Player } from './player';
import { Ground } from '../ground/types';
import { createPlayer } from '.';
import { getNewPlayerPosition } from './get-new-player-position';

export const movePlayer = (player: Player, ground: Ground): Ground => {
  // @TODO check if idx is -1 and throw an error
  const idx = ground.players.findIndex(({ id }: Player): boolean => id === player.id);
  if (player.energy === 0) {
    return { ...ground, players: ground.players.filter(({ id }: Player): boolean => id !== player.id) };
  }
  const newPosition = getNewPlayerPosition(player, ground);
  const newEnergy =
    newPosition.x === player.position.x && newPosition.y === player.position.y ? player.energy : player.energy - 1;
  const newPlayer = createPlayer({ ...player, position: newPosition, energy: newEnergy });
  const newPlayerArray = [...ground.players.slice(0, idx), newPlayer, ...ground.players.slice(idx + 1)];
  return {
    ...ground,
    players: newPlayerArray,
  };
};
