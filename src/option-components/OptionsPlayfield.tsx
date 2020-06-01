import React from 'react';
import { Dispatch } from 'redux';
import '../style/App.css';
import { connect } from 'react-redux';
import { setGrid } from '../store/actions';
import PlacePieces from '../reusable/PlacePieces';
import Piece from '../piece-enum';
import { RootState } from '../store';
import { AppState } from '../store/types';

interface AppProps {
  grid: number[][];
  state: AppState;
  activePiece: Piece | null;
  setPiece: (grid: number[][]) => void;
};

interface AppComponentState {};

function getPlayfield(
  state: AppState,
  grid: number[][],
  activePiece: Piece | null,
  setPiece: (grid: number[][]) => void
): JSX.Element {
  switch (state) {
    case AppState.OPTIONS_PLACE_PRIMARY_PIECE:
      if (activePiece === null) {
        return <>Wait how, the primary piece is null but you are setting it</>;
      }

      return <PlacePieces grid={grid} activePiece={activePiece} setPiece={setPiece} />;
    default:
      return <></>;
  }
}

class OptionsPlayfield extends React.Component<AppProps, AppComponentState> {
  render() {
    return getPlayfield(this.props.state, this.props.grid, this.props.activePiece, this.props.setPiece);
  }
}

const mapStateToProps = (state: RootState) => ({
  grid: state.grid,
  state: state.state,
  activePiece: state.primaryPiece,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setPiece: (grid: number[][]) => dispatch(setGrid(grid)),
})

export default connect(mapStateToProps, mapDispatchToProps)(OptionsPlayfield);
