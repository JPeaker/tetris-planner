import React from 'react';
import _ from 'lodash';
import './style/App.css';
import Piece from './piece-enum';
import { ActivePiece } from './piece-types';
import { movePiece, getPiece } from './move-piece';
import { drawGrid } from './draw-grid';
import inputHandler from './input-handler';
import Block from './block';
import { connect } from 'react-redux';
import { RootState } from './store/reducers';
import { Dispatch } from 'redux';
import { SET_GRID, SET_PRIMARY_PIECE } from './store/actions/setup';
import { SET_APP_STATE, AppState } from './store/actions/app';

interface PlacePiecesProps {
  grid: number[][];
  setGrid: (grid: number[][]) => void;
  completeStep: (piece: ActivePiece, grid: number[][]) => void;
  activePiece: Piece | null;
};

interface ComponentState {
  currentPiece: ActivePiece | null,
};

class PlacePieces extends React.Component<PlacePiecesProps, ComponentState> {
  constructor(props: PlacePiecesProps) {
    super(props);

    this.state = {
      currentPiece: this.props.activePiece === null ? null : this.getNewPiece(this.props.activePiece),
    };

    this.keyDownHandler = this.keyDownHandler.bind(this);
    this.setPieceInPlace = this.setPieceInPlace.bind(this);
    this.getNewPiece = this.getNewPiece.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.keyDownHandler);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.keyDownHandler);
  }

  keyDownHandler(event: KeyboardEvent) {
    const currentPiece = inputHandler(
      event,
      this.state.currentPiece,
      this.props.grid,
      this.setPieceInPlace,
      this.getNewPiece,
      movePiece);

    if (currentPiece) {
      this.setState({ currentPiece });
    }
  }

  setPieceInPlace(): void {
    const { grid } = this.props;
    const { currentPiece } = this.state;

    if (currentPiece !== null) {
      const newGrid = _.cloneDeep(grid);
      currentPiece.blocks.forEach(block => {
        newGrid[block.row][block.column] = block.value;
      });

      const completeRows = newGrid.map(row => row.every(block => !!block));
      completeRows.forEach((isRowComplete, index) => {
        if (isRowComplete) {
          newGrid.splice(index, 1);
          newGrid.unshift(new Array(10).fill(0));
        }
      });

      this.props.completeStep(currentPiece, newGrid);
    }
  }

  getNewPiece(type: Piece): ActivePiece {
    return getPiece({ type, row: 2, column: 5, orientation: 0 });
  }

  render() {
    const drawnGrid: number[][] = _.cloneDeep(this.props.grid);

    if (this.state.currentPiece) {
      this.state.currentPiece.blocks.forEach(block => {
        drawnGrid[block.row][block.column] = block.value;
      });
    }

    return (
      <>
        {
          drawGrid(
            drawnGrid,
            (row: number, column: number, value: number) =>
              <Block value={value} row={row} column={column} />
          )
        }
      </>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  grid: state.setup.grid,
  activePiece: state.setup.primaryPiece,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setGrid: (grid: number[][]) => dispatch({ type: SET_GRID, grid }),
  completeStep: (piece: ActivePiece, grid: number[][]) => {
    dispatch({ type: SET_GRID, grid });
    dispatch({ type: SET_PRIMARY_PIECE, piece: null });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PlacePieces);