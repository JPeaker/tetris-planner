import Piece from './piece-enum';
import { ActivePiece } from './piece-types';

const numpadMap: { [key: string]: Piece } = {
  Numpad1: Piece.O,
  Numpad2: Piece.I,
  Numpad3: Piece.T,
  Numpad4: Piece.J,
  Numpad5: Piece.L,
  Numpad6: Piece.Z,
  Numpad7: Piece.S,
};

export default function inputHandler(
  event: KeyboardEvent,
  currentPiece: ActivePiece | null,
  grid: number[][],
  setPieceInPlace: () => void,
  getNewPiece: (piece: Piece) => ActivePiece,
  movePiece: (grid: number[][], currentPiece: ActivePiece, newPiece: ActivePiece) => ActivePiece,
  toggleAppState: () => void,
): null | ActivePiece {
  event.preventDefault();

  if (event.code === 'Enter') {
    toggleAppState();
  }

  if (event.code.startsWith('Numpad')) {
    const piece = numpadMap[event.code];

    if (piece !== undefined) {
      return getNewPiece(piece);
    }
  }

  if (event.code === 'Space') {
    setPieceInPlace();
    return null;
  }

  if (currentPiece === null) {
    return null;
  }

  var rowModifier: number;
  if (event.code === 'KeyD') {
    const blockMinRows = currentPiece.blocks.map(block => {
      const firstBlockInTheWay = grid.map(row => !!row[block.column]).indexOf(true);
      return firstBlockInTheWay === -1 ? 22 - block.row : firstBlockInTheWay - block.row;
    });

    rowModifier = Math.min(...blockMinRows) - 1;
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