import Piece from '../piece-enum';
import {
  ReduxAction,
  SET_STATE,
  SET_GRID,
  SET_PRIMARY_PIECE,
  SET_NEXT_PIECE,
  SET_PLAY_OPTIONS_OPTION,
  INITIALIZE_PLAY_OPTIONS_STATE,
  SET_PLAY_OPTIONS_OPTION_STATE,
  SET_PLAY_OPTIONS_OPTION_GRID_AFTER_FIRST_PIECE,
  SET_PLAY_OPTIONS_OPTION_GRID_AFTER_NEXT_PIECE,
  SET_PLAY_OPTIONS_OPTION_POSSIBILITY,
  SET_PLAY_OPTIONS_OPTION_GRID_AFTER_POSSIBILITY,
}
from './actions';
import { AppState, Option, OptionState } from './types';

export interface RootState {
  state: AppState,
  grid: number[][],
  primaryPiece: Piece | null,
  nextPiece: Piece | null,
  activeOptionId: number | null,
  options: Option[],
};

const grid: number[][] = [];
for (var i = 0; i < 22; i++) {
  const row: number[] = [];
  for (var j = 0; j < 10; j++) {
    row.push(0);
  }
  grid.push(row);
}

export const DefaultState: RootState = {
  state: AppState.SETUP_GRID,
  grid,
  primaryPiece: null,
  nextPiece: null,
  activeOptionId: null,
  options: [],
};

function changeOption(
  state: RootState,
  affectOption: (option: Option) => Option
): Option[] {
  const existingOptionIndex = state.options.findIndex(option => option.id === state.activeOptionId);

  if (existingOptionIndex !== -1) {
    const existingOption = state.options[existingOptionIndex];
    const x = Object.assign(
      [],
      state.options,
      { [existingOptionIndex]: affectOption(existingOption) }
    );
    return x;
  }

  throw new Error('Trying to set primary piece on non-existent option');
}

const appReducer = (state = DefaultState, action: ReduxAction) => {
  switch (action.type) {
    case SET_STATE:
      return Object.assign({}, state, { state: action.state });
    case SET_GRID:
      return Object.assign({}, state, { grid: action.grid });
    case SET_PRIMARY_PIECE:
      return Object.assign({}, state, { primaryPiece: action.piece });
    case SET_NEXT_PIECE:
      return Object.assign({}, state, { nextPiece: action.piece });
    case SET_PLAY_OPTIONS_OPTION:
      return Object.assign({}, state, { activeOptionId: action.id });
    case INITIALIZE_PLAY_OPTIONS_STATE:
      const option: Option = {
        id: 0,
        state: OptionState.UNSTARTED,
        gridAfterFirstPiece: null,
        gridAfterNextPiece: null,
        currentPossibility: null,
        [Piece.I]: null,
        [Piece.T]: null,
        [Piece.O]: null,
        [Piece.L]: null,
        [Piece.J]: null,
        [Piece.S]: null,
        [Piece.Z]: null,
      }
      return Object.assign({}, state, { options: [option], activeOptionId: 0 });
    case SET_PLAY_OPTIONS_OPTION_STATE:
      if (state.activeOptionId === null) {
        throw new Error('Cannot change option state when there is no active option');
      }
      return Object.assign(
        {},
        state,
        {
          options: changeOption(
            state,
            (option: Option) => Object.assign({}, option, { state: action.state })
          ),
        },
      );
    case SET_PLAY_OPTIONS_OPTION_GRID_AFTER_FIRST_PIECE:
      if (state.activeOptionId === null) {
        throw new Error('Cannot change option state when there is no active option');
      }
      return Object.assign(
        {},
        state,
        {
          options: changeOption(
            state,
            (option: Option) => Object.assign({}, option, {
              gridAfterFirstPiece: action.grid,
              gridAfterNextPiece: null,
              [Piece.I]: null,
              [Piece.T]: null,
              [Piece.O]: null,
              [Piece.L]: null,
              [Piece.J]: null,
              [Piece.S]: null,
              [Piece.Z]: null,
            }),
          ),
        },
      );
    case SET_PLAY_OPTIONS_OPTION_GRID_AFTER_NEXT_PIECE:
      if (state.activeOptionId === null) {
        throw new Error('Cannot change option state when there is no active option');
      }
      return Object.assign(
        {},
        state,
        {
          options: changeOption(
            state,
            (option: Option) => Object.assign({}, option, {
              gridAfterNextPiece: action.grid,
              [Piece.I]: null,
              [Piece.T]: null,
              [Piece.O]: null,
              [Piece.L]: null,
              [Piece.J]: null,
              [Piece.S]: null,
              [Piece.Z]: null,
            }),
          ),
        },
      );
    case SET_PLAY_OPTIONS_OPTION_POSSIBILITY:
      if (state.activeOptionId === null) {
        throw new Error('Cannot change option state when there is no active option');
      }
      return Object.assign(
        {},
        state,
        {
          options: changeOption(
            state,
            (option: Option) => Object.assign({}, option, { currentPossibility: action.piece }),
          ),
        },
      );
    case SET_PLAY_OPTIONS_OPTION_GRID_AFTER_POSSIBILITY:
      if (state.activeOptionId === null) {
        throw new Error('Cannot change option state when there is no active option');
      }
      return Object.assign(
        {},
        state,
        {
          options: changeOption(
            state,
            (option: Option) => Object.assign({}, option, { [action.piece]: action.grid }),
          ),
        },
      );
    default:
      return state;
  }
};

export default appReducer;