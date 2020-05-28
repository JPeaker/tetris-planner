export enum AppState {
  SETUP,
  OPTION_1,
  OPTION_2,
  COMPARE,
};

export const SET_APP_STATE = 'SET_APP_STATE';

export interface SetAppStateAction {
  type: typeof SET_APP_STATE,
  state: AppState,
};
export function setAppState(state: AppState): AppActionTypes {
  return {
    type: SET_APP_STATE,
    state,
  }
};

export type AppActionTypes = SetAppStateAction;