import React from 'react';
import { Dispatch } from 'redux';
import '../style/App.css';
import { connect } from 'react-redux';
import { RootState } from '../store/reducers';
import { SetupState, SET_GRID, SET_STATE } from '../store/actions/setup';
import FillPlayfield from '../FillPlayfield';
import AddHoles from '../AddHoles';
import SelectFirstPiece from '../SelectFirstPiece';
import SelectNextPiece from '../SelectNextPiece';
import PlacePieces from '../PlacePieces';
import Piece from '../piece-enum';

interface AppProps {
  grid: number[][];
  state: SetupState;
  nextPiece: Piece | null;
  setGrid: (grid: number[][]) => void;
  setState: (state: SetupState) => void;
};

interface AppComponentState {};

function getPlayfield(
  state: SetupState,
  grid: number[][],
  setGrid: (grid: number[][]) => void
): JSX.Element {
  switch (state) {
    case SetupState.SETUP_PLAYFIELD:
      return <FillPlayfield grid={grid} setGrid={setGrid} />;
    case SetupState.ADD_HOLES:
      return <AddHoles grid={grid} setGrid={setGrid} />;
    case SetupState.SELECT_CURRENT_PIECE:
      return <SelectFirstPiece />;
    case SetupState.SELECT_NEXT_PIECE:
      return <SelectNextPiece />;
    case SetupState.SET_PIECES:
      return <PlacePieces />;
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
  grid: state.setup.grid,
  state: state.setup.state,
  nextPiece: state.setup.nextPiece,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setGrid: (grid: number[][]) => dispatch({ type: SET_GRID, grid }),
  setState: (state: SetupState) => dispatch({ type: SET_STATE, state }),
})

export default connect(mapStateToProps, mapDispatchToProps)(SetupPlayfield);
