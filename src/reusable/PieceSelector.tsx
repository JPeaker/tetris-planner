import React from 'react';
import '../style/App.css';
import Piece from '../piece-enum';
import { Grid } from '@material-ui/core';
import TetrisGrid from './tetris-grid';
import { getPieceGrid } from './move-piece';

interface PieceSelectorProps {
  piece: Piece | null;
  setPiece: (piece: Piece) => void;
};

class PieceSelector extends React.Component<PieceSelectorProps> {
  drawPiece(piece: Piece, width: (6 | 12) = 6) {
    return (
      <Grid item xs={width} className="piece-selector-grid-item">
        <TetrisGrid
          grid={getPieceGrid(piece)}
          blockSizeInRem={1.5}
          onClick={() => this.props.setPiece(piece)}
          className={`piece-selector-selectable-piece selectable-piece${this.props.piece === piece ? ' selected-piece' : ''}`}
          hideTopTwoRows={false}
        />
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
