import React from 'react';
import classnames from 'classnames';
import '../style/App.css';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { Option, AppState } from '../store/types';
import TetrisGrid from '../reusable/tetris-grid';
import { getPieceGrid } from '../reusable/move-piece';
import { PieceList } from '../piece-enum';
import { Dispatch } from 'redux';
import { setState, setPlayOptionsOption } from '../store/actions';

interface OptionSummarizeProps {
  options: Option[];
  grid: number[][];
  setState: (state: AppState) => void;
  goToOption: (id: number) => void;
};

class OptionSummarize extends React.Component<OptionSummarizeProps> {
  render() {
    return this.props.options.map((option, optionIndex) => {
      const { grid } = this.props;
      const gridAfterFirstPiece = option.gridAfterFirstPiece || grid;
      const gridAfterNextPiece = option.gridAfterNextPiece || gridAfterFirstPiece;
      return (
        <Grid
          className="option-summarize-container"
          key={optionIndex}
          container
          direction="row"
          justify="space-around"
          alignItems="center"
          spacing={1}
          onClick={() => this.props.goToOption(option.id)}
        >
          <Grid item xs={12}>Option 1</Grid>
          <Grid item xs={6}>
            <TetrisGrid grid={gridAfterFirstPiece} className={classnames({ 'grid-disabled': option.gridAfterFirstPiece })} blockSizeInRem={0.5} />
          </Grid>
          <Grid item xs={6}>
            <TetrisGrid grid={gridAfterNextPiece} className={classnames({ 'grid-disabled': option.gridAfterNextPiece })} blockSizeInRem={0.5} />
          </Grid>
          {
            PieceList.map(piece => <Grid item xs={1} key={piece.label}>
              <TetrisGrid
                grid={getPieceGrid(piece.value)}
                blockSizeInRem={0.5}
                hideTopTwoRows={false}
                className={`${option[piece.value] ? 'grid-disabled' : ''}`}
              />
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

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setState: (state: AppState) => dispatch(setState(state)),
  goToOption: (id: number) => {
    dispatch(setPlayOptionsOption(id));
    dispatch(setState(AppState.OPTIONS_PLACE_PRIMARY_PIECE));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(OptionSummarize);
