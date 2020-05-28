import { SetupActionTypes, SET_GRID, SET_STATE, SET_PRIMARY_PIECE, SET_NEXT_PIECE, SetupState } from '../actions/setup';
import Piece from '../../piece-enum';

export interface SetupReduxState {
  grid: number[][];
  primaryPiece: Piece| null;
  nextPiece: Piece | null;
  state: SetupState;
};

var grid: number[][] = [];
for (var i = 0; i < 22; i++) {
  const row: number[] = [];
  for (var j = 0; j < 10; j++) {
    row.push(0);
  }
  grid.push(row);
}

export const DefaultState: SetupReduxState = {
  grid,
  state: SetupState.SELECT_NEXT_PIECE,
  primaryPiece: null,
  nextPiece: null,
};

export const setupReducer = (state = DefaultState, action: SetupActionTypes) => {
  switch (action.type) {
    case SET_GRID:
      return Object.assign({}, state, { grid: action.grid });
    case SET_STATE:
      return Object.assign({}, state, { state: action.state });
    case SET_PRIMARY_PIECE:
      return Object.assign({}, state, { primaryPiece: action.piece });
    case SET_NEXT_PIECE:
      return Object.assign({}, state, { nextPiece: action.piece });
    default:
      return state;
  }
};