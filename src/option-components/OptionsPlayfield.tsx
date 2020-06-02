import React from 'react';
import { Dispatch } from 'redux';
import '../style/App.css';
import { connect } from 'react-redux';
import {
  setState,
  setPlayOptionsOptionState,
  setPlayOptionsOptionGridAfterFirstPiece,
  setPlayOptionsOptionGridAfterNextPiece,
  setPlayOptionsOptionGridAfterPossibility,
  setPlayOptionsOptionPossibility
} from '../store/actions';
import PlacePieces from '../reusable/PlacePieces';
import OptionSummarize from './OptionSummarize';
import Piece, { PieceList } from '../piece-enum';
import { RootState } from '../store';
import { AppState, OptionState, Option } from '../store/types';

interface AppProps {
  grid: number[][];
  state: AppState;
  activePiece: Piece | null;
  nextPiece: Piece | null;
  setPrimaryPiece: (grid: number[][]) => void;
  setNextPiece: (grid: number[][]) => void;
  option: Option | null,
  setPossibility: (piece: Piece, grid: number[][]) => void;
  advancePossibility: (option: Option) => void;
};

interface AppComponentState {};

function getPlayfield(
  grid: number[][],
  activePiece: Piece | null,
  setPiece: (grid: number[][]) => void,
  disabled?: boolean,
): JSX.Element {
  return <PlacePieces
    key={`${activePiece}`}
    grid={grid}
    activePiece={activePiece}
    setPiece={setPiece}
    disabled={disabled}
  />;
}

class OptionsPlayfield extends React.Component<AppProps, AppComponentState> {
  render() {
    switch (this.props.state) {
      case AppState.OPTIONS_PLACE_PRIMARY_PIECE:
        return getPlayfield(this.props.grid, this.props.activePiece, this.props.setPrimaryPiece);
      case AppState.OPTIONS_PLACE_NEXT_PIECE:
        if (this.props.option === null || this.props.option.gridAfterFirstPiece === null) {
          return <>456</>;
        }
        return getPlayfield(this.props.option.gridAfterFirstPiece, this.props.nextPiece, this.props.setNextPiece);
      case AppState.OPTIONS_PLACE_POSSIBILITY:
        if (
          this.props.option === null ||
          this.props.option.currentPossibility === null ||
          this.props.option.gridAfterNextPiece === null
        ) {
          return <>123</>;
        }

        const possibilityGrid = this.props.option[this.props.option.currentPossibility];

        if (possibilityGrid !== null) {
          return getPlayfield(
            possibilityGrid,
            null,
            () => {},
            true,
          );
        }

        const currentPossibility = this.props.option.currentPossibility;
        const setPossibility = (grid: number[][]) => {
          this.props.setPossibility(currentPossibility, grid);
          this.props.advancePossibility(this.props.option as Option);
        }
        return getPlayfield(
          this.props.option.gridAfterNextPiece,
          currentPossibility,
          setPossibility,
          false,
        );
      case AppState.OPTIONS_SUMMARIZE:
        return <OptionSummarize />
      default:
        return <>AGH</>
    }
  }
}

const mapStateToProps = (state: RootState) => {
  if (state.activeOptionId === null) {
    return {
      grid: state.grid,
      state: state.state,
      activePiece: state.primaryPiece,
      nextPiece: state.nextPiece,
      option: null,
    };
  }

  const option = state.options[state.activeOptionId];
  return {
    grid: state.grid,
    state: state.state,
    activePiece: state.primaryPiece,
    nextPiece: state.nextPiece,
    option,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setPrimaryPiece: (grid: number[][]) => {
    dispatch(setPlayOptionsOptionState(OptionState.NEXT_PIECE));
    dispatch(setPlayOptionsOptionGridAfterFirstPiece(grid));
    dispatch(setState(AppState.OPTIONS_PLACE_NEXT_PIECE));
  },
  setNextPiece: (grid: number[][]) => {
    dispatch(setPlayOptionsOptionState(OptionState.POSSIBILITIES));
    dispatch(setPlayOptionsOptionGridAfterNextPiece(grid));
    dispatch(setPlayOptionsOptionPossibility(Piece.I));
    dispatch(setState(AppState.OPTIONS_PLACE_POSSIBILITY));
  },
  setPossibility: (possibility: Piece, grid: number[][]) => {
    dispatch(setPlayOptionsOptionGridAfterPossibility(possibility, grid));
  },
  advancePossibility: (option: Option) => {
    const currentPieceIndex = PieceList.findIndex(({ value }) => value === option.currentPossibility);

    if (currentPieceIndex === -1) {
      dispatch(setPlayOptionsOptionPossibility(Piece.I))
    } else if (PieceList.every(({ value }) => option[value] !== null)) {
      dispatch(setState(AppState.OPTIONS_SUMMARIZE));
    } else {
      for (const piece of PieceList) {
        if (option[piece.value] === null) {
          dispatch(setPlayOptionsOptionPossibility(piece.value));
          return;
        }
      }
    }
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(OptionsPlayfield);
