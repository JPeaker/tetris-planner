import React from 'react';
import background from './static/background.png';
import './style/App.css';
import { connect } from 'react-redux';
import { RootState } from './store';
import { AppState, OptionState } from './store/types';
import GlobalStepper from './layout-components/GlobalStepper';
import LocalStepper from './layout-components/LocalStepper';
import Playfield from './layout-components/Playfield';
import NextBox from './layout-components/NextBox';
import Piece from './piece-enum';
import { Dispatch } from 'redux';
import {
  setState,
  setPrimaryPiece,
  setNextPiece,
  initializePlayOptionsState,
  setGrid,
  setPlayOptionsOptionState,
  setPlayOptionsOptionGridAfterFirstPiece,
  setPlayOptionsOptionGridAfterNextPiece,
  setPlayOptionsOptionPossibility,
  setPlayOptionsOptionGridAfterPossibility
} from './store/actions';
import filledGrid from './reusable/filled-grid';

interface AppProps {
  grid: number[][];
  state: AppState;
  nextPiece: Piece | null;
  todoRemoveInitializeStore: () => void;
};

class App extends React.Component<AppProps> {
  componentDidMount() {
    this.props.todoRemoveInitializeStore();
  }

  render() {
    return (
      <div>
        <div className="background">
          <img src={background} alt="" />
        </div>
        <GlobalStepper />
        <LocalStepper />
        <Playfield />
        <NextBox />
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  grid: state.grid,
  state: state.state,
  nextPiece: state.nextPiece,
});

// TODO: Remove these testing
const gridAfterFirstPiece = [
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [2,0,0,0,0,0,0,0,0,0],
  [2,2,2,0,0,0,0,0,0,0],
  [3,3,1,3,3,2,2,1,1,0],
  [3,1,1,3,3,1,2,1,3,0],
  [3,1,2,2,1,1,2,2,3,0],
  [3,2,2,3,1,2,2,2,2,0],
  [3,2,3,3,3,2,3,3,3,0],
  [2,2,2,2,3,2,2,2,2,0],
  [2,2,2,3,3,3,2,3,3,0],
  [1,1,1,3,3,3,3,3,3,0],
  [1,3,3,1,1,1,3,3,3,0],
  [2,3,3,1,3,1,1,3,1,0],
  [2,2,2,3,3,3,1,1,1,0],
  [3,3,3,3,3,3,3,2,1,0],
  [2,3,1,1,3,3,3,2,2,0],
  [2,2,2,1,1,3,3,3,3,0]
];

const gridAfterNextPiece = [
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [2,0,0,0,0,1,0,0,0,0],
  [2,2,2,1,1,1,0,0,0,0],
  [3,3,1,3,3,2,2,1,1,0],
  [3,1,1,3,3,1,2,1,3,0],
  [3,1,2,2,1,1,2,2,3,0],
  [3,2,2,3,1,2,2,2,2,0],
  [3,2,3,3,3,2,3,3,3,0],
  [2,2,2,2,3,2,2,2,2,0],
  [2,2,2,3,3,3,2,3,3,0],
  [1,1,1,3,3,3,3,3,3,0],
  [1,3,3,1,1,1,3,3,3,0],
  [2,3,3,1,3,1,1,3,1,0],
  [2,2,2,3,3,3,1,1,1,0],
  [3,3,3,3,3,3,3,2,1,0],
  [2,3,1,1,3,3,3,2,2,0],
  [2,2,2,1,1,3,3,3,3,0]
];

const gridAfterI = [
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [2,0,0,0,0,1,0,0,0,0],
  [2,2,2,1,1,1,0,0,0,0],
  [3,3,1,3,3,2,2,1,1,0],
  [3,1,1,3,3,1,2,1,3,0],
  [3,1,2,2,1,1,2,2,3,0],
  [3,2,2,3,1,2,2,2,2,0],
  [3,2,3,3,3,2,3,3,3,0],
  [2,2,2,2,3,2,2,2,2,0],
  [2,2,2,3,3,3,2,3,3,0],
  [1,1,1,3,3,3,3,3,3,0],
  [1,3,3,1,1,1,3,3,3,0],
  [2,3,3,1,3,1,1,3,1,0]
];

const mapDispatchToProps = (dispatch: Dispatch) => ({
  todoRemoveInitializeStore: () => {
    const fakeGrid = filledGrid;
    for (var i = 0; i < 22; i++) {

      if (i < 8) {
        for (var j = 0; j < 10; j++) {
          fakeGrid[i][j] = 0;
        }
      }

      fakeGrid[i][9] = 0;
    }
    dispatch(setGrid(fakeGrid));
    // dispatch(setPrimaryPiece(Piece.J));
    // dispatch(setNextPiece(Piece.L));
    // dispatch(initializePlayOptionsState());
    // dispatch(setState(AppState.OPTIONS_PLACE_PRIMARY_PIECE));
    // dispatch(setPlayOptionsOptionState(OptionState.NEXT_PIECE));
    // dispatch(setPlayOptionsOptionGridAfterFirstPiece(gridAfterFirstPiece));
    // dispatch(setState(AppState.OPTIONS_PLACE_NEXT_PIECE));
    // dispatch(setPlayOptionsOptionState(OptionState.POSSIBILITIES));
    // dispatch(setPlayOptionsOptionGridAfterNextPiece(gridAfterNextPiece));
    // dispatch(setState(AppState.OPTIONS_PLACE_POSSIBILITY));
    // dispatch(setPlayOptionsOptionPossibility(Piece.I));
    // dispatch(setPlayOptionsOptionGridAfterPossibility(Piece.I, gridAfterI))
    // dispatch(setPlayOptionsOptionPossibility(Piece.O));
    // dispatch(setPlayOptionsOptionGridAfterPossibility(Piece.O, gridAfterI))
    // dispatch(setPlayOptionsOptionPossibility(Piece.T));
    // dispatch(setPlayOptionsOptionGridAfterPossibility(Piece.T, gridAfterI))
    // dispatch(setPlayOptionsOptionPossibility(Piece.J));
    // dispatch(setPlayOptionsOptionGridAfterPossibility(Piece.J, gridAfterI))
    // dispatch(setPlayOptionsOptionPossibility(Piece.L));
    // dispatch(setPlayOptionsOptionGridAfterPossibility(Piece.L, gridAfterI))
    // dispatch(setPlayOptionsOptionPossibility(Piece.S));
    // dispatch(setPlayOptionsOptionGridAfterPossibility(Piece.S, gridAfterI))
    // dispatch(setPlayOptionsOptionPossibility(Piece.Z));
    // dispatch(setPlayOptionsOptionGridAfterPossibility(Piece.Z, gridAfterI))
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
