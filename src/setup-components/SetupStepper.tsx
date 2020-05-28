import React from 'react';
import { Dispatch } from 'redux';
import { Button, Stepper, Step, StepContent, StepLabel } from '@material-ui/core';
import '../style/App.css';
import { connect } from 'react-redux';
import { RootState } from '../store/reducers';
import { SetupState, SET_STATE } from '../store/actions/setup';

interface AppProps {
  state: SetupState;
  setState: (state: SetupState) => void;
};

interface AppComponentState {};

interface AppStep {
  key: SetupState;
  label: string;
  description: string;
}

const steps: AppStep[] = [
  {
    key: SetupState.SETUP_PLAYFIELD,
    label: 'Set up columns',
    description: 'Click each column to fill it to the point you need. Don\'t worry, you\'ll have chance to add gaps',
  },
  {
    key: SetupState.ADD_HOLES,
    label: 'Add gaps',
    description: 'Click each block that you want to remove',
  },
  {
    key: SetupState.SELECT_CURRENT_PIECE,
    label: 'Select playable piece',
    description: 'Choose the first piece in your situation',
  },
  {
    key: SetupState.SELECT_NEXT_PIECE,
    label: 'Select next piece',
    description: 'Choose the next piece in your situation',
  },
  {
    key: SetupState.SET_PIECES,
    label: 'Play pieces',
    description: 'Use the numpad to play any pieces you want, and Space to set them in place',
  },
];

class SetupStepper extends React.Component<AppProps, AppComponentState> {
  render() {
    return (
      <Stepper className="instructions" activeStep={this.props.state} orientation="vertical">
        {steps.map((stepObject) => (
          <Step key={stepObject.key}>
            <StepLabel>{stepObject.label}</StepLabel>
            <StepContent>
              <div>{stepObject.description}</div>
              <Button
                variant="contained"
                color="default"
                onClick={() => this.props.setState((this.props.state + 1) % (Object.keys(SetupState).length / 2))}
              >
                Done
              </Button>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  state: state.setup.state,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setState: (state: SetupState) => dispatch({ type: SET_STATE, state }),
})

export default connect(mapStateToProps, mapDispatchToProps)(SetupStepper);
