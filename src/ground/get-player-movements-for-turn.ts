import { Player } from '../player/player';
import { getPlayerMovementPattern } from '../player/get-player-movement-pattern';

export const getPlayerMovementsForTurns = (players: Player[]): Map<number, string[]> => {
  let maxTurns = 0;
  players.forEach(({ speed }) => {
    if (speed > maxTurns) {
      maxTurns = speed;
    }
  });
  const playerMovementPatterns = getPlayerMovementPattern(players, maxTurns);
  const map = new Map();
  for (let i = 0; i < maxTurns; i++) {
    const pattersForTurn: string[] = [];
    players.forEach(({ id }) => {
      const playerMovement = playerMovementPatterns.get(id) || [];
      const shouldPlayerMoveOnTurn = playerMovement[i];
      if (shouldPlayerMoveOnTurn) {
        pattersForTurn.push(id);
      }
    });
    map.set(i, pattersForTurn);
  }
  return map;
};
