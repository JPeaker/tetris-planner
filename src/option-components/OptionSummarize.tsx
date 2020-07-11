import React from 'react';
import '../style/App.css';
import { ListItem, List, Checkbox, IconButton, Grid, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, FormControlLabel } from '@material-ui/core';
import Add from '@material-ui/icons/Add';
import CompareArrows from '@material-ui/icons/CompareArrows';
import Edit from '@material-ui/icons/Edit';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { Option, AppState, OptionState, Comparison } from '../store/types';
import TetrisGrid from '../reusable/tetris-grid';
import Piece from '../piece-enum';
import { Dispatch } from 'redux';
import { setState, setPlayOptionsOption, addPlayOptionsOption, addComparison, setComparisonActivePiece, setActiveComparison, clearComparison } from '../store/actions';

interface OptionSummarizeProps {
  options: Option[];
  comparisons: Comparison[];
  grid: number[][];
  primaryPiece: Piece | null;
  nextPiece: Piece | null;
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

class OptionSummarize extends React.Component<OptionSummarizeProps, OptionSummarizeState> {
  constructor(props: OptionSummarizeProps) {
    super(props);

    this.state = {
      selectedOption: this.props.options.length > 0 ? this.props.options[0].id : null,
      visibleOption: null,
      checked: [],
      gridState: GridState.START,
      beforeIntervalId: setInterval(() => this.setState({
        gridState: this.getNextGridState(this.state.gridState),
      }), 500),
    };

    this.toggleExpansion = this.toggleExpansion.bind(this);
    this.getOptionPanel = this.getOptionPanel.bind(this);
    this.showOption = this.showOption.bind(this);
    this.hideOption = this.hideOption.bind(this);
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

  toggleExpansion(event: React.MouseEvent<HTMLDivElement>, id: number) {
    event.stopPropagation();
    if (this.state.selectedOption === id) {
      this.setState({ selectedOption: null });
    } else {
      this.setState({ selectedOption: id });
    }
  }

  toggleChecked(event: React.MouseEvent<HTMLButtonElement>, id: number) {
    event.stopPropagation();

    if (this.state.checked.includes(id)) {
      this.setState({ checked: this.state.checked.filter(checkedId => checkedId !== id) });
      return;
    }

    const option = this.props.options.find(option => option.id === id);
    if (option === undefined || option.state !== OptionState.DONE) {
      return;
    }

    if (this.state.checked.length < 2) {
      this.setState({ checked: [...this.state.checked, id].sort() });
      return;
    }

    this.setState({ checked: [this.state.checked[1], id].sort() });
  }

  showOption(option: Option) {
    this.setState({ visibleOption: option });
  }

  hideOption() {
    this.setState({ visibleOption: null });
  }

  getOptionPanel(option: Option, index: number) {
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
      <ExpansionPanel key={option.id} expanded={this.state.selectedOption === option.id} onClick={(event) => this.toggleExpansion(event, option.id)}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <FormControlLabel
            control={<Checkbox onClick={(event) => this.toggleChecked(event, option.id)} disabled={option.state !== OptionState.DONE} />}
            label={`Option ${index + 1}`}
          />
          <IconButton onClick={() => this.props.goToOption(option.id)}>
              <Edit />
            </IconButton>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container>
            <Grid item xs={12}>
              <TetrisGrid
                grid={stateGrid}
                beforeGrid={beforeGrid}
                className="mini-grid"
                blockSizeInRem={0.5}
              />
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }

  render() {
    const [option1, option2] = this.state.checked.length === 2 ? this.state.checked : [null, null];

    const compareMethod = this.state.checked.length === 2 ? () => this.props.addComparison(option1!, option2!) : undefined;
    return (
      <List>
        <ListItem key="compare" role={undefined} button onClick={compareMethod} disabled={!compareMethod}>
          <CompareArrows />Compare selected options
        </ListItem>
        <ListItem key="add" role={undefined} button onClick={this.props.addOption}><Add />Add Option</ListItem>
        { this.props.options.map((option, optionIndex) => this.getOptionPanel(option, optionIndex)) }
      </List>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  options: state.options,
  comparisons: state.comparisons,
  grid: state.grid,
  primaryPiece: state.primaryPiece,
  nextPiece: state.nextPiece,
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
