import React from 'react';
import { Dispatch } from 'redux';
import './style/App.css';
import { ActivePiece } from './piece-types';
import { connect } from 'react-redux';
import { RootState } from './store/reducers';
import { SET_GRID, SET_STATE } from './store/actions';
import SetupPlayfield from './SetupPlayfield';
import FillHoles from './FillHoles';
import PlacePieces from './PlacePieces';

interface AppProps {
  grid: number[][];
  state: AppState;
  setGrid: (grid: number[][]) => void;
  setState: (state: AppState) => void;
};

export enum AppState {
  FILL_COLUMNS,
  ADD_HOLES,
  SET_PIECES,
};

interface AppComponentState {
  currentPiece: ActivePiece | null,
  hoverBlock: { row: number, column: number } | null,
};

class App extends React.Component<AppProps, AppComponentState> {
  render() {
    var playfield = <></>;

    switch(this.props.state) {
      case AppState.FILL_COLUMNS:
        playfield = <SetupPlayfield grid={this.props.grid} setGrid={this.props.setGrid} />;
        break;
      case AppState.ADD_HOLES:
        playfield = <FillHoles grid={this.props.grid} setGrid={this.props.setGrid} />;
        break;
      case AppState.SET_PIECES:
        playfield = <PlacePieces grid={this.props.grid} setGrid={this.props.setGrid} />
        break;
      default:
        playfield = <>hello</>;
    }


    return (
      <>
        { playfield }
        <div className="state-text">{ this.props.state }</div>
        <button onClick={() => this.props.setState(this.props.state === AppState.SET_PIECES ? AppState.FILL_COLUMNS : AppState.SET_PIECES)}>Toggle state</button>
      </>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  grid: state.app.grid,
  state: state.app.state,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setGrid: (grid: number[][]) => dispatch({ type: SET_GRID, grid }),
  setState: (state: AppState) => dispatch({ type: SET_STATE, state }),
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
