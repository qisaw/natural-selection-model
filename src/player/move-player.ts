import { Player } from './player';
import { Ground } from '../ground/types';
import { createPlayer } from '.';
import { getNewPlayerPosition } from './get-new-player-position';
import { PlayerNotInGroundError } from '../ground/errors';

export const movePlayer = (player: Player, ground: Ground): Ground => {
  const idx = ground.players.findIndex(({ id }: Player): boolean => id === player.id);
  if (idx === -1) {
    throw new PlayerNotInGroundError(player, ground);
  }
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
