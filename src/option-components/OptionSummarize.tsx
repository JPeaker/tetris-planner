import React from 'react';
import '../style/App.css';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { Option } from '../store/types';
import TetrisGrid from '../reusable/tetris-grid';
import { getPieceGrid } from '../reusable/move-piece';
import { PieceList } from '../piece-enum';

interface OptionSummarizeProps {
  options: Option[];
  grid: number[][];
};

class OptionSummarize extends React.Component<OptionSummarizeProps> {
  render() {
    return this.props.options.map((option, optionIndex) => {
      return (
        <Grid
          className="option-summarize-container"
          key={optionIndex}
          container
          direction="row"
          justify="space-around"
          alignItems="center"
        >
          <Grid item xs={12}>Option 1</Grid>
          <Grid item xs={4}>
            <TetrisGrid grid={this.props.grid} blockSizeInRem={0.5} />
          </Grid>
          <Grid item xs={4}>
            { option.gridAfterFirstPiece ? <TetrisGrid grid={option.gridAfterFirstPiece} blockSizeInRem={0.5} /> : null }
          </Grid>
          <Grid item xs={4}>
            { option.gridAfterNextPiece ? <TetrisGrid grid={option.gridAfterNextPiece} blockSizeInRem={0.5} /> : null }
          </Grid>
          {
            PieceList.map(piece => <Grid item xs={1} key={piece.label}>
              <TetrisGrid grid={getPieceGrid(piece.value)} blockSizeInRem={0.5} hideTopTwoRows={false} />
            </Grid>)
          }
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
