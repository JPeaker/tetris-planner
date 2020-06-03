import React from 'react';
import '../style/App.css';
import { connect } from 'react-redux';
import { RootState } from '../store';
import Piece, { PieceList } from '../piece-enum';
import TetrisGrid from '../reusable/tetris-grid';
import { getPieceGrid } from '../reusable/move-piece';
import { AppState } from '../store/types';

interface NextBoxProps {
  state: AppState;
  nextPiece: Piece | null;
  nextPossibility: Piece | null;
};

class NextBox extends React.Component<NextBoxProps> {
  render() {
    var piece: Piece | null = null;
    switch(this.props.state) {
      case AppState.OPTIONS_PLACE_PRIMARY_PIECE:
        piece = this.props.nextPiece;
        break;
      case AppState.OPTIONS_PLACE_NEXT_PIECE:
        piece = Piece.I;
        break;
      case AppState.OPTIONS_PLACE_POSSIBILITY:
        piece = this.props.nextPossibility;
        break;
    }
    return (
        <div className="next-box">
          {
            piece === null
            ? null
            : <TetrisGrid grid={getPieceGrid(piece)} hideTopTwoRows={false} blockSizeInRem={1.5} />
          }
        </div>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const option = state.options.find(option => option.id === state.activeOptionId);
  const activePossibilityIndex = option && option.currentPossibility !== null
    ? PieceList.findIndex(piece => piece.value === option.currentPossibility)
    : undefined;

  return {
    state: state.state,
    nextPiece: state.nextPiece,
    nextPossibility: activePossibilityIndex !== undefined && activePossibilityIndex < PieceList.length - 1
      ? PieceList[(activePossibilityIndex + PieceList.length + 1) % PieceList.length].value
      : null,
  };
};

export default connect(mapStateToProps)(NextBox);
