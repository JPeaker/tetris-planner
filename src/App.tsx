import React from 'react';
import _ from 'lodash';
import background from './static/background.png';
import './style/App.css';
import GlobalStepper from './layout-components/GlobalStepper';
import LocalStepper from './layout-components/LocalStepper';
import Playfield from './layout-components/Playfield';
import NextBox from './layout-components/NextBox';
import TopBox from './layout-components/TopBox';

class App extends React.Component {
  render() {
    return (
      <div>
        <div className="background">
          <img src={background} alt="" />
        </div>
        <LocalStepper />
        <Playfield />
        <NextBox />
        <TopBox />
      </div>
    );
  }
}

export default App;
