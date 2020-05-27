import { combineReducers } from 'redux';
import { AppActionTypes, SET_GRID, SET_STATE, SET_PRIMARY_PIECE, SET_NEXT_PIECE } from '../actions';
import { AppState } from '../../App';
import Piece from '../../piece-enum';

export interface AppReduxState {
  grid: number[][];
  primaryPiece: Piece| null;
  nextPiece: Piece | null;
  state: AppState;
};

var grid: number[][] = [];
for (var i = 0; i < 22; i++) {
  const row: number[] = [];
  for (var j = 0; j < 10; j++) {
    row.push(0);
  }
  grid.push(row);
}

export const DefaultState: AppReduxState = {
  grid,
  state: AppState.SELECT_CURRENT_PIECE,
  primaryPiece: null,
  nextPiece: null,
};

const app = (state = DefaultState, action: AppActionTypes) => {
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

export const rootReducer = combineReducers({ app });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;