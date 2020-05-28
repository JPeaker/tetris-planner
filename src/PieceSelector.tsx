import React from 'react';
import './style/App.css';
import { getPieceGrid, drawGrid } from './draw-grid';
import Block from './block';
import Piece from './piece-enum';
import { Grid } from '@material-ui/core';

interface PieceSelectorProps {
  piece: Piece | null;
  setPiece: (piece: Piece) => void;
};

class PieceSelector extends React.Component<PieceSelectorProps> {
  drawPiece(piece: Piece, width: (6 | 12) = 6) {
    return (
      <Grid item xs={width} className="piece-selector-grid-item">
          {
            drawGrid(
              getPieceGrid(piece),
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
