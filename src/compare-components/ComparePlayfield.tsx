import React from 'react';
import { Dispatch } from 'redux';
import '../style/App.css';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { AppState, Option, Comparison } from '../store/types';
import { addComparison, setState, setComparisonActivePiece, setComparisonPieceChoice, advanceComparisonActivePiece } from '../store/actions';
import { ListItem, ListItemText, List, ListItemIcon, Checkbox } from '@material-ui/core';
import Piece, { PieceList } from '../piece-enum';
import TetrisGrid from '../reusable/tetris-grid';
import { getPieceGrid } from '../reusable/move-piece';

interface ComparePlayfieldProps {
  state: AppState;
  options: Option[];
  activeComparison: Comparison | null;
  addComparison: (firstOption: number, secondOption: number) => void;
  chooseOption: (id: number) => void;
};

interface ComparePlayfieldState {
  checked: number[];
}

class ComparePlayfield extends React.Component<ComparePlayfieldProps, ComparePlayfieldState> {
  constructor(props: ComparePlayfieldProps) {
    super(props);

    this.state = {
      checked: [],
    }

    this.toggleOption = this.toggleOption.bind(this);
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

  render() {
    switch (this.props.state) {
      case AppState.COMPARE:
        return (
          <List>
            {
              this.props.options.map(option =>
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

        return <>
          <span>
            Which is better after using the
            <TetrisGrid grid={getPieceGrid(this.props.activeComparison.activePiece)} blockSizeInRem={0.75} hideTopTwoRows={false} />
            piece?
          </span>
          <TetrisGrid onClick={() => this.props.chooseOption(this.props.activeComparison!.firstOption.id)} grid={firstGrid} blockSizeInRem={0.75} />
          <TetrisGrid onClick={() => this.props.chooseOption(this.props.activeComparison!.secondOption.id)} grid={secondGrid} blockSizeInRem={0.75} />
        </>;
      case AppState.COMPARE_COMPLETE:
        const preferences = PieceList.map(piece => this.props.activeComparison![piece.value]);
        console.log(preferences, this.props.activeComparison!.firstOption.id, this.props.activeComparison!.secondOption.id);
        const firstCount = preferences.filter(p => p === this.props.activeComparison!.firstOption.id).length;
        const secondCount = preferences.filter(p => p === this.props.activeComparison!.secondOption.id).length;
        if (firstCount > secondCount) {
          return 'You preferred the first option';
        } else if (firstCount === secondCount) {
          return 'You preferred them equally';
        } else {
          return 'You preferred the second option';
        }
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
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addComparison: (firstOption: number, secondOption: number) => {
    dispatch(addComparison(firstOption, secondOption));
    dispatch(setComparisonActivePiece(Piece.I));
    dispatch(setState(AppState.COMPARE_ACTIVE));
  },
  chooseOption: (id: number) => {
    dispatch(setComparisonPieceChoice(id));
    dispatch(advanceComparisonActivePiece());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ComparePlayfield);
