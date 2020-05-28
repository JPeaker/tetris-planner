import { combineReducers } from 'redux';
import { setupReducer } from './setup';

export const rootReducer = combineReducers({ setup: setupReducer });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;