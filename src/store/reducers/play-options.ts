import {
  Option,
  PlayOptionsState,
  PlayOptionsActionTypes,
  SET_PLAY_OPTIONS_STATE,
  SET_PLAY_OPTIONS_OPTION,
  SET_PLAY_OPTIONS_OPTION_PRIMARY_PIECE,
  INITIALIZE_PLAY_OPTIONS_STATE
} from '../actions/play-options';
import Piece from '../../piece-enum';
import { ActivePiece } from '../../piece-types';

export interface PlayOptionsReduxState {
  state: PlayOptionsState;
  activeOptionId: number | null;
  grid: number[][] | null;
  currentPiece: ActivePiece | null;
  nextPiece: ActivePiece | null;
  options: Option[];
};

export const DefaultState: PlayOptionsReduxState = {
  state: PlayOptionsState.PLACE_PRIMARY,
  activeOptionId: null,
  grid: null,
  currentPiece: null,
  nextPiece: null,
  options: [],
};

export const playOptionsReducer = (state = DefaultState, action: PlayOptionsActionTypes) => {
  switch (action.type) {
    case SET_PLAY_OPTIONS_STATE:
      return Object.assign({}, state, { state: action.state });
    case SET_PLAY_OPTIONS_OPTION:
      return Object.assign({}, state, { activeOptionId: action.id });
    case SET_PLAY_OPTIONS_OPTION_PRIMARY_PIECE:
      const existingOptionIndex = state.options.findIndex(option => option.id === state.activeOptionId);

      if (existingOptionIndex !== -1) {
        const existingOption = state.options[existingOptionIndex];
        existingOption[action.piece] = action.grid;

        return Object.assign(
          {},
          state,
          { options: Object.assign([], state.options, { [existingOptionIndex]: existingOption }) }
        );
      }

      throw new Error('Trying to set primary piece on non-existent option');
    case INITIALIZE_PLAY_OPTIONS_STATE:
      const option: Option = {
        id: 0,
        [Piece.I]: null,
        [Piece.T]: null,
        [Piece.O]: null,
        [Piece.L]: null,
        [Piece.J]: null,
        [Piece.S]: null,
        [Piece.Z]: null,
      }
      return Object.assign({}, state, {
        grid: action.grid,
        primaryPiece: action.primaryPiece,
        nextPiece: action.nextPiece,
        options: [option]
      });
    default:
      return state;
  }
};