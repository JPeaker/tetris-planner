import React from 'react';
import _ from 'lodash';
import './style/App.css';
import Piece from './piece-enum';
import { ActivePiece } from './piece-types';
import { movePiece, getPiece } from './move-piece';
import { drawGrid } from './draw-grid';
import inputHandler from './input-handler';
import filledGrid from './filled-grid';

interface AppProps {};

export enum AppState {
  PLACE,
  PIECE,
};

interface AppComponentState {
  grid: number[][],
  currentPiece: ActivePiece | null,
  state: AppState,
  hoverBlock: { row: number, column: number } | null,
};

class App extends React.Component<AppProps, AppComponentState> {
  constructor(props: AppProps) {
    super(props);

    var grid: number[][] = [];
    for (var i = 0; i < 22; i++) {
      const row: number[] = [];
      for (var j = 0; j < 10; j++) {
        row.push(0);
      }
      grid.push(row);
    }

    this.state = {
      grid,
      state: AppState.PLACE,
      currentPiece: null,
      hoverBlock: null
    };

    this.keyDownHandler = this.keyDownHandler.bind(this);
    this.setPieceInPlace = this.setPieceInPlace.bind(this);
    this.getNewPiece = this.getNewPiece.bind(this);
    this.setHoverBlock = this.setHoverBlock.bind(this);
    this.clickBlock = this.clickBlock.bind(this);
    this.toggleAppState = this.toggleAppState.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.keyDownHandler);
  }

  keyDownHandler(event: KeyboardEvent) {
    const currentPiece = inputHandler(
      event,
      this.state.currentPiece,
      this.state.grid,
      this.setPieceInPlace,
      this.getNewPiece,
      movePiece,
      this.toggleAppState);

    if (currentPiece) {
      this.setState({ currentPiece });
    }
  }

  toggleAppState(): void {
    this.setState({ state: this.state.state === AppState.PIECE ? AppState.PLACE : AppState.PIECE });
  }

  setPieceInPlace(): void {
    const { grid, currentPiece } = this.state;

    if (currentPiece) {
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

      this.setState({ currentPiece: null, grid: newGrid });
    } else {
      throw new Error('setPieceInPlace called with null currentPiece');
    }
  }

  getNewPiece(type: Piece): ActivePiece {
    return getPiece({ type, row: 2, column: 5, orientation: 0 });
  }

  setHoverBlock(row: number, column: number): void {
    this.setState({ hoverBlock: { row, column } });
  }

  clickBlock(row: number, column: number): void {
    const grid = _.cloneDeep(this.state.grid);

    for (var i = 0; i < 22; i++) {
      if (i > row) {
        grid[i][column] = filledGrid[i][column];
      } else {
        grid[i][column] = 0;
      }
    }

    this.setState({ grid, hoverBlock: null });
  }

  render() {
    return (
      <>
        <div>
          {
            drawGrid(
              this.state.state,
              this.state.currentPiece,
              this.state.grid,
              this.state.hoverBlock,
              this.setHoverBlock,
              this.clickBlock
            )
          }
        </div>
        <div className="state-text">{ this.state.state === AppState.PIECE ? 'Piece' : 'Place' }</div>
      </>
    );
  }
}

export default App;
