import React from 'react';
import background from './static/background.png';
import './style/App.css';
import { connect } from 'react-redux';
import { RootState } from './store';
import { AppState } from './store/types';
import GlobalStepper from './layout-components/GlobalStepper';
import LocalStepper from './layout-components/LocalStepper';
import Playfield from './layout-components/Playfield';
import NextBox from './layout-components/NextBox';
import Piece from './piece-enum';
import { Dispatch } from 'redux';
import { setState, setPrimaryPiece, setNextPiece, initializePlayOptionsState, setGrid } from './store/actions';
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
    dispatch(setPrimaryPiece(Piece.J));
    dispatch(setNextPiece(Piece.L));
    dispatch(initializePlayOptionsState());
    dispatch(setState(AppState.OPTIONS_PLACE_PRIMARY_PIECE));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
