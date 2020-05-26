import Piece from './piece-enum';
import { ActivePiece, BlockPlace } from './piece-types';

export function movePiece(grid: number[][], currentPiece: ActivePiece, newPiece: ActivePiece): ActivePiece {
  const orientedNewPiece = getPiece(newPiece);

  const blocked = orientedNewPiece.blocks.some(block => {
    return (
      block.row < 0 ||
      block.row >= 22 ||
      block.column < 0 ||
      block.column >= 10 ||
      grid[block.row][block.column] !== 0
    );
  });

  if (blocked) {
    return currentPiece;
  }

  return orientedNewPiece;
}

export const getMap = {
  [Piece.O]: getO,
  [Piece.I]: getI,
  [Piece.T]: getT,
  [Piece.L]: getL,
  [Piece.J]: getJ,
  [Piece.S]: getS,
  [Piece.Z]: getZ,
}

export function getPiece(
  piece: Omit<ActivePiece, 'blocks'>
): ActivePiece {
  return getMap[piece.type](piece.row, piece.column, piece.orientation);
}

function getO(row: number, column: number, orientation: number): ActivePiece {
  return {
    type: Piece.O,
    row,
    column,
    orientation,
    blocks: [
      { row: row, column: column, value: 3 },
      { row: row, column: column - 1, value: 3 },
      { row: row + 1, column: column, value: 3 },
      { row: row + 1, column: column - 1, value: 3 },
    ]
  };
}

function getI(row: number, column: number, orientation: number) {
  const blocks: BlockPlace[] = [];
  switch (orientation) {
    case 0:
    case 2:
      blocks.push({ row, column: column-2, value: 3 });
      blocks.push({ row, column: column-1, value: 3 });
      blocks.push({ row, column: column, value: 3 });
      blocks.push({ row, column: column+1, value: 3 });
      break;
    case 1:
    case 3:
      blocks.push({ row: row - 2, column, value: 3 });
      blocks.push({ row: row - 1, column, value: 3 });
      blocks.push({ row: row, column, value: 3 });
      blocks.push({ row: row + 1, column, value: 3 });
      break;
    default:
        throw new Error('Unknown orientation');
  }

  return {
    type: Piece.I,
    row,
    column,
    orientation,
    blocks,
  };
}

function getT(row: number, column: number, orientation: number) {
  const blocks: BlockPlace[] = [];

  switch (orientation) {
    case 0:
      blocks.push({ row: row, column: column-1, value: 3 });
      blocks.push({ row: row, column: column, value: 3 });
      blocks.push({ row: row, column: column+1, value: 3 });
      blocks.push({ row: row+1, column: column, value: 3 });
      break;
    case 1:
      blocks.push({ row: row-1, column: column, value: 3 });
      blocks.push({ row: row, column: column+1, value: 3 });
      blocks.push({ row: row, column: column, value: 3 });
      blocks.push({ row: row+1, column: column, value: 3 });
      break;
    case 2:
      blocks.push({ row: row-1, column: column, value: 3 });
      blocks.push({ row: row, column: column-1, value: 3 });
      blocks.push({ row: row, column: column, value: 3 });
      blocks.push({ row: row, column: column+1, value: 3 });
      break;
    case 3:
      blocks.push({ row: row-1, column: column, value: 3 });
      blocks.push({ row: row, column: column-1, value: 3 });
      blocks.push({ row: row, column: column, value: 3 });
      blocks.push({ row: row+1, column: column, value: 3 });
      break;
    default:
      throw new Error('Unknown orientation');
  }

  return {
    type: Piece.T,
    row,
    column,
    orientation,
    blocks,
  };
}

