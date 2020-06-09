import React from 'react';
import classnames from 'classnames';
import '../style/App.css';
import { ListItem, List, ListItemText, ListItemIcon, Checkbox, ListItemSecondaryAction, IconButton, Grid, Tooltip } from '@material-ui/core';
import Add from '@material-ui/icons/Add';
import CompareArrows from '@material-ui/icons/CompareArrows';
import Edit from '@material-ui/icons/Edit';
import Visibility from '@material-ui/icons/Visibility';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { Option, AppState, OptionState, Comparison } from '../store/types';
import TetrisGrid from '../reusable/tetris-grid';
import { getPieceGrid } from '../reusable/move-piece';
import Piece, { PieceList } from '../piece-enum';
import { Dispatch } from 'redux';
import { setState, setPlayOptionsOption, addPlayOptionsOption, addComparison, setComparisonActivePiece, setActiveComparison, clearComparison } from '../store/actions';

interface OptionSummarizeProps {
  options: Option[];
  comparisons: Comparison[];
  grid: number[][];
  setState: (state: AppState) => void;
  goToOption: (id: number) => void;
  addOption: () => void;
  addComparison: (firstOption: number, secondOption: number) => void;
  editComparison: (id: number) => void;
};

interface OptionSummarizeState {
  checked: number[];
  selectedOption: number | null;
  visibleOption: Option | null;
  before: boolean;
  beforeIntervalId: NodeJS.Timeout;
};

class OptionSummarize extends React.Component<OptionSummarizeProps, OptionSummarizeState> {
  constructor(props: OptionSummarizeProps) {
    super(props);

    this.state = {
      selectedOption: this.props.options.length > 0 ? this.props.options[0].id : null,
      visibleOption: null,
      checked: [],
      before: true,
      beforeIntervalId: setInterval(() => this.setState({ before: !this.state.before }), 1000),
    };

    this.toggleExpansion = this.toggleExpansion.bind(this);
    this.getOptionPanel = this.getOptionPanel.bind(this);
    this.showOption = this.showOption.bind(this);
    this.hideOption = this.hideOption.bind(this);
    this.getTooltip = this.getTooltip.bind(this);
  }

  componentWillUnmount() {
    if (this.state.beforeIntervalId) {
      clearInterval(this.state.beforeIntervalId);
    }
  }

  toggleExpansion(id: number) {
    if (this.state.selectedOption === id) {
      this.setState({ selectedOption: null });
    } else {
      this.setState({ selectedOption: id });
    }
  }

  toggleChecked(id: number) {
    if (this.state.checked.includes(id)) {
      this.setState({ checked: this.state.checked.filter(checkedId => checkedId !== id) });
      return;
    }

    const option = this.props.options.find(option => option.id === id);
    if (option === undefined || option.state !== OptionState.DONE) {
      return;
    }

    if (this.state.checked.length < 2) {
      this.setState({ checked: [...this.state.checked, id] });
      return;
    }

    this.setState({ checked: [this.state.checked[1], id] });
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
          grid={this.state.before ? grid : gridAfterFirstPiece}
          className={classnames({ 'grid-disabled': option.gridAfterFirstPiece, 'mini-grid': true })}
          blockSizeInRem={0.5}
          />
      </Grid>
      { gridAfterFirstPiece ? <Grid item xs={6}>
          <TetrisGrid
            grid={this.state.before ? gridAfterFirstPiece : gridAfterNextPiece}
            className={classnames({ 'grid-disabled': option.gridAfterNextPiece, 'mini-grid': true })}
            blockSizeInRem={0.5}
          />
        </Grid> : undefined
      }
      {
        PieceList.map(piece => option[piece.value] ? <Grid item xs={4} key={piece.label}>
          <TetrisGrid
            grid={this.state.before ? gridAfterNextPiece : option[piece.value]!}
            blockSizeInRem={0.5}
            hideTopTwoRows={false}
            className={`${option[piece.value] ? 'grid-disabled' : ''}`}
          />
        </Grid> : undefined)
      }
    </Grid>
  }

  getOptionPanel(option: Option, index: number) {
    return (
      <ListItem dense key={index}>
        <ListItemIcon>
          <IconButton>
            <Checkbox
              disabled={option.state !== OptionState.DONE}
              checked={this.state.checked.includes(option.id)}
              onClick={() => this.toggleChecked(option.id)}
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
          <IconButton onClick={() => this.props.goToOption(option.id)}>
            <Edit />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }

  render() {
    const [option1, option2] = this.state.checked.length === 2 ? this.state.checked : [null, null];
    const existingComparison = option1 !== null && option2 !== null ? this.props.comparisons.find(comparison =>
      (comparison.firstOption.id === option1 && comparison.secondOption.id === option2) ||
      (comparison.secondOption.id === option1 && comparison.firstOption.id === option2)
    ) : undefined;

    const compareMessage = existingComparison ? 'Edit comparison' : 'Compare selected options';
    const compareMethod = existingComparison ? () => this.props.editComparison(existingComparison.id) : () => this.props.addComparison(option1!, option2!);

    return (
      <List>
        {
          this.state.checked.length === 2 ?
            <ListItem key="compare" role={undefined} dense button onClick={compareMethod}>
              <CompareArrows />{ compareMessage }
            </ListItem> :
            undefined
        }
        <ListItem key="add" role={undefined} dense button onClick={this.props.addOption}><Add />Add Option</ListItem>
        { this.props.options.map((option, optionIndex) => this.getOptionPanel(option, optionIndex)) }
      </List>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  options: state.options,
  comparisons: state.comparisons,
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
  },
  addComparison: (firstOption: number, secondOption: number) => {
    dispatch(addComparison(firstOption, secondOption));
    dispatch(setComparisonActivePiece(Piece.I));
    dispatch(setState(AppState.COMPARE_ACTIVE));
  },
  editComparison: (id: number) => {
    dispatch(setActiveComparison(id));
    dispatch(clearComparison(id));
    dispatch(setComparisonActivePiece(Piece.I));
    dispatch(setState(AppState.COMPARE_ACTIVE));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(OptionSummarize);
