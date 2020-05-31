import Piece from '../../piece-enum';
import { ActivePiece } from '../../piece-types';

export enum PlayOptionsState {
  PLACE_PRIMARY,
  PLACE_NEXT,
  PLACE_POSSIBILITY,
};

export const SET_PLAY_OPTIONS_STATE = 'SET_PLAY_OPTIONS_STATE';
export const SET_PLAY_OPTIONS_OPTION = 'SET_PLAY_OPTIONS_OPTION';
export const SET_PLAY_OPTIONS_OPTION_PRIMARY_PIECE = 'SET_PLAY_OPTIONS_OPTION_PRIMARY_PIECE';
export const INITIALIZE_PLAY_OPTIONS_STATE = 'INITIALIZE_PLAY_OPTIONS_STATE';

export interface Option {
  id: number;
  [Piece.I]: number[][] | null;
  [Piece.T]: number[][] | null;
  [Piece.O]: number[][] | null;
  [Piece.L]: number[][] | null;
  [Piece.J]: number[][] | null;
  [Piece.S]: number[][] | null;
  [Piece.Z]: number[][] | null;
}

export interface SetPlayOptionsStateAction {
  type: typeof SET_PLAY_OPTIONS_STATE;
  state: PlayOptionsState;
  activeOptionId: number;
  grid: number[][];
  options: Option[];
};

export interface SetPlayOptionsOptionAction {
  type: typeof SET_PLAY_OPTIONS_OPTION;
  id: number;
};

export interface SetPlayOptionsPrimaryPieceAction {
  type: typeof SET_PLAY_OPTIONS_OPTION_PRIMARY_PIECE;
  piece: Piece;
  grid: number[][];
};

export interface InitializePlayOptionsStateAction {
  type: typeof INITIALIZE_PLAY_OPTIONS_STATE;
};

export type PlayOptionsActionTypes = (
  SetPlayOptionsStateAction |
  SetPlayOptionsOptionAction |
  SetPlayOptionsPrimaryPieceAction |
  InitializePlayOptionsStateAction
);