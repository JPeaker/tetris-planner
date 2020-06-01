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
  id: number;
};
export function setPlayOptionsOption(id: number): ReduxAction {
  return {
    type: SET_PLAY_OPTIONS_OPTION,
    id,
  };
}

export const SET_PLAY_OPTIONS_OPTION_PRIMARY_PIECE = 'SET_PLAY_OPTIONS_OPTION_PRIMARY_PIECE';
export interface SetPlayOptionsPrimaryPieceAction {
  type: typeof SET_PLAY_OPTIONS_OPTION_PRIMARY_PIECE;
  piece: Piece;
  grid: number[][];
};
export function setPlayOptionsOptionPrimaryPiece(piece: Piece, grid: number[][]): ReduxAction {
  return {
    type: SET_PLAY_OPTIONS_OPTION_PRIMARY_PIECE,
    piece,
    grid,
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

export const SET_PLAY_OPTIONS_OPTION_POSSIBLITY = 'SET_PLAY_OPTIONS_OPTION_POSSIBLITY';
export interface SetPlayOptionsOptionPossiblity {
  type: typeof SET_PLAY_OPTIONS_OPTION_POSSIBLITY;
  piece: Piece;
};
export function setPlayOptionsOptionPossibility(piece: Piece) {
  return {
    type: SET_PLAY_OPTIONS_OPTION_POSSIBLITY,
    piece,
  };
};

export type ReduxAction = (
  SetStateAction |
  SetGridAction |
  SetPrimaryPieceAction |
  SetNextPieceAction |
  SetPlayOptionsOptionAction |
  SetPlayOptionsPrimaryPieceAction |
  InitializePlayOptionsStateAction |
  SetPlayOptionsOptionStateAction |
  SetPlayOptionsOptionPossiblity
);