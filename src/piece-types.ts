import Piece from './piece-enum';

export enum BlockValue {
  EMPTY = 0,
  ACTIVE_1 = 1,
  ACTIVE_2 = 2,
  ACTIVE_3 = 3,
  TRANSPARENT_1 = 4,
  TRANSPARENT_2 = 5,
  TRANSPARENT_3 = 6,
};

export interface BlockPlace {
  row: number,
  column: number,
  value: BlockValue,
};

export interface ActivePiece {
  type: Piece,
  row: number,
  column: number,
  orientation: number,
  blocks: BlockPlace[],
};