import React from 'react';
import { Stepper, Step, StepLabel } from '@material-ui/core';
import { connect } from 'react-redux';
import '../style/App.css';
import { RootState } from '../store';
import { AppStateCategory, getAppStateCategory } from '../store/types';

interface AppProps {
  category: AppStateCategory;
};

function getLabel(category: AppStateCategory): string {
  switch (category) {
    case AppStateCategory.SETUP:
      return 'Setup';
    case AppStateCategory.OPTIONS:
      return 'Run through options';
    case AppStateCategory.COMPARE:
      return 'Unknown state';
  }
}

class GlobalStepper extends React.Component<AppProps> {
  render() {
    return (
      <div className="global-stepper-container">
        <Stepper alternativeLabel className="global-stepper" activeStep={this.props.category}>
          <Step key={AppStateCategory.SETUP}>
            <StepLabel />
          </Step>
          <Step key={AppStateCategory.OPTIONS}>
            <StepLabel />
          </Step>
          <Step key={AppStateCategory.COMPARE}>
            <StepLabel />
          </Step>
        </Stepper>
        <div className="global-stepper-label">{ getLabel(this.props.category) }</div>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({ category: getAppStateCategory(state.state) });

export default connect(mapStateToProps)(GlobalStepper);
