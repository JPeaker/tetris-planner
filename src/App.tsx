import React from 'react';
import { Dispatch } from 'redux';
import './style/App.css';
import { connect } from 'react-redux';
import { RootState } from './store/reducers';
import { SET_GRID, SET_STATE } from './store/actions';
import SetupPlayfield from './SetupPlayfield';
import AddHoles from './AddHoles';
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

interface AppComponentState {};

class App extends React.Component<AppProps, AppComponentState> {
  render() {
    var playfield = <></>;

    switch(this.props.state) {
      case AppState.FILL_COLUMNS:
        playfield = <SetupPlayfield grid={this.props.grid} setGrid={this.props.setGrid} />;
        break;
      case AppState.ADD_HOLES:
        playfield = <AddHoles grid={this.props.grid} setGrid={this.props.setGrid} />;
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
        <button onClick={() => this.props.setState((this.props.state + 1) % (Object.keys(AppState).length / 2))}>Next state</button>
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
