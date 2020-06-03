import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { setNextPiece, resetScenarioExceptPrimaryPiece } from '../store/actions';
import Piece from '../piece-enum';
import PieceSelector from '../reusable/PieceSelector';

const mapStateToProps = (state: RootState) => ({
  piece: state.nextPiece,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setPiece: (piece: Piece) => {
    dispatch(resetScenarioExceptPrimaryPiece());
    dispatch(setNextPiece(piece))
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PieceSelector);
