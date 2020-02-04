export interface Position {
  x: number;
  y: number;
}

export interface PlayerData {
  position: Position;
  id?: string;
  label?: string;
  energy?: number;
}
