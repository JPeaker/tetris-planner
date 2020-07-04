import React from 'react';
import _ from 'lodash';
import '../style/App.css';
import Piece from '../piece-enum';
import { ActivePiece } from '../piece-types';
import { movePiece, getPiece } from './move-piece';
import inputHandler from '../input-handler';
import TetrisGrid from './tetris-grid';

interface PlacePiecesProps {
  grid: number[][];
  activePiece: Piece | null;
  setPiece: (grid: number[][], gridBeforeClear: number[][]) => void;
  disabled?: boolean;
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
    this.getBlockProps = this.getBlockProps.bind(this);
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
      movePiece,
      this.props.disabled);

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
      const gridAfterPlaceBeforeClear = _.cloneDeep(newGrid);

      const completeRows = newGrid.map(row => row.every(block => !!block));
      completeRows.forEach((isRowComplete, index) => {
        if (isRowComplete) {
          newGrid.splice(index, 1);
          newGrid.unshift(new Array(10).fill(0));
        }
      });

      this.props.setPiece(newGrid, gridAfterPlaceBeforeClear);
    }
  }

  getNewPiece(type: Piece): ActivePiece {
    return getPiece({ type, row: 2, column: 5, orientation: 0 });
  }

  getBlockProps() {
    return { disabled: this.props.disabled };
  }

  render() {
    const drawnGrid: number[][] = _.cloneDeep(this.props.grid);

    if (this.state.currentPiece) {
      this.state.currentPiece.blocks.forEach(block => {
        drawnGrid[block.row][block.column] = block.value;
      });
    }

    return <TetrisGrid grid={drawnGrid} getBlockProps={this.getBlockProps} />;
  }
}

export default PlacePieces;