import React from 'react';
import '../style/App.css';
import { connect } from 'react-redux';
import { RootState } from '../store';
import Piece from '../piece-enum';
import TetrisGrid from '../reusable/tetris-grid';
import { getPieceGrid } from '../reusable/move-piece';

interface NextBoxProps {
  nextPiece: Piece | null;
};

class NextBox extends React.Component<NextBoxProps> {
  render() {
    return (
        <div className="next-box">
          {
            this.props.nextPiece === null
            ? null
            : <TetrisGrid grid={getPieceGrid(this.props.nextPiece)} />
          }
        </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  nextPiece: state.nextPiece,
});

export default connect(mapStateToProps)(NextBox);
