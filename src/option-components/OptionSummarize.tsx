import React from 'react';
import classnames from 'classnames';
import '../style/App.css';
import { Grid, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import Add from '@material-ui/icons/Add';
import Check from '@material-ui/icons/Check';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { Option, AppState, OptionState } from '../store/types';
import TetrisGrid from '../reusable/tetris-grid';
import { getPieceGrid } from '../reusable/move-piece';
import { PieceList } from '../piece-enum';
import { Dispatch } from 'redux';
import { setState, setPlayOptionsOption, addPlayOptionsOption } from '../store/actions';

interface OptionSummarizeProps {
  options: Option[];
  grid: number[][];
  setState: (state: AppState) => void;
  goToOption: (id: number) => void;
  addOption: () => void;
};

interface OptionSummarizeState {
  selectedOption: number | null;
};

class OptionSummarize extends React.Component<OptionSummarizeProps, OptionSummarizeState> {
  constructor(props: OptionSummarizeProps) {
    super(props);

    this.state = {
      selectedOption: this.props.options.length > 0 ? this.props.options[0].id : null,
    };

    this.toggleExpansion = this.toggleExpansion.bind(this);
    this.getOptionPanel = this.getOptionPanel.bind(this);
  }

  toggleExpansion(id: number) {
    if (this.state.selectedOption === id) {
      this.setState({ selectedOption: null });
    } else {
      this.setState({ selectedOption: id });
    }
  }

  getOptionPanel(option: Option, index: number) {
    const { grid } = this.props;
    const gridAfterFirstPiece = option.gridAfterFirstPiece || grid;
    const gridAfterNextPiece = option.gridAfterNextPiece || gridAfterFirstPiece;
    const containerClasses = classnames({
      'option-summarize-container': true,
      'option-complete': option.state === OptionState.DONE,
    })
    return (
      <ExpansionPanel key={`expansion-panel-${index}`} expanded={this.state.selectedOption === index} onClick={() => this.toggleExpansion(index)}>
        <ExpansionPanelSummary expandIcon={<ArrowDropDown />}>
          Option { index + 1 }
          { option.state === OptionState.DONE ? <Check color="primary" /> : null}
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid
            className={containerClasses}
            key={index}
            container
            direction="row"
            justify="space-around"
            alignItems="center"
            spacing={1}
            onClick={() => this.props.goToOption(option.id)}
          >
            <Grid item xs={6}>
              <TetrisGrid
                grid={gridAfterFirstPiece}
                className={classnames({ 'grid-disabled': option.gridAfterFirstPiece, 'mini-grid': true })}
                blockSizeInRem={0.5}
                hideTopTwoRows={false}
                />
            </Grid>
            <Grid item xs={6}>
              <TetrisGrid
                grid={gridAfterNextPiece}
                className={classnames({ 'grid-disabled': option.gridAfterNextPiece, 'mini-grid': true })}
                blockSizeInRem={0.5}
                hideTopTwoRows={false}
              />
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
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }

  render() {
    return (
      <>
        <span>
          Options
          <Add onClick={this.props.addOption} />
        </span>
        { this.props.options.map((option, optionIndex) => this.getOptionPanel(option, optionIndex)) }
      </>
    );
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
  addOption: () => {
    dispatch(addPlayOptionsOption());
    dispatch(setState(AppState.OPTIONS_PLACE_PRIMARY_PIECE));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(OptionSummarize);
