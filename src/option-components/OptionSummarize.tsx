import React from 'react';
import classnames from 'classnames';
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
import Piece, { PieceList } from '../piece-enum';
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

  toggleChecked(event: React.MouseEvent<HTMLLabelElement>, id: number) {
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

  // getOptionPanel(option: Option, index: number) {
  //   return (
  //     <ListItem dense key={index}>
  //       <ListItemIcon>
  //         <IconButton>
  //           <Checkbox
  //             disabled={option.state !== OptionState.DONE}
  //             checked={this.state.checked.includes(option.id)}
  //             onClick={() => this.toggleChecked(option.id)}
  //             edge="start"
  //             tabIndex={-1}
  //             disableRipple
  //           />
  //         </IconButton>
  //       </ListItemIcon>
  //       <ListItemText primary={`Option ${index + 1}`} />
  //       <ListItemSecondaryAction>
  //         <Tooltip title={this.getTooltip(option, index)}>
  //           <IconButton onMouseEnter={() => this.showOption(option)} onMouseLeave={() => this.hideOption()}>
  //             <Visibility />
  //           </IconButton>
  //         </Tooltip>
  //         <IconButton onClick={() => this.props.goToOption(option.id)}>
  //           <Edit />
  //         </IconButton>
  //       </ListItemSecondaryAction>
  //     </ListItem>
  //   );
  // }

  getOptionPanel(option: Option, index: number) {
    const { grid } = this.props;
    const gridAfterFirstPiece = option.gridAfterFirstPiece || grid;
    const gridAfterNextPiece = option.gridAfterNextPiece || gridAfterFirstPiece;

    return (
      <ExpansionPanel expanded={this.state.selectedOption === option.id} onClick={() => this.toggleExpansion(option.id)}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <FormControlLabel
            onClick={(event) => this.toggleChecked(event, option.id)}
            control={<Checkbox disabled={option.state !== OptionState.DONE} />}
            label={`Option ${index + 1}`}
          />
          <IconButton onClick={() => this.props.goToOption(option.id)}>
              <Edit />
            </IconButton>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container>
            <Grid item xs={6}>
              <TetrisGrid
                grid={gridAfterFirstPiece}
                className="mini-grid"
                blockSizeInRem={0.5}
                />
            </Grid>
            { gridAfterFirstPiece ? <Grid item xs={6}>
                <TetrisGrid
                  grid={gridAfterNextPiece}
                  className="mini-grid"
                  blockSizeInRem={0.5}
                />
              </Grid> : undefined
            }
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
        <ListItem key="compare" role={undefined} dense button onClick={compareMethod} disabled={!compareMethod}>
          <CompareArrows />Compare selected options
        </ListItem>
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
