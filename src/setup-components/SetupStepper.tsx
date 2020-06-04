import React from 'react';
import { Dispatch } from 'redux';
import { Stepper, Step, StepContent, StepLabel } from '@material-ui/core';
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
          <StepLabel>Set up the stack</StepLabel>
          <StepContent>
            <div>Click each column to match the stack that you want to analyze. Don't worry, there will be chance to add gaps next. Press Space when you're done</div>
          </StepContent>
        </Step>
        <Step key={AppState.SETUP_ADD_HOLES}>
          <StepLabel>Toggle individual blocks</StepLabel>
          <StepContent>
            <div>Click each block that you want to add/remove. Press Space when you're done</div>
          </StepContent>
        </Step>
        <Step key={AppState.SETUP_CHOOSE_PRIMARY_PIECE}>
          <StepLabel>Select playable piece</StepLabel>
          <StepContent>
            <div>Choose the piece you first have to place. Press Space when you're done</div>
          </StepContent>
        </Step>
        <Step key={AppState.SETUP_CHOOSE_NEXT_PIECE}>
          <StepLabel>Select next piece</StepLabel>
          <StepContent>
            <div>Choose the next piece you have to place. Press Space when you're done</div>
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
