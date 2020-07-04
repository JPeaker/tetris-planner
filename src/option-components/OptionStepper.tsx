import React from 'react';
import { Dispatch } from 'redux';
import classnames from 'classnames';
import { Stepper, Step, StepContent, StepLabel, Grid } from '@material-ui/core';
import '../style/App.css';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { AppState, OptionState, Option } from '../store/types';
import { setState, setPlayOptionsOptionPossibility, setPlayOptionsOptionState, setPlayOptionsOption } from '../store/actions';
import Piece, { PieceList } from '../piece-enum';
import TetrisGrid from '../reusable/tetris-grid';
import { getPieceGrid } from '../reusable/move-piece';

interface AppProps {
  state: AppState;
  option: Option | null;
  possibilityGrid: PossibilityGrid;
  setAppState: (state: AppState) => void;
  setActivePieceId: (piece: Piece) => void;
  completeOption: () => void;
};

type PossibilityGrid = {
  [Piece.I]: null | number[][],
  [Piece.T]: null | number[][],
  [Piece.O]: null | number[][],
  [Piece.J]: null | number[][],
  [Piece.L]: null | number[][],
  [Piece.Z]: null | number[][],
  [Piece.S]: null | number[][],
};

class OptionStepper extends React.Component<AppProps> {
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
          <StepContent>Put your first piece in what you think is the best position</StepContent>
        </Step>
        <Step key={AppState.OPTIONS_PLACE_NEXT_PIECE}>
          <StepLabel>Option { this.props.option.id + 1 }: Place next piece</StepLabel>
          <StepContent>Place your next piece in what you think is the best position</StepContent>
        </Step>
        <Step key={AppState.OPTIONS_PLACE_POSSIBILITY}>
          <StepLabel>Option { this.props.option.id + 1 }: Place all possible next pieces</StepLabel>
          <StepContent>
            <Grid container justify="center">
              {
                PieceList.map(({ value }: { value: Piece }) => (
                  <Grid xs={3}>
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
