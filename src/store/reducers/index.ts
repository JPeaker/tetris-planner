import { combineReducers } from 'redux';
import { AppActionTypes, SET_GRID, SET_STATE } from '../actions';
import { AppState } from '../../App';

export interface AppReduxState {
  grid: number[][];
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
  state: AppState.FILL_COLUMNS,
};

const app = (state = DefaultState, action: AppActionTypes) => {
  switch (action.type) {
    case SET_GRID:
      return Object.assign({}, state, { grid: action.grid });
    case SET_STATE:
      return Object.assign({}, state, { state: action.state });
    default:
      return state;
  }
};

export const rootReducer = combineReducers({ app });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;