function getL(row: number, column: number, orientation: number) {
  const blocks: BlockPlace[] = [];

  switch (orientation) {
    case 0:
      blocks.push({ row: row, column: column-1, value: 1 });
      blocks.push({ row: row, column: column, value: 1 });
      blocks.push({ row: row, column: column+1, value: 1 });
      blocks.push({ row: row+1, column: column-1, value: 1 });
      break;
    case 1:
      blocks.push({ row: row-1, column: column, value: 1 });
      blocks.push({ row: row, column: column, value: 1 });
      blocks.push({ row: row+1, column: column, value: 1 });
      blocks.push({ row: row+1, column: column+1, value: 1 });
      break;
    case 2:
      blocks.push({ row: row-1, column: column+1, value: 1 });
      blocks.push({ row: row, column: column-1, value: 1 });
      blocks.push({ row: row, column: column, value: 1 });
      blocks.push({ row: row, column: column+1, value: 1 });
      break;
    case 3:
      blocks.push({ row: row-1, column: column, value: 1 });
      blocks.push({ row: row-1, column: column-1, value: 1 });
      blocks.push({ row: row, column: column, value: 1 });
      blocks.push({ row: row+1, column: column, value: 1 });
      break;
    default:
      throw new Error('Unknown orientation');
  }

  return {
    type: Piece.L,
    row,
    column,
    orientation,
    blocks,
  };
}

function getJ(row: number, column: number, orientation: number) {
  const blocks: BlockPlace[] = [];

  switch (orientation) {
    case 0:
      blocks.push({ row: row, column: column-1, value: 2 });
      blocks.push({ row: row, column: column, value: 2 });
      blocks.push({ row: row, column: column+1, value: 2 });
      blocks.push({ row: row+1, column: column+1, value: 2 });
      break;
    case 1:
      blocks.push({ row: row-1, column: column, value: 2 });
      blocks.push({ row: row-1, column: column+1, value: 2 });
      blocks.push({ row: row, column: column, value: 2 });
      blocks.push({ row: row+1, column: column, value: 2 });
      break;
    case 2:
      blocks.push({ row: row-1, column: column-1, value: 2 });
      blocks.push({ row: row, column: column-1, value: 2 });
      blocks.push({ row: row, column: column, value: 2 });
      blocks.push({ row: row, column: column+1, value: 2 });
      break;
    case 3:
      blocks.push({ row: row-1, column: column, value: 2 });
      blocks.push({ row: row, column: column, value: 2 });
      blocks.push({ row: row+1, column: column, value: 2 });
      blocks.push({ row: row+1, column: column-1, value: 2 });
      break;
    default:
      throw new Error('Unknown orientation');
  }

  return {
    type: Piece.J,
    row,
    column,
    orientation,
    blocks,
  };
}

function getS(row: number, column: number, orientation: number) {
  const blocks: BlockPlace[] = [];

  switch (orientation) {
    case 0:
    case 2:
      blocks.push({ row: row, column: column, value: 2 });
      blocks.push({ row: row, column: column+1, value: 2 });
      blocks.push({ row: row+1, column: column, value: 2 });
      blocks.push({ row: row+1, column: column-1, value: 2 });
      break;
    case 1:
    case 3:
      blocks.push({ row: row-1, column: column, value: 2 });
      blocks.push({ row: row, column: column, value: 2 });
      blocks.push({ row: row, column: column+1, value: 2 });
      blocks.push({ row: row+1, column: column+1, value: 2 });
      break;
    default:
      throw new Error('Unknown orientation');
  }

  return {
    type: Piece.S,
    row,
    column,
    orientation,
    blocks,
  };
}

function getZ(row: number, column: number, orientation: number) {
  const blocks: BlockPlace[] = [];

  switch (orientation) {
    case 0:
    case 2:
      blocks.push({ row: row, column: column-1, value: 1 });
      blocks.push({ row: row, column: column, value: 1 });
      blocks.push({ row: row+1, column: column, value: 1 });
      blocks.push({ row: row+1, column: column+1, value: 1 });
      break;
    case 1:
    case 3:
      blocks.push({ row: row-1, column: column+1, value: 1 });
      blocks.push({ row: row, column: column, value: 1 });
      blocks.push({ row: row, column: column+1, value: 1 });
      blocks.push({ row: row+1, column: column, value: 1 });
      break;
    default:
      throw new Error('Unknown orientation');
  }

  return {
    type: Piece.Z,
    row,
    column,
    orientation,
    blocks,
  };
}
