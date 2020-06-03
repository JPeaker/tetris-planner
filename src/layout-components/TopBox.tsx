import React from 'react';
import '../style/App.css';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { Tabs, Tab, Theme, makeStyles } from '@material-ui/core';
import { getAppStateCategory, AppStateCategory, AppState, OptionState } from '../store/types';
import { setState } from '../store/actions';
import { Dispatch } from 'redux';

interface TopBoxProps {
  category: AppStateCategory;
  optionsDisabled: boolean;
  compareDisabled: boolean;
  goToCategory: (category: AppStateCategory) => void;
};

class TopBox extends React.Component<TopBoxProps> {
  render() {
    return (
      <Tabs variant="fullWidth" width="10rem" value={this.props.category} className="top-box">
        <Tab
          value={AppStateCategory.SETUP}
          onClick={() => this.props.goToCategory(AppStateCategory.SETUP)} label="SETUP"
        />
        <Tab
          value={AppStateCategory.OPTIONS}
          onClick={() => this.props.goToCategory(AppStateCategory.OPTIONS)} label="SIMULATE"
          disabled={this.props.optionsDisabled}
        />
        <Tab
          value={AppStateCategory.COMPARE}
          onClick={() => this.props.goToCategory(AppStateCategory.COMPARE)} label="COMPARE"
          disabled={this.props.compareDisabled}
        />
      </Tabs>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  category: getAppStateCategory(state.state),
  optionsDisabled: state.grid === null || state.primaryPiece === null || state.nextPiece === null,
  compareDisabled: state.options.length < 2 || state.options.some(option => option.state !== OptionState.DONE),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  goToCategory: (category: AppStateCategory) => {
    switch(category) {
      case AppStateCategory.SETUP:
        dispatch(setState(AppState.SETUP_GRID));
        break;
      case AppStateCategory.OPTIONS:
        dispatch(setState(AppState.OPTIONS_SUMMARIZE));
        break;
      case AppStateCategory.COMPARE:
        dispatch(setState(AppState.COMPARE));
        break;
    }
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(TopBox);
