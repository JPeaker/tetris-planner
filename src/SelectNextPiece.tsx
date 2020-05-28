import { RootState } from './store/reducers';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { SET_NEXT_PIECE } from './store/actions/setup';
import Piece from './piece-enum';
import PieceSelector from './PieceSelector';

const mapStateToProps = (state: RootState) => ({
  piece: state.setup.nextPiece,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setPiece: (piece: Piece) => dispatch({
    type: SET_NEXT_PIECE,
    piece,
  }),
});

export default connect(mapStateToProps, mapDispatchToProps)(PieceSelector);
