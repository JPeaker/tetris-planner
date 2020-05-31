import React from 'react';
import { Dispatch } from 'redux';
import { Button, Stepper, Step, StepContent, StepLabel } from '@material-ui/core';
import '../style/App.css';
import { connect } from 'react-redux';
import { RootState } from '../store/reducers';
import { SetupState, SET_STATE } from '../store/actions/setup';
import { AppState, SET_APP_STATE } from '../store/actions/app';
import { INITIALIZE_PLAY_OPTIONS_STATE } from '../store/actions/play-options';
import Piece from '../piece-enum';

interface AppProps {
  state: SetupState;
  currentPiece: Piece | null,
  nextPiece: Piece | null,
  setSetupState: (state: SetupState) => void;
  moveToPlayOptions: () => void;
};

class SetupStepper extends React.Component<AppProps> {
  render() {
    return (
      <Stepper className="instructions" activeStep={this.props.state} orientation="vertical">
        <Step key={SetupState.SETUP_PLAYFIELD}>
          <StepLabel>Set up columns</StepLabel>
          <StepContent>
            <div>Click each column to fill it to the point you need. Don't worry, you'll have chance to add gaps</div>
            <Button
              variant="contained"
              color="default"
              onClick={() => this.props.setSetupState(SetupState.ADD_HOLES)}
            >
              Done
            </Button>
          </StepContent>
        </Step>
        <Step key={SetupState.ADD_HOLES}>
          <StepLabel>Add gaps</StepLabel>
          <StepContent>
            <div>Click each block that you want to remove</div>
            <Button
              variant="contained"
              color="default"
              onClick={() => this.props.setSetupState(SetupState.SELECT_CURRENT_PIECE)}
            >
              Done
            </Button>
          </StepContent>
        </Step>
        <Step key={SetupState.SELECT_CURRENT_PIECE}>
          <StepLabel>Select playable piece</StepLabel>
          <StepContent>
            <div>Choose the first piece in your situation</div>
            <Button
              variant="contained"
              color="default"
              disabled={this.props.currentPiece === null}
              onClick={() => this.props.setSetupState(SetupState.SELECT_NEXT_PIECE)}
              >
              Done
            </Button>
          </StepContent>
        </Step>
        <Step key={SetupState.SELECT_NEXT_PIECE}>
          <StepLabel>Select next piece</StepLabel>
          <StepContent>
            <div>Choose the next piece in your situation</div>
            <Button
              variant="contained"
              color="default"
              disabled={this.props.nextPiece === null}
              onClick={() => this.props.moveToPlayOptions()}
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
  state: state.setup.state,
  currentPiece: state.setup.primaryPiece,
  nextPiece: state.setup.nextPiece,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setSetupState: (state: SetupState) => dispatch({ type: SET_STATE, state }),
  setAppState: (state: AppState) => dispatch({ type: SET_APP_STATE, state }),
  moveToPlayOptions: () => {
    dispatch({ type: INITIALIZE_PLAY_OPTIONS_STATE });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SetupStepper);
