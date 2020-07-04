import Piece, { PieceList } from '../piece-enum';
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
  ADD_PLAY_OPTIONS_OPTION,
  ADD_COMPARISON,
  SET_COMPARISON_ACTIVE_PIECE,
  SET_ACTIVE_COMPARISON,
  SET_COMPARISON_PIECE_CHOICE,
  ADVANCE_COMPARISON_ACTIVE_PIECE,
  RESET_SCENARIO,
  RESET_SCENARIO_EXCEPT_PRIMARY_PIECE,
  CLEAR_COMPARISON,
}
from './actions';
import { AppState, Option, OptionState, Comparison } from './types';

export interface RootState {
  state: AppState,
  grid: number[][],
  primaryPiece: Piece | null,
  nextPiece: Piece | null,
  activeOptionId: number | null,
  options: Option[],
  activeComparisonId: number | null,
  comparisons: Comparison[],
};

var grid: number[][] = [];
for (var i = 0; i < 22; i++) {
  const row: number[] = [];
  for (var j = 0; j < 10; j++) {
    row.push(0);
  }
  grid.push(row);
}

// export const DefaultState: RootState = {
//   state: AppState.SETUP_GRID,
//   grid,
//   primaryPiece: null,
//   nextPiece: null,
//   activeOptionId: null,
//   options: [],
//   activeComparisonId: null,
//   comparisons: [],
// };

grid = [
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [3,0,0,0,0,0,0,0,0,0],
  [3,1,0,0,0,0,0,0,0,0],
  [3,2,2,3,1,0,0,0,0,0],
  [3,2,3,3,3,2,3,0,0,0],
  [2,2,2,2,3,2,2,2,0,0],
  [2,2,2,3,3,3,2,3,0,0],
  [1,1,1,3,3,3,3,3,0,0],
  [1,3,3,1,1,1,3,3,0,0],
  [2,3,3,1,3,1,1,3,0,0],
  [2,2,2,3,3,3,1,1,0,0],
  [3,3,3,3,3,3,3,2,0,0],
  [2,3,1,1,3,3,3,2,0,0],
  [2,2,2,1,1,3,3,3,0,0]
];

