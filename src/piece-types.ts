import Piece from './piece-enum';

export interface BlockPlace {
  row: number,
  column: number,
  value: number,
};

export interface ActivePiece {
  type: Piece,
  row: number,
  column: number,
  orientation: number,
  blocks: BlockPlace[],
};