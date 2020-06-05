import React from 'react';
import classnames from 'classnames';
import '../style/App.css';
import { ListItem, List, ListItemText, ListItemIcon, Checkbox, ListItemSecondaryAction, IconButton, Grid, Tooltip } from '@material-ui/core';
import Add from '@material-ui/icons/Add';
import Check from '@material-ui/icons/Check';
import Edit from '@material-ui/icons/Edit';
import Visibility from '@material-ui/icons/Visibility';
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
  visibleOption: Option | null;
};

class OptionSummarize extends React.Component<OptionSummarizeProps, OptionSummarizeState> {
  constructor(props: OptionSummarizeProps) {
    super(props);

    this.state = {
      selectedOption: this.props.options.length > 0 ? this.props.options[0].id : null,
      visibleOption: null,
    };

    this.toggleExpansion = this.toggleExpansion.bind(this);
    this.getOptionPanel = this.getOptionPanel.bind(this);
    this.showOption = this.showOption.bind(this);
    this.hideOption = this.hideOption.bind(this);
    this.getTooltip = this.getTooltip.bind(this);
  }

  toggleExpansion(id: number) {
    if (this.state.selectedOption === id) {
      this.setState({ selectedOption: null });
    } else {
      this.setState({ selectedOption: id });
    }
  }

  showOption(option: Option) {
    this.setState({ visibleOption: option });
  }

  hideOption() {
    this.setState({ visibleOption: null });
  }

  getTooltip(option: Option, index: number): JSX.Element {
    const { grid } = this.props;
    const gridAfterFirstPiece = option.gridAfterFirstPiece || grid;
    const gridAfterNextPiece = option.gridAfterNextPiece || gridAfterFirstPiece;
    const containerClasses = classnames({
      'option-summarize-container': true,
      'option-complete': option.state === OptionState.DONE,
    })
    return <Grid
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
          />
      </Grid>
      <Grid item xs={6}>
        <TetrisGrid
          grid={gridAfterNextPiece}
          className={classnames({ 'grid-disabled': option.gridAfterNextPiece, 'mini-grid': true })}
          blockSizeInRem={0.5}
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
  }

  getOptionPanel(option: Option, index: number) {
    return (
      <ListItem dense key={index}>
        <ListItemIcon>
          <IconButton>
            <Checkbox
              edge="start"
              tabIndex={-1}
              disableRipple
            />
          </IconButton>
        </ListItemIcon>
        <ListItemText primary={`Option ${index + 1}`} />
        <ListItemSecondaryAction>
          <Tooltip title={this.getTooltip(option, index)}>
            <IconButton onMouseEnter={() => this.showOption(option)} onMouseLeave={() => this.hideOption()}>
              <Visibility />
            </IconButton>
          </Tooltip>
          <IconButton>
            <Edit />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }

  render() {
    return (
      <List>
        <ListItem key="add" role={undefined} dense button onClick={this.props.addOption}><Add />Add Option</ListItem>
        { this.props.options.map((option, optionIndex) => this.getOptionPanel(option, optionIndex)) }
      </List>
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
