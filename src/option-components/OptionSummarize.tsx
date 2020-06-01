import React from 'react';
import '../style/App.css';
import { drawGrid } from '../reusable/draw-grid';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { Option } from '../store/types';
import Block from '../reusable/block';

interface OptionSummarizeProps {
  options: Option[];
  grid: number[][];
};

class OptionSummarize extends React.Component<OptionSummarizeProps> {
  render() {
    return this.props.options.map(option => {
      var returnGrid = option.gridAfterNextPiece || option.gridAfterFirstPiece || this.props.grid;

      return (
        <Grid className="option-summarize-container" container direction="row" justify="space-around" alignItems="center">
          <Grid item xs={12}>Option 1</Grid>
          <Grid item xs={12}>
            {
              drawGrid(
                returnGrid,
                (row, column, value) => <Block row={row} column={column} value={value} />,
                undefined,
                undefined,
                'option-summarize-grid'
              )
            }
          </Grid>
          <Grid item xs={1}>Each piece</Grid>
          <Grid item xs={1}>Each piece</Grid>
          <Grid item xs={1}>Each piece</Grid>
          <Grid item xs={1}>Each piece</Grid>
          <Grid item xs={1}>Each piece</Grid>
          <Grid item xs={1}>Each piece</Grid>
          <Grid item xs={1}>Each piece</Grid>
        </Grid>
      )
    });
  }
}

const mapStateToProps = (state: RootState) => ({
  options: state.options,
  grid: state.grid,
});

export default connect(mapStateToProps)(OptionSummarize);
