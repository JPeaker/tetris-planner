import { combineReducers } from 'redux';
import { setupReducer } from './setup';
import { appReducer } from './app';

export const rootReducer = combineReducers({
  app: appReducer,
  setup: setupReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;