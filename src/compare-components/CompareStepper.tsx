import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import '../style/App.css';
import Piece, { PieceList } from '../piece-enum';
import { getPieceGrid } from '../reusable/move-piece';
import TetrisGrid from '../reusable/tetris-grid';
import { Grid } from '@material-ui/core';
import { RootState } from '../store';
import { AppState } from '../store/types';

interface CompareStepperProps {
  activePiece: Piece | null;
  comparisonFinished: boolean;
};

class CompareStepper extends React.Component<CompareStepperProps> {
  render() {
    return (
      <div className="instructions">
        <p>
          Now we need to evaluate which is the preferable stack after each placement.
        </p>
        <p>
          If we can compare each of the resulting stacks, and decide which we would prefer, we are able to calculate which option for primary and next piece is best, and so which action you should take.
        </p>
        <p>
          Click the option which has the stack that you would prefer. Do note that a stack can look worse, but you could have gained a tetris from it, which would make it more valuable.
        </p>
        <Grid container justify="center">
          {
            PieceList.map(({ value }: { value: Piece }, index: number) => (
              <Grid key={value} item xs={3}>
                <TetrisGrid
                  grid={getPieceGrid(value)}
                  blockSizeInRem={0.5}
                  hideTopTwoRows={false}
                  className={classnames({
                    'option-step-piece': true,
                    'grid-disabled': (this.props.activePiece !== null && index < this.props.activePiece) || this.props.comparisonFinished
                  })}
                />
              </Grid>
            ))
          }
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const comparisonId = state.activeComparisonId!;
  const comparison = state.comparisons.find(c => c.id === comparisonId);

  if (!comparison) {
    throw new Error('unknownComparison');
  }

  return {
    activePiece: comparison.activePiece,
    comparisonFinished: state.state === AppState.COMPARE_COMPLETE,
  };
};

export default connect(mapStateToProps)(CompareStepper);
