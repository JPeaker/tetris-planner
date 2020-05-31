import React from 'react';
import { Stepper, Step, StepLabel } from '@material-ui/core';
import { connect } from 'react-redux';
import './style/App.css';
import { RootState } from './store/reducers';
import { AppState } from './store/actions/app';

interface AppProps {
  state: AppState;
};

function getLabel(state: AppState) {
  switch(state) {
    case AppState.SETUP:
      return 'Set up scenario';
    case AppState.PLAY_OPTIONS:
      return 'Play options';
    case AppState.COMPARE:
      return 'Compare options';
  }
}

class GlobalStepper extends React.Component<AppProps> {
  render() {
    return (
      <div className="global-stepper-container">
        <Stepper alternativeLabel className="global-stepper" activeStep={this.props.state}>
          <Step key={AppState.SETUP}>
            <StepLabel />
          </Step>
          <Step key={AppState.PLAY_OPTIONS}>
            <StepLabel />
          </Step>
          <Step key={AppState.COMPARE}>
            <StepLabel />
          </Step>
        </Stepper>
        <div className="global-stepper-label">{ getLabel(this.props.state) }</div>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({ state: state.app.state });

export default connect(mapStateToProps)(GlobalStepper);
