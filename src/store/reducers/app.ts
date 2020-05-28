import { AppActionTypes, SET_APP_STATE, AppState } from '../actions/app';

export interface AppReduxState {
  state: AppState;
};

export const DefaultState: AppReduxState = {
  state: AppState.SETUP,
};

export const appReducer = (state = DefaultState, action: AppActionTypes) => {
  switch (action.type) {
    case SET_APP_STATE:
      return Object.assign({}, state, { state: action.state });
    default:
      return state;
  }
};