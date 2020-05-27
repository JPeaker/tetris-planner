import React from 'react';
import './style/App.css';
import { drawGrid } from './draw-grid';
import { getMap } from './move-piece';
import Block from './block';
import Piece from './piece-enum';
import { Grid } from '@material-ui/core';

interface PieceSelectorProps {
  piece: Piece | null;
  setPiece: (piece: Piece) => void;
};

class PieceSelector extends React.Component<PieceSelectorProps> {
  getPiece(piece: Piece) {
    const pieceGrid = getMap[piece](0, 0, 0);
    const rows = pieceGrid.blocks.map(block => block.row);
    const columns = pieceGrid.blocks.map(block => block.column);

    const minRow = Math.min(...rows);
    const maxRow = Math.max(...rows);
    const minColumn = Math.min(...columns);
    const maxColumn = Math.max(...columns);
    const grid: number[][] = [];

    for (var i = 0; i <= maxRow - minRow; i++) {
      const row: number[] = [];
      for (var j = 0; j <= maxColumn - minColumn; j++) {
        row.push(0);
      }
      grid.push(row);
    }

    pieceGrid.blocks.forEach(block => {
      if (block.value) {
        grid[block.row - minRow][block.column - minColumn] = block.value;
      }
    });

    return grid;
  }

  drawPiece(piece: Piece, width: (6 | 12) = 6) {
    return (
      <Grid item xs={width} className="piece-selector-grid-item">
          {
            drawGrid(
              this.getPiece(piece),
              (row, column, value) => <Block row={row} column={column} value={value} />,
              undefined,
              () => this.props.setPiece(piece),
              `selectable-piece ${this.props.piece === piece ? 'selected-piece' : ''}`,
              false,
            )
          }
      </Grid>
    );
  }

  render() {
    return (
      <Grid container direction="row" justify="space-around" alignItems="center">
        { this.drawPiece(Piece.L) }
        { this.drawPiece(Piece.J) }
        { this.drawPiece(Piece.Z) }
        { this.drawPiece(Piece.S) }
        { this.drawPiece(Piece.O) }
        { this.drawPiece(Piece.T) }
        { this.drawPiece(Piece.I, 12) }
      </Grid>
    );
  }
}

export default PieceSelector;
