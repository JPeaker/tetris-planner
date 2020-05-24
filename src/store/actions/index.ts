import { AppState } from '../../App';

export const SET_GRID = 'SET_GRID';
export const SET_STATE = 'SET_STATE';

export interface SetGridAction {
  type: typeof SET_GRID,
  grid: number[][],
};
export function setGrid(grid: number[][]): AppActionTypes {
  return {
    type: 'SET_GRID',
    grid,
  }
};

export interface SetStateAction {
  type: typeof SET_STATE,
  state: AppState
};
export function setState(state: AppState): AppActionTypes {
  return {
    type: 'SET_STATE',
    state,
  };
};

export type AppActionTypes = SetGridAction | SetStateAction;