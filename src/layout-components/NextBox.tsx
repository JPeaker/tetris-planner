import React from 'react';
import '../style/App.css';
import { connect } from 'react-redux';
import Block from '../reusable/block';
import { getPieceGrid, drawGrid } from '../reusable/draw-grid';
import { RootState } from '../store';
import Piece from '../piece-enum';

interface NextBoxProps {
  nextPiece: Piece | null;
};

class NextBox extends React.Component<NextBoxProps> {
  render() {
    return (
        <div className="next-box">
          {/* {
            this.props.nextPiece !== null ? drawGrid(
              getPieceGrid(this.props.nextPiece),
              (row, column, value) => <Block row={row} column={column} value={value} />,
              undefined,
              undefined,
              undefined,
              false
            ) : null
          } */}
        </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  nextPiece: state.nextPiece,
});

export default connect(mapStateToProps)(NextBox);
