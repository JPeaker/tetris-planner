import React from 'react';
import { Dispatch } from 'redux';
import '../style/App.css';
import { connect } from 'react-redux';
import { setGrid, setState, resetScenario, setPrimaryPiece, setNextPiece, resetScenarioExceptPrimaryPiece, initializePlayOptionsState } from '../store/actions';
import FillPlayfield from './FillPlayfield';
import AddHoles from './AddHoles';
import { Grid, Piece } from 'nes-tetris-representation/lib/piece-types';
import { RootState } from '../store';
import { AppState } from '../store/types';
import inputHandler from './setup-input-handler';
import PieceSelector from '../reusable/PieceSelector';

interface AppProps {
  grid: Grid;
  state: AppState;
  primaryPiece: Piece | null;
  nextPiece: Piece | null;
  setState: (state: AppState) => void;
  setGrid: (grid: Grid) => void;
  setPrimaryPiece: (piece: Piece) => void;
  setNextPiece: (piece: Piece) => void;
  moveToPlayOptions: () => void;
};

class SetupPlayfield extends React.Component<AppProps> {
  constructor(props: AppProps) {
    super(props);

    this.keyDownHandler = this.keyDownHandler.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.keyDownHandler);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.keyDownHandler);
  }

  keyDownHandler(event: KeyboardEvent) {
    inputHandler(
      event,
      this.props.state,
      this.props.primaryPiece,
      this.props.nextPiece,
      this.props.setState,
      this.props.moveToPlayOptions
    );
  }

  render() {
    switch (this.props.state) {
      case AppState.SETUP_GRID:
        return <FillPlayfield grid={this.props.grid} setGrid={this.props.setGrid} />;
      case AppState.SETUP_ADD_HOLES:
        return <AddHoles grid={this.props.grid} setGrid={this.props.setGrid} />;
      case AppState.SETUP_CHOOSE_PRIMARY_PIECE:
        return <PieceSelector piece={this.props.primaryPiece} setPiece={this.props.setPrimaryPiece} />;
        case AppState.SETUP_CHOOSE_NEXT_PIECE:
          return <PieceSelector piece={this.props.nextPiece} setPiece={this.props.setNextPiece} />;
      default:
        return <></>;
    }
  }
}

const mapStateToProps = (state: RootState) => ({
  grid: state.grid,
  state: state.state,
  primaryPiece: state.primaryPiece,
  nextPiece: state.nextPiece,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setState: (state: AppState) => dispatch(setState(state)),
  setGrid: (grid: Grid) => {
    dispatch(resetScenario());
    dispatch(setGrid(grid));
  },
  setPrimaryPiece: (piece: Piece) => {
    dispatch(resetScenario());
    dispatch(setPrimaryPiece(piece))
  },
  setNextPiece: (piece: Piece) => {
    dispatch(resetScenarioExceptPrimaryPiece());
    dispatch(setNextPiece(piece))
  },
  moveToPlayOptions: () => {
    dispatch(initializePlayOptionsState());
    dispatch(setState(AppState.OPTIONS_SUMMARIZE));
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(SetupPlayfield);
