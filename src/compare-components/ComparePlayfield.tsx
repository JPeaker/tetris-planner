import React from 'react';
import { Dispatch } from 'redux';
import '../style/App.css';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { AppState, Option, Comparison, OptionState } from '../store/types';
import { addComparison, setState, setComparisonActivePiece, setComparisonPieceChoice, advanceComparisonActivePiece } from '../store/actions';
import { ListItem, ListItemText, List, ListItemIcon, Checkbox, Grid, Button } from '@material-ui/core';
import { Piece, Grid as GridType } from 'nes-tetris-representation/lib/piece-types';
import TetrisGrid from '../reusable/tetris-grid';
import CompareSummarize from './CompareSummarize';

interface ComparePlayfieldProps {
  state: AppState;
  options: Option[];
  activeComparison: Comparison | null;
  nextPiece: Piece | null;
  addComparison: (firstOption: number, secondOption: number) => void;
  chooseOption: (id: number | null) => void;
};

interface ComparePlayfieldState {
  checked: number[];
  compareState: CompareState;
  beforeIntervalId: NodeJS.Timeout | null;
}

enum CompareState {
  START,
  PLACE,
  CLEAR,
};

class ComparePlayfield extends React.Component<ComparePlayfieldProps, ComparePlayfieldState> {
  constructor(props: ComparePlayfieldProps) {
    super(props);

    this.state = {
      checked: [],
      compareState: CompareState.START,
      beforeIntervalId: null
    }

    this.toggleOption = this.toggleOption.bind(this);
    this.chooseOption = this.chooseOption.bind(this);
  }

  componentDidMount() {
    this.setState({
      beforeIntervalId: setInterval(() => this.props.state !== AppState.COMPARE_COMPLETE ? this.setState({
        compareState: this.state.compareState === CompareState.START
          ? CompareState.PLACE
          : this.state.compareState === CompareState.PLACE
            ? CompareState.CLEAR
            : CompareState.START,
      }) : undefined, 600),
    });
  }

  componentWillUnmount() {
    if (this.state.beforeIntervalId !== null) {
      clearInterval(this.state.beforeIntervalId);
    }
  }

  toggleOption(id: number) {
    if (this.state.checked.includes(id)) {
      this.setState({ checked: this.state.checked.filter(checkedId => checkedId !== id) });
      return;
    }

    if (this.state.checked.length < 2) {
      this.setState({ checked: [...this.state.checked, id] });
      return;
    }

    this.setState({ checked: [this.state.checked[1], id] });
  }

  chooseOption(id: number): void {
    this.setState({
      compareState: CompareState.START,
    });
    this.props.chooseOption(id);
  }

  getOptionGroup(option: Option, activePossibility: Piece) {
    let beforeGrid: GridType | null;
    let nowGrid: GridType;

    switch (this.state.compareState) {
      case CompareState.START:
        beforeGrid = null;
        nowGrid = option.gridAfterNextPiece!;
        break;
      case CompareState.PLACE:
        beforeGrid = option.gridAfterNextPiece;
        nowGrid = option[activePossibility]!;
        break;
      case CompareState.CLEAR:
        beforeGrid = null;
        nowGrid = option[activePossibility]!;
    }

    if (nowGrid === null) {
      return null;
    }

    return <Grid container>
      <Grid item xs={12}>
        <TetrisGrid
          onClick={() => this.chooseOption(option.id)}
          grid={nowGrid}
          beforeGrid={beforeGrid}
          className="mini-grid"
          blockSizeInRem={0.75}
        />
      </Grid>
    </Grid>
  }

  render() {
    switch (this.props.state) {
      case AppState.COMPARE:
        return (
          <List>
            {
              this.props.options.filter(option => option.state === OptionState.DONE).map(option =>
                <ListItem button onClick={() => this.toggleOption(option.id)}>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={this.state.checked.includes(option.id)}
                      tabIndex={-1}
                      disableRipple
                    />
                  </ListItemIcon>
                  <ListItemText primary={`Option ${option.id + 1}`} />
                </ListItem>
              )
            }
            <ListItem
              button
              disabled={this.state.checked.length !== 2}
              onClick={() => this.props.addComparison(this.state.checked[0], this.state.checked[1])}
            >
              Compare
            </ListItem>
          </List>
        );
      case AppState.COMPARE_ACTIVE:
        if (this.props.activeComparison === null) {
          return 'Active compare but null activeComparison';
        }

        if (this.props.activeComparison.activePiece === null) {
          return 'No active piece on activeComparison';
        }
        const firstGrid = this.props.activeComparison.firstOption[this.props.activeComparison.activePiece];
        const secondGrid = this.props.activeComparison.secondOption[this.props.activeComparison.activePiece];

        if (firstGrid === null || secondGrid === null) {
          return 'First or second grid is null on activeComparison for active piece';
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
            { this.getOptionGroup(this.props.activeComparison.firstOption, this.props.activeComparison.activePiece) }
          </Grid>
          <Grid item xs={12}>
            { this.getOptionGroup(this.props.activeComparison.secondOption, this.props.activeComparison.activePiece) }
          </Grid>
          <Grid item xs={12}>
            <Button
              style={{ margin: '1rem 0.25rem' }}
              size="small"
              variant="contained"
              onClick={() => this.props.chooseOption(this.props.activeComparison!.firstOption.id)}
            >
              Top Option
            </Button>
            <Button
              style={{ margin: '1rem 0.25rem' }}
              size="small"
              variant="contained"
              onClick={() => this.props.chooseOption(this.props.activeComparison!.secondOption.id)}
            >
              Bottom Option
            </Button>
            <Button
              style={{ margin: '1rem 0.25rem' }}
              size="small"
              variant="contained"
              onClick={() => this.props.chooseOption(null)}
            >
              Equal
            </Button>
          </Grid>
        </Grid>;
      case AppState.COMPARE_COMPLETE:
        return <CompareSummarize comparison={this.props.activeComparison!} />;
      default:
        return <>AGH</>
    }
  }
}

const mapStateToProps = (state: RootState) => {
  const comparison = state.activeComparisonId === null ? undefined : state.comparisons.find(c => c.id === state.activeComparisonId);
  return {
    state: state.state,
    options: state.options,
    activeComparison: comparison === undefined ? null : comparison,
    nextPiece: state.nextPiece,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addComparison: (firstOption: number, secondOption: number) => {
    dispatch(addComparison(firstOption, secondOption));
    dispatch(setComparisonActivePiece(Piece.I));
    dispatch(setState(AppState.COMPARE_ACTIVE));
  },
  chooseOption: (id: number | null) => {
    dispatch(setComparisonPieceChoice(id));
    dispatch(advanceComparisonActivePiece());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ComparePlayfield);
