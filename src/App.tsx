import React from 'react';
import { Dispatch } from 'redux';
import { Button, Stepper, Step, StepContent, StepLabel } from '@material-ui/core';
import background from './static/background.png';
import './style/App.css';
import { connect } from 'react-redux';
import { RootState } from './store/reducers';
import { SetupState } from './store/reducers/setup';
import { SET_GRID, SET_STATE } from './store/actions/setup';
import SetupPlayfield from './SetupPlayfield';
import AddHoles from './AddHoles';
import SelectFirstPiece from './SelectFirstPiece';
import SelectNextPiece from './SelectNextPiece';
import PlacePieces from './PlacePieces';
import Piece from './piece-enum';

interface AppProps {
  grid: number[][];
  state: SetupState;
  nextPiece: Piece | null;
  setGrid: (grid: number[][]) => void;
  setState: (state: SetupState) => void;
};

interface AppComponentState {};

interface AppStep {
  key: SetupState;
  label: string;
  description: string;
  playfield: JSX.Element;
}

function getSteps(grid: number[][], setGrid: (grid: number[][]) => void): AppStep[] {
  return [
    {
      key: SetupState.SETUP_PLAYFIELD,
      label: 'Set up columns',
      description: 'Click each column to fill it to the point you need. Don\'t worry, you\'ll have chance to add gaps',
      playfield: <SetupPlayfield grid={grid} setGrid={setGrid} />,
    },
    {
      key: SetupState.ADD_HOLES,
      label: 'Add gaps',
      description: 'Click each block that you want to remove',
      playfield: <AddHoles grid={grid} setGrid={setGrid} />,
    },
    {
      key: SetupState.SELECT_CURRENT_PIECE,
      label: 'Select playable piece',
      description: 'Choose the first piece in your situation',
      playfield: <SelectFirstPiece />
    },
    {
      key: SetupState.SELECT_NEXT_PIECE,
      label: 'Select next piece',
      description: 'Choose the next piece in your situation',
      playfield: <SelectNextPiece />
    },
    {
      key: SetupState.SET_PIECES,
      label: 'Play pieces',
      description: 'Use the numpad to play any pieces you want, and Space to set them in place',
      playfield: <PlacePieces grid={grid} setGrid={setGrid} />,
    },
  ];
}

class App extends React.Component<AppProps, AppComponentState> {
  render() {
    const steps = getSteps(this.props.grid, this.props.setGrid);
    const activeStep = steps.find(step => step.key === this.props.state);
    return (
      <div>
        <div className="background">
          <img src={background} alt="" />
        </div>
        <Stepper className="instructions" activeStep={this.props.state} orientation="vertical">
          {steps.map((stepObject) => (
            <Step key={stepObject.key}>
              <StepLabel>{stepObject.label}</StepLabel>
              <StepContent>
                <div>{stepObject.description}</div>
                <Button
                  variant="contained"
                  color="default"
                  onClick={() => this.props.setState((this.props.state + 1) % (Object.keys(SetupState).length / 2))}
                >
                  Done
                </Button>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        <div className="playfield">
          { activeStep ? activeStep.playfield : null }
        </div>
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

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setGrid: (grid: number[][]) => dispatch({ type: SET_GRID, grid }),
  setState: (state: SetupState) => dispatch({ type: SET_STATE, state }),
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
