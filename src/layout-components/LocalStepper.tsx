import React from 'react';
import '../style/App.css';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { AppStateCategory, getAppStateCategory } from '../store/types';
import SetupStepper from '../setup-components/SetupStepper';
import OptionStepper from '../option-components/OptionStepper';
import CompareStepper from '../compare-components/CompareStepper';

interface AppProps {
  category: AppStateCategory;
};

function getStepper(category: AppStateCategory): JSX.Element {
  switch (category) {
    case AppStateCategory.SETUP:
      return <SetupStepper />;
    case AppStateCategory.OPTIONS:
      return <OptionStepper />;
    case AppStateCategory.COMPARE:
      return <CompareStepper />;
    default:
      return <></>;
  }
}

class LocalStepper extends React.Component<AppProps> {
  render() {
    return getStepper(this.props.category);
  }
}

const mapStateToProps = (state: RootState) => ({ category: getAppStateCategory(state.state) });

export default connect(mapStateToProps)(LocalStepper);
