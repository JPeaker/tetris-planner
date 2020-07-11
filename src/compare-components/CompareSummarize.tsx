import React from 'react';
import '../style/App.css';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { Option, Comparison } from '../store/types';
import TetrisGrid from '../reusable/tetris-grid';
import Piece from '../piece-enum';
import calculateComparison, { ComparisonChoice } from './calculate-comparison';
import { Grid } from '@material-ui/core';

interface CompareSummarizeProps {
  comparison: Comparison;
  grid: number[][];
  primaryPiece: Piece | null;
  nextPiece: Piece | null;
};

interface CompareSummarizeState {
  gridState: GridState;
  beforeIntervalId: NodeJS.Timeout;
};

enum GridState {
  START,
  PRIMARY_PLACE,
  AFTER_PRIMARY,
  NEXT_PLACE,
  AFTER_NEXT,
};

class CompareSummarize extends React.Component<CompareSummarizeProps, CompareSummarizeState> {
  constructor(props: CompareSummarizeProps) {
    super(props);

    this.state = {
      gridState: GridState.START,
      beforeIntervalId: setInterval(() => this.setState({
        gridState: this.getNextGridState(this.state.gridState),
      }), 1000),
    };

    this.getAnimationGrid = this.getAnimationGrid.bind(this);
  }

  componentWillUnmount() {
    if (this.state.beforeIntervalId) {
      clearInterval(this.state.beforeIntervalId);
    }
  }

  getNextGridState(currentState: GridState): GridState {
    switch (currentState) {
      case GridState.START:
        return GridState.PRIMARY_PLACE;
      case GridState.PRIMARY_PLACE:
        return GridState.AFTER_PRIMARY;
      case GridState.AFTER_PRIMARY:
        return GridState.NEXT_PLACE;
      case GridState.NEXT_PLACE:
        return GridState.AFTER_NEXT;
      case GridState.AFTER_NEXT:
        return GridState.START;
    }
  }

  getAnimationGrid(option: Option) {
    const { grid } = this.props;
    const gridAfterFirstPiece = option.gridAfterFirstPiece || grid;
    const gridAfterNextPiece = option.gridAfterNextPiece || gridAfterFirstPiece;
    const gridAfterFirstPieceBeforeClear = option.gridAfterFirstPieceBeforeClear || grid;
    const gridAfterNextPieceBeforeClear = option.gridAfterNextPieceBeforeClear || gridAfterFirstPiece;

    let beforeGrid: number[][] = grid;
    let stateGrid: number[][] = grid;

    switch (this.state.gridState) {
      case GridState.START:
        beforeGrid = grid;
        stateGrid = grid;
        break;
      case GridState.PRIMARY_PLACE:
        beforeGrid = grid;
        stateGrid = gridAfterFirstPieceBeforeClear;
        break;
      case GridState.AFTER_PRIMARY:
        beforeGrid = gridAfterFirstPiece;
        stateGrid = gridAfterFirstPiece;
        break;
      case GridState.NEXT_PLACE:
        beforeGrid = gridAfterFirstPiece;
        stateGrid = gridAfterNextPieceBeforeClear;
        break;
      case GridState.AFTER_NEXT:
        beforeGrid = gridAfterNextPiece;
        stateGrid = gridAfterNextPiece;
        break;
    }

    return (
      <TetrisGrid
        grid={stateGrid}
        beforeGrid={beforeGrid}
        className="mini-grid"
        blockSizeInRem={0.75}
      />
    );
  }

  render() {
    let message: string | null = null;
    let result: JSX.Element | null = null;

    switch (calculateComparison(this.props.nextPiece!, this.props.comparison)) {
      case ComparisonChoice.FIRST:
        message = `You chose: Option ${this.props.comparison.firstOption!.id + 1}`;
        result = this.getAnimationGrid(this.props.comparison.firstOption!);
        break;
      case ComparisonChoice.SECOND:
        message = `You chose: Option ${this.props.comparison.secondOption!.id + 1}`;
        result = this.getAnimationGrid(this.props.comparison.secondOption!);
        break;
      case ComparisonChoice.SAME:
        message = 'You considered both options equally good';
        result = (<>
          { this.getAnimationGrid(this.props.comparison.firstOption!) }
          { this.getAnimationGrid(this.props.comparison.secondOption!) }
        </>);
        break;
    }

    return <Grid
      container
      spacing={2}
      style={{ marginTop: '2rem' }}
      direction="column"
      alignItems="center"
      justify="center"
    >
      <Grid item xs={12}>
        <div style={{ marginBottom: '1rem' }}>{ message }</div>
        { result }
      </Grid>
    </Grid>;
  }
}

const mapStateToProps = (state: RootState) => ({
  grid: state.grid,
  primaryPiece: state.primaryPiece,
  nextPiece: state.nextPiece,
});

export default connect(mapStateToProps)(CompareSummarize);
