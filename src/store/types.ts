import Piece from '../piece-enum';

export enum AppStateCategory {
  SETUP,
  OPTIONS,
  COMPARE
};

export enum AppState {
  SETUP_GRID,
  SETUP_ADD_HOLES,
  SETUP_CHOOSE_PRIMARY_PIECE,
  SETUP_CHOOSE_NEXT_PIECE,
  OPTIONS_SUMMARIZE,
  OPTIONS_PLACE_PRIMARY_PIECE,
  OPTIONS_PLACE_NEXT_PIECE,
  OPTIONS_PLACE_POSSIBILITY,
  COMPARE,
  COMPARE_ACTIVE,
  COMPARE_COMPLETE,
};

export enum OptionState {
  UNSTARTED,
  FIRST_PIECE,
  NEXT_PIECE,
  POSSIBILITIES,
  DONE
};

export interface Option {
  id: number;
  state: OptionState;
  gridAfterFirstPiece: number[][] | null;
  gridAfterNextPiece: number[][] | null;
  currentPossibility: Piece | null;
  [Piece.I]: number[][] | null;
  [Piece.T]: number[][] | null;
  [Piece.O]: number[][] | null;
  [Piece.L]: number[][] | null;
  [Piece.J]: number[][] | null;
  [Piece.S]: number[][] | null;
  [Piece.Z]: number[][] | null;
}

export function getAppStateCategory(state: AppState): AppStateCategory {
  switch(state) {
    case AppState.SETUP_GRID:
    case AppState.SETUP_ADD_HOLES:
    case AppState.SETUP_CHOOSE_PRIMARY_PIECE:
    case AppState.SETUP_CHOOSE_NEXT_PIECE:
      return AppStateCategory.SETUP;
    case AppState.OPTIONS_SUMMARIZE:
    case AppState.OPTIONS_PLACE_PRIMARY_PIECE:
    case AppState.OPTIONS_PLACE_NEXT_PIECE:
    case AppState.OPTIONS_PLACE_POSSIBILITY:
      return AppStateCategory.OPTIONS;
    case AppState.COMPARE:
    case AppState.COMPARE_ACTIVE:
    case AppState.COMPARE_COMPLETE:
      return AppStateCategory.COMPARE;
  }
};

export interface Comparison {
  id: number;
  firstOption: Option;
  secondOption: Option;
  activePiece: Piece | null;
  [Piece.I]: number | null;
  [Piece.T]: number | null;
  [Piece.O]: number | null;
  [Piece.L]: number | null;
  [Piece.J]: number | null;
  [Piece.S]: number | null;
  [Piece.Z]: number | null;
}