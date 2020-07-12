import Piece, { PieceList } from '../piece-enum';

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
  disabled?: boolean,
): null | Piece {
  if (disabled) {
    return null;
  }

  if (event.code.startsWith('Numpad')) {
    const piece = numpadMap[event.code];

    if (piece !== undefined) {
      event.preventDefault();
      return piece;
    }
  }

  if (event.code.startsWith('Key')) {
    const pieceKey = event.code.substring(3, 4);

    for (let i = 0; i < PieceList.length; i++) {
      const { value, label } = PieceList[i];

      if (label === pieceKey) {
        return value;
      }
    }
  }

  if (event.code.startsWith('Digit')) {
    const digit = event.code.substring(5, 6);
    const index = parseInt(digit, 10) - 1;

    if (index <= 7) {
      return [
        Piece.L,
        Piece.J,
        Piece.Z,
        Piece.S,
        Piece.O,
        Piece.T,
        Piece.I
      ][index];
    }
  }

  return null;
};