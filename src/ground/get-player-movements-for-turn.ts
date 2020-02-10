import { Player } from '../player/player';
import { getPlayerMovementPattern } from '../player/get-player-movement-pattern';

export const getPlayerMovementsForTurns = (players: Player[]): Map<number, Player[]> => {
  let maxTurns = 0;
  players.forEach(({ speed }) => {
    if (speed > maxTurns) {
      maxTurns = speed;
    }
  });
  const playerMovementPatterns = getPlayerMovementPattern(players, maxTurns);
  const map = new Map();
  for (let i = 0; i < maxTurns; i++) {
    const pattersForTurn: Player[] = [];
    players.forEach(player => {
      const playerMovement = playerMovementPatterns.get(player) || [];
      const shouldPlayerMoveOnTurn = playerMovement[i];
      if (shouldPlayerMoveOnTurn) {
        pattersForTurn.push(player);
      }
    });
    map.set(i, pattersForTurn);
  }
  return map;
};
