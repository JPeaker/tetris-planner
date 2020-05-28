import React from 'react';
import './style/App.css';
import { connect } from 'react-redux';
import { RootState } from './store/reducers';
import { AppState } from './store/actions/app';
import SetupStepper from './setup-components/SetupStepper';

interface AppProps {
  state: AppState;
};

function getStepper(state: AppState): JSX.Element {
  switch (state) {
    case AppState.SETUP:
      return <SetupStepper />;
    case AppState.OPTION_1:
      return <>Option1</>;
    case AppState.OPTION_2:
      return <>Option2</>;
    case AppState.COMPARE:
      return <>Compare</>;
    default:
      return <></>;
  }
}

class LocalStepper extends React.Component<AppProps> {
  render() {
    return getStepper(this.props.state);
  }
}

const mapStateToProps = (state: RootState) => ({ state: state.app.state });

export default connect(mapStateToProps)(LocalStepper);
