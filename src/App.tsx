import React from 'react';
import './style/App.css';
import Block from './block';
import _ from 'lodash';
import Piece from './piece-types';
import movePiece from './move-piece';

interface AppProps {};

enum AppState {
  PIECE,
  TOGGLE,
};

interface ActivePiece {
  type: Piece,
  row: number,
  column: number,
  orientation: number,
};

interface AppComponentState {
  grid: number[][],
  currentPiece: ActivePiece,
  state: AppState,
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

    const currentPiece: ActivePiece = {
      type: Piece.J,
      row: 5,
      column: 5,
      orientation: 0,
    };

    grid = movePiece(currentPiece, grid);

    this.state = {
      grid,
      state: AppState.PIECE,
      currentPiece,
    };

    this.keyUpHandler = this.keyUpHandler.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keyup', this.keyUpHandler);
  }

  toggleBlock(row: number, column: number) {
    if (this.state.state === AppState.TOGGLE) {
      const grid = _.cloneDeep(this.state.grid);
      grid[row][column] = grid[row][column] ? 0 : 1;
      this.setState({ grid });
    }
  }

  keyUpHandler(event: KeyboardEvent) {
    const old = Object.assign({}, this.state.currentPiece);
    const orientationModifier = event.code === 'KeyS' ? -1 : event.code === 'KeyA' ? 1 : 0;
    const columnModifier = event.code === 'ArrowLeft' ? -1 : event.code === 'ArrowRight' ? 1 : 0;
    const rowModifier = event.code === 'ArrowUp' ? -1 : event.code === 'ArrowDown' ? 1 : 0;

    const currentPiece = Object.assign(
      {},
      this.state.currentPiece,
      {
        orientation: (this.state.currentPiece.orientation + orientationModifier + 4) % 4,
        column: Math.min(this.state.currentPiece.column + columnModifier),
        row: Math.min(this.state.currentPiece.row + rowModifier),
      }
    );
    const grid = movePiece(currentPiece, this.state.grid, old);
    this.setState({
      currentPiece,
      grid
    });
  }

  render() {
    return (
      <div className="grid">
          {
            this.state.grid.map((row, rowKey) => {
              return (
                <div key={rowKey} className="row">
                  {
                    // Hide the first two rows
                    rowKey >= 2 ?
                      row.map((block, blockKey) => (
                        <div key={rowKey * 20 + blockKey} onClick={this.toggleBlock.bind(this, rowKey, blockKey)} className="bit">
                          <Block value={block} />
                        </div>
                      )) : null
                  }
                </div>
              );
            })
          }
      </div>
    );
  }
}

export default App;
