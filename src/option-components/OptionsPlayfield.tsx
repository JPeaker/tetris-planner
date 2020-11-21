import React from 'react';
import { Dispatch } from 'redux';
import '../style/App.css';
import { connect } from 'react-redux';
import { Grid, Piece, PieceList, PlacePieces } from 'nes-tetris-representation';
import {
  setState,
  setPlayOptionsOptionState,
  setPlayOptionsOptionGridAfterFirstPiece,
  setPlayOptionsOptionGridAfterNextPiece,
  setPlayOptionsOptionGridAfterPossibility,
  setPlayOptionsOptionPossibility
} from '../store/actions';
import OptionSummarize from './OptionSummarize';
import { RootState } from '../store';
import { AppState, OptionState, Option } from '../store/types';
import inputHandler from '../input-handler';

interface AppProps {
  grid: Grid;
  state: AppState;
  activePiece: Piece | null;
  nextPiece: Piece | null;
  setPrimaryPiece: (grid: Grid, gridBeforeClear: Grid) => void;
  setNextPiece: (grid: Grid, gridBeforeClear: Grid) => void;
  option: Option | null,
  setPossibility: (piece: Piece, grid: Grid, gridBeforeClear: Grid) => void;
  advancePossibility: (option: Option) => void;
};

interface AppComponentState {};

function getPlayfield(
  grid: Grid,
  activePiece: Piece | null,
  setPiece: (grid: Grid, gridBeforeClear: Grid) => void,
  disabled?: boolean,
): JSX.Element {
  return <PlacePieces
    key={`${grid.map(row => row.map(block => `${block}`).join(',')).join(',')} ${activePiece}`}
    grid={grid}
    activePiece={activePiece}
    setPiece={setPiece}
    disabled={disabled}
    inputHandler={inputHandler}
  />;
}

class OptionsPlayfield extends React.Component<AppProps, AppComponentState> {
  render() {
    switch (this.props.state) {
      case AppState.OPTIONS_PLACE_PRIMARY_PIECE:
        return getPlayfield(this.props.grid, this.props.activePiece, this.props.setPrimaryPiece);
      case AppState.OPTIONS_PLACE_NEXT_PIECE:
        if (this.props.option === null || this.props.option.gridAfterFirstPiece === null) {
          throw new Error(`Option: ${this.props.option}, GridAfterFirstPiece: ${this.props.option?.gridAfterFirstPiece} for OPTIONS_PLACE_NEXT_PIECE`);
        }
        return getPlayfield(this.props.option.gridAfterFirstPiece, this.props.nextPiece, this.props.setNextPiece);
      case AppState.OPTIONS_PLACE_POSSIBILITY:
        if (
          this.props.option === null ||
          this.props.option.currentPossibility === null ||
          this.props.option.gridAfterNextPiece === null
        ) {
          throw new Error(`
            Option: ${this.props.option},
            CurrentPossibility: ${this.props.option?.currentPossibility},
            GridAfterFirstPiece: ${this.props.option?.gridAfterFirstPiece} for
            OPTIONS_PLACE_POSSIBILITY
          `);
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
        const setPossibility = (grid: Grid, gridBeforeClear: Grid) => {
          this.props.setPossibility(currentPossibility, grid, gridBeforeClear);
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
  setPrimaryPiece: (grid: Grid, gridBeforeClear: Grid) => {
    dispatch(setPlayOptionsOptionState(OptionState.NEXT_PIECE));
    dispatch(setPlayOptionsOptionGridAfterFirstPiece(grid, gridBeforeClear));
    dispatch(setState(AppState.OPTIONS_PLACE_NEXT_PIECE));
  },
  setNextPiece: (grid: Grid, gridBeforeClear: Grid) => {
    dispatch(setPlayOptionsOptionState(OptionState.POSSIBILITIES));
    dispatch(setPlayOptionsOptionGridAfterNextPiece(grid, gridBeforeClear));
    dispatch(setPlayOptionsOptionPossibility(Piece.I));
    dispatch(setState(AppState.OPTIONS_PLACE_POSSIBILITY));
  },
  setPossibility: (possibility: Piece, grid: Grid, gridBeforeClear: Grid) => {
    dispatch(setPlayOptionsOptionGridAfterPossibility(possibility, grid, gridBeforeClear));
  },
  advancePossibility: (option: Option) => {
    const currentPieceIndex = PieceList.findIndex(({ value }) => value === option.currentPossibility);

    if (currentPieceIndex === -1) {
      dispatch(setPlayOptionsOptionPossibility(Piece.I))
    } else if (PieceList.every(({ value }) => option[value] !== null)) {
      dispatch(setPlayOptionsOptionState(OptionState.DONE));
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
