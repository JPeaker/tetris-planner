import Piece from './piece-enum';
import { ActivePiece } from './piece-types';

const numpadMap: { [key: string]: Piece } = {
  Numpad5: Piece.I,
  Numpad4: Piece.O,
  Numpad6: Piece.T,
  Numpad7: Piece.L,
  Numpad9: Piece.J,
  Numpad1: Piece.S,
  Numpad3: Piece.Z,
};

export default function inputHandler(
  event: KeyboardEvent,
  currentPiece: ActivePiece | null,
  grid: number[][],
  setPieceInPlace: () => void,
  getNewPiece: (piece: Piece) => ActivePiece,
  movePiece: (grid: number[][], currentPiece: ActivePiece, newPiece: ActivePiece) => ActivePiece,
  disabled?: boolean,
): null | ActivePiece {
  if (disabled) {
    return null;
  }

  if (event.code.startsWith('Numpad')) {
    const piece = numpadMap[event.code];

    if (piece !== undefined) {
      event.preventDefault();
      return getNewPiece(piece);
    }
  }

  if (
    currentPiece === null ||
    (event.code !== 'KeyD' &&
    event.code !== 'KeyS' &&
    event.code !== 'KeyA' &&
    event.code !== 'ArrowUp' &&
    event.code !== 'ArrowDown' &&
    event.code !== 'ArrowLeft' &&
    event.code !== 'ArrowRight' &&
    event.code !== 'Space')
  ) {
    return null;
  }

  event.preventDefault();

  var rowModifier: number;
  if (event.code === 'KeyD' || event.code === 'Space') {
    const blockMinRows = currentPiece.blocks.map(block => {
      const firstBlockInTheWay = grid.map((row, rowIndex) =>
        rowIndex > block.row && !!row[block.column]).indexOf(true);
      return firstBlockInTheWay === -1 ? 22 - block.row : firstBlockInTheWay - block.row;
    });

    rowModifier = Math.min(...blockMinRows) - 1;

    if (rowModifier === 0 && event.code === 'Space') {
      setPieceInPlace();
      return null;
    }
  } else {
    rowModifier = event.code === 'ArrowUp' ? -1 : event.code === 'ArrowDown' ? 1 : 0;
  }

  const orientationModifier = event.code === 'KeyS' ? -1 : event.code === 'KeyA' ? 1 : 0;
  const columnModifier = event.code === 'ArrowLeft' ? -1 : event.code === 'ArrowRight' ? 1 : 0;

  const newPiece = Object.assign(
    {},
    currentPiece,
    {
      orientation: (currentPiece.orientation + orientationModifier + 4) % 4,
      column: Math.min(currentPiece.column + columnModifier),
      row: Math.min(currentPiece.row + rowModifier),
    }
  );

  return movePiece(grid, currentPiece, newPiece);
};