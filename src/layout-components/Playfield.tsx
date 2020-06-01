import React from 'react';
import '../style/App.css';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { AppStateCategory, getAppStateCategory } from '../store/types';
import SetupPlayfield from '../setup-components/SetupPlayfield';
import OptionsPlayfield from '../option-components/OptionsPlayfield';

interface AppProps {
  stateCategory: AppStateCategory;
};

function getPlayfield(category: AppStateCategory): JSX.Element {
  switch (category) {
    case AppStateCategory.SETUP:
      return <SetupPlayfield />;
    case AppStateCategory.OPTIONS:
      return <OptionsPlayfield />;
    case AppStateCategory.COMPARE:
      return <>Compare</>;
    default:
      return <></>;
  }
}

class Playfield extends React.Component<AppProps> {
  render() {
    return (
      <div className="playfield">
        { getPlayfield(this.props.stateCategory) }
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({ stateCategory: getAppStateCategory(state.state) });

export default connect(mapStateToProps)(Playfield);
