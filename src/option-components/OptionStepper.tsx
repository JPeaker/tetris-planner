import React from 'react';
import { Dispatch } from 'redux';
import { Button, Stepper, Step, StepContent, StepLabel } from '@material-ui/core';
import '../style/App.css';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { AppState, OptionState } from '../store/types';
import { setState, setPlayOptionsOptionPossibility, setPlayOptionsOptionState, setPlayOptionsOption } from '../store/actions';
import Piece, { PieceList } from '../piece-enum';

interface AppProps {
  state: AppState;
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
    // Return -5 cos it needs to start from 0 cos... life.
    return (
      <Stepper className="instructions" activeStep={this.props.state - 5} orientation="vertical">
        <Step key={AppState.OPTIONS_PLACE_PRIMARY_PIECE}>
          <StepLabel>Option 1: Place first piece</StepLabel>
          <StepContent>
            <div>Put your first piece in what you think is the best position</div>
            <Button
              variant="contained"
              color="default"
              onClick={() => this.props.setAppState(AppState.OPTIONS_PLACE_NEXT_PIECE)}
            >
              Done
            </Button>
          </StepContent>
        </Step>
        <Step key={AppState.OPTIONS_PLACE_NEXT_PIECE}>
          <StepLabel>Option 1: Place next piece</StepLabel>
          <StepContent>
            <div>Place your next piece in what you think is the best position</div>
            <Button
              variant="contained"
              color="default"
              onClick={() => this.props.setAppState(AppState.OPTIONS_PLACE_POSSIBILITY)}
            >
              Done
            </Button>
          </StepContent>
        </Step>
        <Step key={AppState.OPTIONS_PLACE_POSSIBILITY}>
          <StepLabel>Option 1: Place all possible next pieces</StepLabel>
          <StepContent>
            {
              PieceList.map(({ value, label }: { value: Piece, label: string }) => (
                <div key={value} onClick={() => this.props.setActivePieceId(value)}>
                  { label }
                  <span>{ this.props.possibilityGrid[value] === null ? '' : 'Done' }</span>
                </div>
              ))
            }
            <Button
              variant="contained"
              color="default"
              onClick={() => this.props.completeOption()}
              disabled={Object.values(this.props.possibilityGrid).some(value => value === null)}
            >
              Done
            </Button>
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
