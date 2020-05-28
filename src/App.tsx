import React from 'react';
import background from './static/background.png';
import './style/App.css';
import { connect } from 'react-redux';
import { RootState } from './store/reducers';
import { SetupState } from './store/actions/setup';
import GlobalStepper from './GlobalStepper';
import LocalStepper from './LocalStepper';
import Playfield from './Playfield';
import Piece from './piece-enum';

interface AppProps {
  grid: number[][];
  state: SetupState;
  nextPiece: Piece | null;
};

class App extends React.Component<AppProps> {
  render() {
    return (
      <div>
        <div className="background">
          <img src={background} alt="" />
        </div>
        <GlobalStepper />
        <LocalStepper />
        <Playfield />
        <div className="next-box">
          { this.props.nextPiece !== null ? <div>{this.props.nextPiece}</div> : null }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  grid: state.setup.grid,
  state: state.setup.state,
  nextPiece: state.setup.nextPiece,
});

export default connect(mapStateToProps)(App);
