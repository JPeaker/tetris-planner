import React from 'react';
import { Dispatch } from 'redux';
import { Button, Stepper, Step, StepContent, StepLabel } from '@material-ui/core';
import '../style/App.css';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { AppState } from '../store/types';
import { setState, initializePlayOptionsState } from '../store/actions';
import Piece from '../piece-enum';

interface AppProps {
  state: AppState;
  currentPiece: Piece | null,
  nextPiece: Piece | null,
  setAppState: (state: AppState) => void;
  moveToPlayOptions: () => void;
};

class SetupStepper extends React.Component<AppProps> {
  render() {
    return (
      <Stepper className="instructions" activeStep={this.props.state} orientation="vertical">
        <Step key={AppState.SETUP_GRID}>
          <StepLabel>Set up columns</StepLabel>
          <StepContent>
            <div>Click each column to fill it to the point you need. Don't worry, you'll have chance to add gaps</div>
            <Button
              variant="contained"
              color="default"
              onClick={() => this.props.setAppState(AppState.SETUP_ADD_HOLES)}
            >
              Done
            </Button>
          </StepContent>
        </Step>
        <Step key={AppState.SETUP_ADD_HOLES}>
          <StepLabel>Add gaps</StepLabel>
          <StepContent>
            <div>Click each block that you want to remove</div>
            <Button
              variant="contained"
              color="default"
              onClick={() => this.props.setAppState(AppState.SETUP_CHOOSE_PRIMARY_PIECE)}
            >
              Done
            </Button>
          </StepContent>
        </Step>
        <Step key={AppState.SETUP_CHOOSE_PRIMARY_PIECE}>
          <StepLabel>Select playable piece</StepLabel>
          <StepContent>
            <div>Choose the first piece in your situation</div>
            <Button
              variant="contained"
              color="default"
              disabled={this.props.currentPiece === null}
              onClick={() => this.props.setAppState(AppState.SETUP_CHOOSE_NEXT_PIECE)}
              >
              Done
            </Button>
          </StepContent>
        </Step>
        <Step key={AppState.SETUP_CHOOSE_NEXT_PIECE}>
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
  state: state.state,
  currentPiece: state.primaryPiece,
  nextPiece: state.nextPiece,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setAppState: (state: AppState) => dispatch(setState(state)),
  moveToPlayOptions: () => {
    dispatch(initializePlayOptionsState());
    dispatch(setState(AppState.OPTIONS_SUMMARIZE));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SetupStepper);