const option = {'0':[[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[3,0,0,0,0,0,0,0,0,0],[3,1,0,0,0,0,0,0,0,0],[3,2,2,3,1,0,0,0,0,0],[3,2,3,3,3,2,3,0,0,0],[2,2,2,2,3,2,2,2,0,0],[2,2,2,3,3,3,2,3,0,0],[1,1,1,3,3,3,3,3,0,0],[1,3,3,1,1,1,3,3,3,3],[2,3,3,1,3,1,1,3,3,3],[2,2,2,3,3,3,1,1,3,3],[3,3,3,3,3,3,3,2,3,3]],'1':[[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[3,0,0,0,0,0,0,0,0,0],[3,1,0,0,0,0,0,0,0,0],[3,2,2,3,1,0,0,0,0,0],[3,2,3,3,3,2,3,0,0,0],[2,2,2,2,3,2,2,2,0,0],[2,2,2,3,3,3,2,3,3,3],[1,1,1,3,3,3,3,3,3,3],[1,3,3,1,1,1,3,3,3,0],[2,3,3,1,3,1,1,3,3,0],[2,2,2,3,3,3,1,1,3,0],[3,3,3,3,3,3,3,2,3,0]],'2':[[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[3,0,0,0,0,0,0,0,0,0],[3,1,0,0,0,0,0,0,0,0],[3,2,2,3,1,0,0,0,0,0],[3,2,3,3,3,2,3,0,0,0],[2,2,2,2,3,2,2,2,3,0],[2,2,2,3,3,3,2,3,3,3],[1,1,1,3,3,3,3,3,3,0],[1,3,3,1,1,1,3,3,3,0],[2,3,3,1,3,1,1,3,3,0],[2,2,2,3,3,3,1,1,3,0],[3,3,3,3,3,3,3,2,3,0]],'3':[[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[3,0,0,0,0,0,0,0,0,0],[3,1,0,0,0,0,0,0,0,0],[3,2,2,3,1,0,0,0,0,0],[3,2,3,3,3,2,3,0,0,0],[2,2,2,2,3,2,2,2,2,2],[2,2,2,3,3,3,2,3,2,0],[1,1,1,3,3,3,3,3,2,0],[1,3,3,1,1,1,3,3,3,0],[2,3,3,1,3,1,1,3,3,0],[2,2,2,3,3,3,1,1,3,0],[3,3,3,3,3,3,3,2,3,0]],'4':[[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[3,0,0,0,0,0,0,0,0,0],[3,1,0,0,0,0,0,0,0,0],[3,2,2,3,1,0,0,0,0,0],[3,2,3,3,3,2,3,0,0,0],[2,2,2,2,3,2,2,2,1,0],[2,2,2,3,3,3,2,3,1,0],[1,1,1,3,3,3,3,3,1,1],[1,3,3,1,1,1,3,3,3,0],[2,3,3,1,3,1,1,3,3,0],[2,2,2,3,3,3,1,1,3,0],[3,3,3,3,3,3,3,2,3,0]],'5':[[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[3,0,0,0,0,0,0,0,0,0],[3,1,0,0,0,0,0,0,0,0],[3,2,2,3,1,0,0,0,0,0],[3,2,3,3,3,2,3,0,0,0],[2,2,2,2,3,2,2,2,0,0],[2,2,2,3,3,3,2,3,2,0],[1,1,1,3,3,3,3,3,2,2],[1,3,3,1,1,1,3,3,3,2],[2,3,3,1,3,1,1,3,3,0],[2,2,2,3,3,3,1,1,3,0],[3,3,3,3,3,3,3,2,3,0]],'6':[[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[3,0,0,0,0,0,0,0,0,0],[3,1,0,0,1,1,0,0,0,0],[3,2,2,3,1,1,1,0,0,0],[3,2,3,3,3,2,3,0,0,0],[2,2,2,2,3,2,2,2,0,0],[2,2,2,3,3,3,2,3,0,0],[1,1,1,3,3,3,3,3,0,0],[1,3,3,1,1,1,3,3,3,0],[2,3,3,1,3,1,1,3,3,0],[2,2,2,3,3,3,1,1,3,0],[3,3,3,3,3,3,3,2,3,0]],id:0,state:4,gridAfterFirstPiece:[[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[3,0,0,0,0,0,0,0,0,0],[3,1,0,0,0,0,0,0,0,0],[3,2,2,3,1,0,0,0,0,0],[3,2,3,3,3,2,3,0,0,0],[2,2,2,2,3,2,2,2,0,0],[2,2,2,3,3,3,2,3,0,0],[1,1,1,3,3,3,3,3,0,0],[1,3,3,1,1,1,3,3,0,0],[2,3,3,1,3,1,1,3,0,0],[2,2,2,3,3,3,1,1,0,0],[3,3,3,3,3,3,3,2,0,0]],gridAfterNextPiece:[[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[3,0,0,0,0,0,0,0,0,0],[3,1,0,0,0,0,0,0,0,0],[3,2,2,3,1,0,0,0,0,0],[3,2,3,3,3,2,3,0,0,0],[2,2,2,2,3,2,2,2,0,0],[2,2,2,3,3,3,2,3,0,0],[1,1,1,3,3,3,3,3,0,0],[1,3,3,1,1,1,3,3,3,0],[2,3,3,1,3,1,1,3,3,0],[2,2,2,3,3,3,1,1,3,0],[3,3,3,3,3,3,3,2,3,0]],gridAfterFirstPieceBeforeClear:[[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[3,0,0,0,0,0,0,0,0,0],[3,1,0,0,0,0,0,0,0,0],[3,2,2,3,1,0,0,0,0,0],[3,2,3,3,3,2,3,0,0,0],[2,2,2,2,3,2,2,2,0,0],[2,2,2,3,3,3,2,3,0,0],[1,1,1,3,3,3,3,3,0,0],[1,3,3,1,1,1,3,3,0,0],[2,3,3,1,3,1,1,3,0,0],[2,2,2,3,3,3,1,1,0,0],[3,3,3,3,3,3,3,2,0,0],[2,3,1,1,3,3,3,2,3,3],[2,2,2,1,1,3,3,3,3,3]],gridAfterNextPieceBeforeClear:[[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[3,0,0,0,0,0,0,0,0,0],[3,1,0,0,0,0,0,0,0,0],[3,2,2,3,1,0,0,0,0,0],[3,2,3,3,3,2,3,0,0,0],[2,2,2,2,3,2,2,2,0,0],[2,2,2,3,3,3,2,3,0,0],[1,1,1,3,3,3,3,3,0,0],[1,3,3,1,1,1,3,3,3,0],[2,3,3,1,3,1,1,3,3,0],[2,2,2,3,3,3,1,1,3,0],[3,3,3,3,3,3,3,2,3,0]],currentPossibility:6};
const option2 = {'0':[[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[3,0,3,3,0,0,0,0,0,0],[3,1,3,3,0,0,0,0,0,0],[3,2,2,3,1,0,0,0,0,0],[3,2,3,3,3,2,3,0,0,0],[2,2,2,2,3,2,2,2,0,0],[2,2,2,3,3,3,2,3,0,0],[1,1,1,3,3,3,3,3,0,0],[1,3,3,1,1,1,3,3,0,0],[2,3,3,1,3,1,1,3,0,0],[2,2,2,3,3,3,1,1,3,3],[3,3,3,3,3,3,3,2,3,3],[2,3,1,1,3,3,3,2,3,3],[2,2,2,1,1,3,3,3,3,3]],'1':[[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[3,0,3,3,0,0,0,0,0,0],[3,1,3,3,0,0,0,0,0,0],[3,2,2,3,1,0,0,0,0,0],[3,2,3,3,3,2,3,0,0,0],[2,2,2,2,3,2,2,2,0,0],[2,2,2,3,3,3,2,3,0,0],[1,1,1,3,3,3,3,3,0,0],[1,3,3,1,1,1,3,3,3,3],[2,3,3,1,3,1,1,3,3,3],[2,2,2,3,3,3,1,1,3,0],[3,3,3,3,3,3,3,2,3,0],[2,3,1,1,3,3,3,2,3,0],[2,2,2,1,1,3,3,3,3,0]],'2':[[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[3,0,3,3,0,0,0,0,0,0],[3,1,3,3,0,0,0,0,0,0],[3,2,2,3,1,0,0,0,0,0],[3,2,3,3,3,2,3,0,0,0],[2,2,2,2,3,2,2,2,0,0],[2,2,2,3,3,3,2,3,0,0],[1,1,1,3,3,3,3,3,0,0],[1,3,3,1,1,1,3,3,0,3],[2,3,3,1,3,1,1,3,3,3],[2,2,2,3,3,3,1,1,3,3],[3,3,3,3,3,3,3,2,3,0],[2,3,1,1,3,3,3,2,3,0],[2,2,2,1,1,3,3,3,3,0]],'3':[[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[3,0,3,3,0,0,0,0,0,0],[3,1,3,3,0,0,0,0,0,0],[3,2,2,3,1,0,0,0,0,0],[3,2,3,3,3,2,3,0,0,0],[2,2,2,2,3,2,2,2,0,0],[2,2,2,3,3,3,2,3,0,0],[1,1,1,3,3,3,3,3,0,2],[1,3,3,1,1,1,3,3,0,2],[2,3,3,1,3,1,1,3,2,2],[2,2,2,3,3,3,1,1,3,0],[3,3,3,3,3,3,3,2,3,0],[2,3,1,1,3,3,3,2,3,0],[2,2,2,1,1,3,3,3,3,0]],'4':[[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[3,0,3,3,0,0,0,0,0,0],[3,1,3,3,0,0,0,0,0,0],[3,2,2,3,1,0,0,0,0,0],[3,2,3,3,3,2,3,0,0,0],[2,2,2,2,3,2,2,2,0,0],[2,2,2,3,3,3,2,3,0,0],[1,1,1,3,3,3,3,3,0,0],[1,3,3,1,1,1,3,3,0,0],[2,3,3,1,3,1,1,3,1,1],[2,2,2,3,3,3,1,1,3,1],[3,3,3,3,3,3,3,2,3,1],[2,3,1,1,3,3,3,2,3,0],[2,2,2,1,1,3,3,3,3,0]],'5':[[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[3,0,3,3,0,0,0,0,0,0],[3,1,3,3,0,0,0,0,0,0],[3,2,2,3,1,0,0,0,0,0],[3,2,3,3,3,2,3,0,0,0],[2,2,2,2,3,2,2,2,0,0],[2,2,2,3,3,3,2,3,0,0],[1,1,1,3,3,3,3,3,0,0],[1,3,3,1,1,1,3,3,2,0],[2,3,3,1,3,1,1,3,2,2],[2,2,2,3,3,3,1,1,3,2],[3,3,3,3,3,3,3,2,3,0],[2,3,1,1,3,3,3,2,3,0],[2,2,2,1,1,3,3,3,3,0]],'6':[[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[3,0,3,3,0,0,0,0,0,0],[3,1,3,3,1,1,0,0,0,0],[3,2,2,3,1,1,1,0,0,0],[3,2,3,3,3,2,3,0,0,0],[2,2,2,2,3,2,2,2,0,0],[2,2,2,3,3,3,2,3,0,0],[1,1,1,3,3,3,3,3,0,0],[1,3,3,1,1,1,3,3,0,0],[2,3,3,1,3,1,1,3,0,0],[2,2,2,3,3,3,1,1,3,0],[3,3,3,3,3,3,3,2,3,0],[2,3,1,1,3,3,3,2,3,0],[2,2,2,1,1,3,3,3,3,0]],id:1,state:4,gridAfterFirstPiece:[[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[3,0,3,3,0,0,0,0,0,0],[3,1,3,3,0,0,0,0,0,0],[3,2,2,3,1,0,0,0,0,0],[3,2,3,3,3,2,3,0,0,0],[2,2,2,2,3,2,2,2,0,0],[2,2,2,3,3,3,2,3,0,0],[1,1,1,3,3,3,3,3,0,0],[1,3,3,1,1,1,3,3,0,0],[2,3,3,1,3,1,1,3,0,0],[2,2,2,3,3,3,1,1,0,0],[3,3,3,3,3,3,3,2,0,0],[2,3,1,1,3,3,3,2,0,0],[2,2,2,1,1,3,3,3,0,0]],gridAfterNextPiece:[[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[3,0,3,3,0,0,0,0,0,0],[3,1,3,3,0,0,0,0,0,0],[3,2,2,3,1,0,0,0,0,0],[3,2,3,3,3,2,3,0,0,0],[2,2,2,2,3,2,2,2,0,0],[2,2,2,3,3,3,2,3,0,0],[1,1,1,3,3,3,3,3,0,0],[1,3,3,1,1,1,3,3,0,0],[2,3,3,1,3,1,1,3,0,0],[2,2,2,3,3,3,1,1,3,0],[3,3,3,3,3,3,3,2,3,0],[2,3,1,1,3,3,3,2,3,0],[2,2,2,1,1,3,3,3,3,0]],gridAfterFirstPieceBeforeClear:[[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[3,0,3,3,0,0,0,0,0,0],[3,1,3,3,0,0,0,0,0,0],[3,2,2,3,1,0,0,0,0,0],[3,2,3,3,3,2,3,0,0,0],[2,2,2,2,3,2,2,2,0,0],[2,2,2,3,3,3,2,3,0,0],[1,1,1,3,3,3,3,3,0,0],[1,3,3,1,1,1,3,3,0,0],[2,3,3,1,3,1,1,3,0,0],[2,2,2,3,3,3,1,1,0,0],[3,3,3,3,3,3,3,2,0,0],[2,3,1,1,3,3,3,2,0,0],[2,2,2,1,1,3,3,3,0,0]],gridAfterNextPieceBeforeClear:[[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[3,0,3,3,0,0,0,0,0,0],[3,1,3,3,0,0,0,0,0,0],[3,2,2,3,1,0,0,0,0,0],[3,2,3,3,3,2,3,0,0,0],[2,2,2,2,3,2,2,2,0,0],[2,2,2,3,3,3,2,3,0,0],[1,1,1,3,3,3,3,3,0,0],[1,3,3,1,1,1,3,3,0,0],[2,3,3,1,3,1,1,3,0,0],[2,2,2,3,3,3,1,1,3,0],[3,3,3,3,3,3,3,2,3,0],[2,3,1,1,3,3,3,2,3,0],[2,2,2,1,1,3,3,3,3,0]],currentPossibility:6};
const comparison: Comparison = {
  id: 1,
  firstOption: option,
  secondOption: option2,
  0: null,
  1: null,
  2: null,
  3: null,
  4: null,
  5: null,
  6: null,
  activePiece: 0,
}
export const DefaultState: RootState = {
  state: AppState.COMPARE_ACTIVE,
  grid,
  primaryPiece: 1,
  nextPiece: 0,
  activeOptionId: 0,
  options: [option, option2],
  activeComparisonId: 1,
  comparisons: [comparison],
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

const getNewOption = (id: number): Option => ({
  id,
  state: OptionState.UNSTARTED,
  gridAfterFirstPiece: null,
  gridAfterNextPiece: null,
  gridAfterFirstPieceBeforeClear: null,
  gridAfterNextPieceBeforeClear: null,
  currentPossibility: null,
  [Piece.I]: null,
  [Piece.T]: null,
  [Piece.O]: null,
  [Piece.L]: null,
  [Piece.J]: null,
  [Piece.S]: null,
  [Piece.Z]: null,
});

const getNewComparison = (id: number, firstOption: Option, secondOption: Option): Comparison => ({
  id,
  firstOption,
  secondOption,
  activePiece: null,
  [Piece.I]: null,
  [Piece.T]: null,
  [Piece.O]: null,
  [Piece.L]: null,
  [Piece.J]: null,
  [Piece.S]: null,
  [Piece.Z]: null,
});

const appReducer = (state = DefaultState, action: ReduxAction) => {
  switch (action.type) {
    case RESET_SCENARIO:
      return Object.assign({}, state, {
        primaryPiece: null,
        nextPiece: null,
        activeOptionId: null,
        options: [],
        activeComparisonId: null,
        comparisons: [],
      });
    case RESET_SCENARIO_EXCEPT_PRIMARY_PIECE:
      return Object.assign({}, state, {
        nextPiece: null,
        activeOptionId: null,
        options: [],
        activeComparisonId: null,
        comparisons: [],
      });
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
      return Object.assign({}, state, { options: [getNewOption(0)], activeOptionId: 0 });
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
              gridAfterFirstPieceBeforeClear: action.gridBeforeClear,
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
              gridAfterNextPieceBeforeClear: action.gridBeforeClear,
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
            (option: Option) => Object.assign({}, option, { [action.piece]: action.gridBeforeClear }),
          ),
        },
      );
    case ADD_PLAY_OPTIONS_OPTION:
      const newId = Math.max(...state.options.map(o => o.id)) + 1;
      return Object.assign(
        {},
        state,
        {
          options: [...state.options, getNewOption(newId)],
          activeOptionId: newId,
        },
      );
    case ADD_COMPARISON:
      const firstOption = state.options.find(option => option.id === action.firstOption);
      const secondOption = state.options.find(option => option.id === action.secondOption);
      const newComparisonId = Math.max(0, ...state.comparisons.map(comparison => comparison.id)) + 1;

      if (firstOption === undefined || secondOption === undefined) {
        return state;
      }

      return Object.assign(
        {},
        state,
        {
          activeComparisonId: newComparisonId,
          comparisons: [...state.comparisons, getNewComparison(newComparisonId, firstOption, secondOption)]
        }
      )
    case SET_COMPARISON_ACTIVE_PIECE:
      const comparison = state.comparisons.find(comparison => comparison.id === state.activeComparisonId);
      if (comparison === undefined) {
        return state;
      }
      return Object.assign(
        {},
        state,
        {
          comparisons: [
            Object.assign({}, comparison, { activePiece: action.piece }),
            ...state.comparisons.filter(c => c.id !== comparison.id)
          ],
        }
      )
    case ADVANCE_COMPARISON_ACTIVE_PIECE:
      const advanceComparison = state.comparisons.find(comparison => comparison.id === state.activeComparisonId);
      if (advanceComparison === undefined) {
        return state;
      }

      if (advanceComparison.activePiece === Piece.Z) {
        return Object.assign({}, state, { state: AppState.COMPARE_COMPLETE });
      }

      const activePiece = advanceComparison.activePiece === null
        ? Piece.I as Piece
        : PieceList[(PieceList.findIndex(p => p.value === advanceComparison.activePiece) + PieceList.length + 1) % PieceList.length].value;

      return Object.assign(
        {},
        state,
        {
          comparisons: [
            Object.assign({}, advanceComparison, { activePiece }),
            ...state.comparisons.filter(c => c.id !== advanceComparison.id)
          ],
        }
      )
    case SET_ACTIVE_COMPARISON:
      return Object.assign({}, state, { activeComparisonId: action.id });
    case SET_COMPARISON_PIECE_CHOICE:
      const thisComparison = state.comparisons.find(comparison => comparison.id === state.activeComparisonId);
      if (thisComparison === undefined || thisComparison.activePiece === null) {
        return state;
      }
      return Object.assign(
        {},
        state,
        {
          comparisons: [
            Object.assign({}, thisComparison, { [thisComparison.activePiece]: action.id }),
            ...state.comparisons.filter(c => c.id !== thisComparison.id)
          ],
        }
      )
    case CLEAR_COMPARISON:
      const clearComparison = state.comparisons.find(comparison => comparison.id === action.id);
      if (clearComparison === undefined) {
        return state;
      }

      return Object.assign(
        {},
        state,
        {
          comparisons: [
            Object.assign({}, clearComparison, {
              activePiece:  null,
              [Piece.I]: null,
              [Piece.T]: null,
              [Piece.O]: null,
              [Piece.L]: null,
              [Piece.J]: null,
              [Piece.S]: null,
              [Piece.Z]: null,
            }),
            ...state.comparisons.filter(c => c.id !== clearComparison.id)
          ],
        }
      )
    default:
      return state;
  }
};

export default appReducer;