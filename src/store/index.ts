import { ActivePiece } from '../piece-types';
import { Option } from './actions/play-options';

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
};

export interface AppReduxState {
  state: AppState,
  grid: number[][],
  primaryPiece: ActivePiece | null,
  nextPiece: ActivePiece | null,
  activeOptionId: number | null,
  options: Option[],
};

export const DefaultState: AppReduxState = {
  state: AppState.SETUP_GRID,
  grid: [],
  primaryPiece: null,
  nextPiece: null,
  activeOptionId: null,
  options: [],
};

export const appReducer = (state = DefaultState, action: any) => {
  switch (action.type) {
    default:
      return state;
  }
};