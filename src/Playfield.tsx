import React from 'react';
import './style/App.css';
import { connect } from 'react-redux';
import { RootState } from './store/reducers';
import { AppState } from './store/actions/app';
import SetupPlayfield from './setup-components/SetupPlayfield';
import PlacePieces from './PlacePieces';

interface AppProps {
  state: AppState;
};

function getPlayfield(state: AppState): JSX.Element {
  switch (state) {
    case AppState.SETUP:
      return <SetupPlayfield />;
    case AppState.PLAY_OPTIONS:
      return <PlacePieces />;
    case AppState.COMPARE:
      return <>Compare</>;
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
