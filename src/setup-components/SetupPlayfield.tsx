import React from 'react';
import { Dispatch } from 'redux';
import '../style/App.css';
import { connect } from 'react-redux';
import { setGrid, setState } from '../store/actions';
import FillPlayfield from './FillPlayfield';
import AddHoles from './AddHoles';
import SelectFirstPiece from './SelectFirstPiece';
import SelectNextPiece from './SelectNextPiece';
import Piece from '../piece-enum';
import { RootState } from '../store';
import { AppState } from '../store/types';

interface AppProps {
  grid: number[][];
  state: AppState;
  nextPiece: Piece | null;
  setGrid: (grid: number[][]) => void;
  setState: (state: AppState) => void;
};

interface AppComponentState {};

function getPlayfield(
  state: AppState,
  grid: number[][],
  setGrid: (grid: number[][]) => void
): JSX.Element {
  switch (state) {
    case AppState.SETUP_GRID:
      return <FillPlayfield grid={grid} setGrid={setGrid} />;
    case AppState.SETUP_ADD_HOLES:
      return <AddHoles grid={grid} setGrid={setGrid} />;
    case AppState.SETUP_CHOOSE_PRIMARY_PIECE:
      return <SelectFirstPiece />;
    case AppState.SETUP_CHOOSE_NEXT_PIECE:
      return <SelectNextPiece />;
    default:
      return <></>;
  }
}

class SetupPlayfield extends React.Component<AppProps, AppComponentState> {
  render() {
    return getPlayfield(this.props.state, this.props.grid, this.props.setGrid);
  }
}

const mapStateToProps = (state: RootState) => ({
  grid: state.grid,
  state: state.state,
  nextPiece: state.nextPiece,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setGrid: (grid: number[][]) => dispatch(setGrid(grid)),
  setState: (state: AppState) => dispatch(setState(state)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SetupPlayfield);
