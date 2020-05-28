import Piece from '../../piece-enum';
import { SetupState } from '../reducers/setup';

export const SET_GRID = 'SET_GRID';
export const SET_STATE = 'SET_STATE';
export const SET_PRIMARY_PIECE = 'SET_PRIMARY_PIECE';
export const SET_NEXT_PIECE = 'SET_NEXT_PIECE';

export interface SetGridAction {
  type: typeof SET_GRID,
  grid: number[][],
};
export function setGrid(grid: number[][]): SetupActionTypes {
  return {
    type: 'SET_GRID',
    grid,
  }
};

export interface SetStateAction {
  type: typeof SET_STATE,
  state: SetupState
};
export function setState(state: SetupState): SetupActionTypes {
  return {
    type: 'SET_STATE',
    state,
  };
};

export interface SetPrimaryPieceAction {
  type: typeof SET_PRIMARY_PIECE,
  piece: Piece,
};
export function setPrimaryPiece(piece: Piece): SetupActionTypes {
  return {
    type: 'SET_PRIMARY_PIECE',
    piece,
  };
};

export interface SetNextPieceAction {
  type: typeof SET_NEXT_PIECE,
  piece: Piece,
};
export function setNextPiece(piece: Piece): SetupActionTypes {
  return {
    type: 'SET_NEXT_PIECE',
    piece,
  };
};
export type SetupActionTypes = SetGridAction | SetStateAction | SetPrimaryPieceAction | SetNextPieceAction;