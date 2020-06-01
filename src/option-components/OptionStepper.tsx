import React from 'react';
import { Dispatch } from 'redux';
import { Button, Stepper, Step, StepContent, StepLabel } from '@material-ui/core';
import '../style/App.css';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { AppState } from '../store/types';
import { setState, setPlayOptionsOptionPossibility } from '../store/actions';
import Piece from '../piece-enum';

interface AppProps {
  state: AppState;
  setAppState: (state: AppState) => void;
  setActivePieceId: (piece: Piece) => void;
};

class OptionStepper extends React.Component<AppProps> {
  render() {
    // Return -5 cos it needs to start from 0 cos... life.
    return (
      <Stepper className="instructions" activeStep={this.props.state - 5} orientation="vertical">
        <Step key={AppState.OPTIONS_PLACE_PRIMARY_PIECE}>
          <StepLabel>Place first piece</StepLabel>
          <StepContent>
            <div>Put your first piece in what you think is the best position</div>
            <Button
              variant="contained"
              color="default"
              onClick={() => this.props.setAppState(AppState.OPTIONS_PLACE_NEXT_PIECE)}
            >
              Done
            </Button>
          </StepContent>
        </Step>
        <Step key={AppState.OPTIONS_PLACE_NEXT_PIECE}>
          <StepLabel>Place next piece</StepLabel>
          <StepContent>
            <div>Place your next piece in what you think is the best position</div>
            <Button
              variant="contained"
              color="default"
              onClick={() => this.props.setAppState(AppState.OPTIONS_PLACE_POSSIBILITY)}
            >
              Done
            </Button>
          </StepContent>
        </Step>
        <Step key={AppState.OPTIONS_PLACE_POSSIBILITY}>
          <StepLabel>Place all possible next pieces</StepLabel>
          <StepContent>
            <div onClick={() => this.props.setActivePieceId(Piece.I)}>I</div>
            <div onClick={() => this.props.setActivePieceId(Piece.O)}>O</div>
            <div onClick={() => this.props.setActivePieceId(Piece.T)}>T</div>
            <div onClick={() => this.props.setActivePieceId(Piece.J)}>J</div>
            <div onClick={() => this.props.setActivePieceId(Piece.L)}>L</div>
            <div onClick={() => this.props.setActivePieceId(Piece.Z)}>Z</div>
            <div onClick={() => this.props.setActivePieceId(Piece.S)}>S</div>
            <Button
              variant="contained"
              color="default"
              onClick={() => this.props.setAppState(AppState.SETUP_CHOOSE_NEXT_PIECE)}
              >
              Done
            </Button>
          </StepContent>
        </Step>
      </Stepper>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  state: state.state,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setAppState: (state: AppState) => dispatch(setState(state)),
  setActivePieceId: (piece: Piece) => dispatch(setPlayOptionsOptionPossibility(piece)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OptionStepper);
