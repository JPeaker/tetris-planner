import React from 'react';
import './style/App.css';
import { connect } from 'react-redux';
import { RootState } from './store/reducers';
import { AppState } from './store/actions/app';
import SetupPlayfield from './setup-components/SetupPlayfield';

interface AppProps {
  state: AppState;
};

function getPlayfield(state: AppState): JSX.Element {
  switch (state) {
    case AppState.SETUP:
      return <SetupPlayfield />;
    case AppState.OPTION_1:
      return <>Option1</>
    case AppState.OPTION_2:
      return <>Option2</>
    case AppState.COMPARE:
      return <>Compare</>
    default:
      return <></>;
  }
}

class Playfield extends React.Component<AppProps> {
  render() {
    return (
      <div className="playfield">
        { getPlayfield(this.props.state) }
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({ state: state.app.state });

export default connect(mapStateToProps)(Playfield);
