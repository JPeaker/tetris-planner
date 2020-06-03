import React from 'react';
import background from './static/background.png';
import './style/App.css';
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
