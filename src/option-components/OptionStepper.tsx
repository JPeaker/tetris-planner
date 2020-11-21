import React from 'react';
import { Dispatch } from 'redux';
import classnames from 'classnames';
import { Stepper, Step, StepContent, StepLabel, Grid } from '@material-ui/core';
import '../style/App.css';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { AppState, OptionState, Option } from '../store/types';
import { setState, setPlayOptionsOptionPossibility, setPlayOptionsOptionState, setPlayOptionsOption } from '../store/actions';
import { Piece, PieceList, Grid as GridType, getPieceGrid, TetrisGrid } from 'nes-tetris-representation';

interface OptionStepperProps {
  state: AppState;
  option: Option | null;
  possibilityGrid: PossibilityGrid;
  setAppState: (state: AppState) => void;
  setActivePieceId: (piece: Piece) => void;
  completeOption: () => void;
};

type PossibilityGrid = {
  [Piece.I]: null | GridType,
  [Piece.T]: null | GridType,
  [Piece.O]: null | GridType,
  [Piece.J]: null | GridType,
  [Piece.L]: null | GridType,
  [Piece.Z]: null | GridType,
  [Piece.S]: null | GridType,
};

class OptionStepper extends React.Component<OptionStepperProps> {
  render() {
    if (this.props.state === AppState.OPTIONS_SUMMARIZE) {
      return <div className="instructions">
        <p>You've set up the scenario you want to analyze.</p>
        <p>Each option allows us to explore another possible scenario. Each option should be a different placement of the current and next pieces, and then you will go through all of the possible pieces that come after that.</p>
        <p>When you have two or more options, you can select two of them to compare the different resulting stacks. This will allow you to choose the best option for every scenario in a game given all of the available information.</p>
      </div>
    }

    if (this.props.option === null) {
      return null;
    }

    // Return -5 cos it needs to start from 0 cos... life.
    return (
      <Stepper className="instructions" activeStep={this.props.state - 5} orientation="vertical">
        <Step key={AppState.OPTIONS_PLACE_PRIMARY_PIECE}>
          <StepLabel>Option { this.props.option.id + 1 }: Place first piece</StepLabel>
          <StepContent>Put your first piece in what you think is the best position. Use the arrow keys to navigate, A/S to rotate, D to hard drop, and Space to lock it in place.</StepContent>
        </Step>
        <Step key={AppState.OPTIONS_PLACE_NEXT_PIECE}>
          <StepLabel>Option { this.props.option.id + 1 }: Place next piece</StepLabel>
          <StepContent>Place your next piece in what you think is the best position. Use the arrow keys to navigate, A/S to rotate, , D to hard drop, and Space to lock it in place.</StepContent>
        </Step>
        <Step key={AppState.OPTIONS_PLACE_POSSIBILITY}>
          <StepLabel>Option { this.props.option.id + 1 }: Place all possible next pieces</StepLabel>
          <StepContent>
            <div style={{ marginBottom: '1rem' }}>Use the arrow keys to navigate, A/S to rotate, , D to hard drop, and Space to lock it in place.</div>
            <Grid container justify="center">
              {
                PieceList.map(({ value }: { value: Piece }) => (
                  <Grid item key={value} xs={3}>
                    <TetrisGrid
                      onClick={() => this.props.setActivePieceId(value)}
                      grid={getPieceGrid(value)}
                      blockSizeInRem={0.5}
                      hideTopTwoRows={false}
                      className={classnames({ 'option-step-piece': true, 'grid-disabled': this.props.possibilityGrid[value] })}
                    />
                  </Grid>
                ))
              }
            </Grid>
          </StepContent>
        </Step>
      </Stepper>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const option = state.activeOptionId === null ? null : state.options[state.activeOptionId];
  const grid: PossibilityGrid = PieceList.reduce((gridSoFar, { value: currentValue }) => {
    return Object.assign({}, gridSoFar, { [currentValue]: option && option[currentValue] });
  }, {} as PossibilityGrid);
  return {
    state: state.state,
    possibilityGrid: grid,
    option,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setAppState: (state: AppState) => dispatch(setState(state)),
  setActivePieceId: (piece: Piece) => dispatch(setPlayOptionsOptionPossibility(piece)),
  completeOption: () => {
    dispatch(setPlayOptionsOptionState(OptionState.DONE));
    dispatch(setPlayOptionsOption(null));
    dispatch(setState(AppState.OPTIONS_SUMMARIZE));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(OptionStepper);
