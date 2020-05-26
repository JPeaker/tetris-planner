import { RootState } from './store/reducers';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { SET_PRIMARY_PIECE } from './store/actions';
import Piece from './piece-enum';
import PieceSelector from './PieceSelector';

const mapStateToProps = (state: RootState) => ({
  piece: state.app.primaryPiece,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setPiece: (piece: Piece) => dispatch({
    type: SET_PRIMARY_PIECE,
    piece,
  }),
});

export default connect(mapStateToProps, mapDispatchToProps)(PieceSelector);
