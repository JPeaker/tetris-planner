import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { setPrimaryPiece, resetScenario } from '../store/actions';
import Piece from '../piece-enum';
import PieceSelector from '../reusable/PieceSelector';

const mapStateToProps = (state: RootState) => ({
  piece: state.primaryPiece,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setPiece: (piece: Piece) => {
    dispatch(resetScenario());
    dispatch(setPrimaryPiece(piece))
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PieceSelector);
