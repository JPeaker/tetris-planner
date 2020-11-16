import { Piece } from "nes-tetris-representation/lib/piece-types";
import { AppState } from "../store/types";

export default function inputHandler(
  event: KeyboardEvent,
  state: AppState,
  primaryPiece: Piece | null,
  nextPiece: Piece | null,
  setState: (state: AppState) => void,
  moveToPlayOptions: () => void,
): void {
  if (event.code === 'Space') {
    event.preventDefault();
    switch(state) {
      case AppState.SETUP_GRID:
        setState(AppState.SETUP_ADD_HOLES);
        break;
      case AppState.SETUP_ADD_HOLES:
        setState(AppState.SETUP_CHOOSE_PRIMARY_PIECE);
        break;
      case AppState.SETUP_CHOOSE_PRIMARY_PIECE:
        if (primaryPiece !== null) {
          setState(AppState.SETUP_CHOOSE_NEXT_PIECE);
        }
        break;
      case AppState.SETUP_CHOOSE_NEXT_PIECE:
        if (nextPiece !== null) {
          moveToPlayOptions();
        }
        break;
    }
  } else if (event.code === 'Backspace') {
    switch(state) {
      case AppState.SETUP_ADD_HOLES:
        setState(AppState.SETUP_GRID);
        break;
      case AppState.SETUP_CHOOSE_PRIMARY_PIECE:
        setState(AppState.SETUP_ADD_HOLES);
        break;
      case AppState.SETUP_CHOOSE_NEXT_PIECE:
        setState(AppState.SETUP_CHOOSE_PRIMARY_PIECE);
        break;
    }
  }
};