import Piece from '../piece-enum';
import { AppState, OptionState } from './types';

export const SET_STATE = 'SET_STATE';
export interface SetStateAction {
  type: typeof SET_STATE;
  state: AppState;
};
export function setState(state: AppState): ReduxAction {
  return {
    type: SET_STATE,
    state,
  };
}

export const SET_GRID = 'SET_GRID';
export interface SetGridAction {
  type: typeof SET_GRID;
  grid: number[][];
}
export function setGrid(grid: number[][]): ReduxAction {
  return {
    type: SET_GRID,
    grid,
  };
}

export const SET_PRIMARY_PIECE = 'SET_PRIMARY_PIECE';
export interface SetPrimaryPieceAction {
  type: typeof SET_PRIMARY_PIECE;
  piece: Piece;
};
export function setPrimaryPiece(piece: Piece): ReduxAction {
  return {
    type: SET_PRIMARY_PIECE,
    piece,
  };
}

export const SET_NEXT_PIECE = 'SET_NEXT_PIECE';
export interface SetNextPieceAction {
  type: typeof SET_NEXT_PIECE;
  piece: Piece;
};
export function setNextPiece(piece: Piece): ReduxAction {
  return {
    type: SET_NEXT_PIECE,
    piece,
  };
}

export const SET_PLAY_OPTIONS_OPTION = 'SET_PLAY_OPTIONS_OPTION';
export interface SetPlayOptionsOptionAction {
  type: typeof SET_PLAY_OPTIONS_OPTION;
  id: number | null;
};
export function setPlayOptionsOption(id: number | null): ReduxAction {
  return {
    type: SET_PLAY_OPTIONS_OPTION,
    id,
  };
}

export const INITIALIZE_PLAY_OPTIONS_STATE = 'INITIALIZE_PLAY_OPTIONS_STATE';
export interface InitializePlayOptionsStateAction {
  type: typeof INITIALIZE_PLAY_OPTIONS_STATE;
};
export function initializePlayOptionsState(): ReduxAction {
  return { type: INITIALIZE_PLAY_OPTIONS_STATE };
};

export const SET_PLAY_OPTIONS_OPTION_STATE = 'SET_PLAY_OPTIONS_OPTION_STATE';
export interface SetPlayOptionsOptionStateAction {
  type: typeof SET_PLAY_OPTIONS_OPTION_STATE;
  state: OptionState;
};
export function setPlayOptionsOptionState(state: OptionState): ReduxAction {
  return {
    type: SET_PLAY_OPTIONS_OPTION_STATE,
    state,
  };
};

export const SET_PLAY_OPTIONS_OPTION_GRID_AFTER_FIRST_PIECE = 'SET_PLAY_OPTIONS_OPTION_GRID_AFTER_FIRST_PIECE';
export interface SetPlayOptionsOptionGridAfterFirstPieceAction {
  type: typeof SET_PLAY_OPTIONS_OPTION_GRID_AFTER_FIRST_PIECE;
  grid: number[][];
};
export function setPlayOptionsOptionGridAfterFirstPiece(grid: number[][]): ReduxAction {
  return {
    type: SET_PLAY_OPTIONS_OPTION_GRID_AFTER_FIRST_PIECE,
    grid,
  };
};

export const SET_PLAY_OPTIONS_OPTION_GRID_AFTER_NEXT_PIECE = 'SET_PLAY_OPTIONS_OPTION_GRID_AFTER_NEXT_PIECE';
export interface SetPlayOptionsOptionGridAfterNextPieceAction {
  type: typeof SET_PLAY_OPTIONS_OPTION_GRID_AFTER_NEXT_PIECE;
  grid: number[][];
};
export function setPlayOptionsOptionGridAfterNextPiece(grid: number[][]): ReduxAction {
  return {
    type: SET_PLAY_OPTIONS_OPTION_GRID_AFTER_NEXT_PIECE,
    grid,
  };
};

