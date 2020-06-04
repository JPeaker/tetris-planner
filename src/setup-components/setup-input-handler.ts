import { AppState } from "../store/types";
import Piece from "../piece-enum";

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
  }
};