export const SET_PLAY_OPTIONS_OPTION_POSSIBILITY = 'SET_PLAY_OPTIONS_OPTION_POSSIBILITY';
export interface SetPlayOptionsOptionPossibilityAction {
  type: typeof SET_PLAY_OPTIONS_OPTION_POSSIBILITY;
  piece: Piece;
};
export function setPlayOptionsOptionPossibility(piece: Piece): ReduxAction {
  return {
    type: SET_PLAY_OPTIONS_OPTION_POSSIBILITY,
    piece,
  };
};

export const SET_PLAY_OPTIONS_OPTION_GRID_AFTER_POSSIBILITY = 'SET_PLAY_OPTIONS_OPTION_GRID_AFTER_POSSIBILITY';
export interface SetPlayOptionsOptionGridAfterPossibilityAction {
  type: typeof SET_PLAY_OPTIONS_OPTION_GRID_AFTER_POSSIBILITY;
  piece: Piece;
  grid: number[][];
};
export function setPlayOptionsOptionGridAfterPossibility(piece: Piece, grid: number[][]): ReduxAction {
  return {
    type: SET_PLAY_OPTIONS_OPTION_GRID_AFTER_POSSIBILITY,
    piece,
    grid,
  };
};

export const ADD_PLAY_OPTIONS_OPTION = 'ADD_PLAY_OPTIONS_OPTION';
export interface AddPlayOptionsOptionAction {
  type: typeof ADD_PLAY_OPTIONS_OPTION;
};
export function addPlayOptionsOption(): ReduxAction {
  return { type: ADD_PLAY_OPTIONS_OPTION };
};

export const ADD_COMPARISON = 'ADD_COMPARISON';
export interface AddComparisonAction {
  type: typeof ADD_COMPARISON;
  firstOption: number;
  secondOption: number;
};
export function addComparison(firstOption: number, secondOption: number): ReduxAction {
  return {
    type: ADD_COMPARISON,
    firstOption,
    secondOption,
  };
};

export const SET_COMPARISON_ACTIVE_PIECE = 'SET_COMPARISON_ACTIVE_PIECE';
export interface SetComparisonActivePieceAction {
  type: typeof SET_COMPARISON_ACTIVE_PIECE;
  piece: Piece;
};
export function setComparisonActivePiece(piece: Piece): ReduxAction {
  return {
    type: SET_COMPARISON_ACTIVE_PIECE,
    piece,
  };
};

export const ADVANCE_COMPARISON_ACTIVE_PIECE = 'ADVANCE_COMPARISON_ACTIVE_PIECE';
export interface AdvanceComparisonActivePieceAction {
  type: typeof ADVANCE_COMPARISON_ACTIVE_PIECE;
};
export function advanceComparisonActivePiece(): ReduxAction {
  return {
    type: ADVANCE_COMPARISON_ACTIVE_PIECE,
  };
};

export const SET_ACTIVE_COMPARISON = 'SET_ACTIVE_COMPARISON';
export interface SetActiveComparisonAction {
  type: typeof SET_ACTIVE_COMPARISON;
  id: number;
};
export function setActiveComparison(id: number): ReduxAction {
  return {
    type: SET_ACTIVE_COMPARISON,
    id
  };
};

export const SET_COMPARISON_PIECE_CHOICE = 'SET_COMPARISON_PIECE_CHOICE';
export interface SetComparisonPieceChoiceAction {
  type: typeof SET_COMPARISON_PIECE_CHOICE;
  id: number;
};
export function setComparisonPieceChoice(id: number): ReduxAction {
  return {
    type: SET_COMPARISON_PIECE_CHOICE,
    id
  };
};

export type ReduxAction = (
  SetStateAction |
  SetGridAction |
  SetPrimaryPieceAction |
  SetNextPieceAction |
  SetPlayOptionsOptionAction |
  InitializePlayOptionsStateAction |
  SetPlayOptionsOptionStateAction |
  SetPlayOptionsOptionGridAfterFirstPieceAction |
  SetPlayOptionsOptionGridAfterNextPieceAction |
  SetPlayOptionsOptionPossibilityAction |
  SetPlayOptionsOptionGridAfterPossibilityAction |
  AddPlayOptionsOptionAction |
  AddComparisonAction |
  SetComparisonActivePieceAction |
  SetActiveComparisonAction |
  SetComparisonPieceChoiceAction |
  AdvanceComparisonActivePieceAction
);