import React, { ComponentState } from 'react';
import _ from 'lodash';
import './style/App.css';
import { drawSetupPlayfield } from './draw-grid';
import filledGrid from './filled-grid';

interface FillHolesProps {
  grid: number[][];
  setGrid: (grid: number[][]) => void;
};

class FillHoles extends React.Component<FillHolesProps, ComponentState> {
  constructor(props: FillHolesProps) {
    super(props);

    this.state = {
      hoverBlock: null
    };

    this.setHoverBlock = this.setHoverBlock.bind(this);
    this.clickBlock = this.clickBlock.bind(this);
  }

  setHoverBlock(row: number, column: number): void {
    this.setState({ hoverBlock: { row, column } });
  }

  clickBlock(row: number, column: number): void {
    const grid = _.cloneDeep(this.props.grid);
    grid[row][column] = 0;
    for (var i = 0; i < 22; i++) {
      if (i > row) {
        grid[i][column] = filledGrid[i][column];
      } else {
        grid[i][column] = 0;
      }
    }

    this.setState({ hoverBlock: null });
    this.props.setGrid(grid);
  }

  render() {
    return (
      <>
        { drawSetupPlayfield(this.props.grid, this.state.hoverBlock, this.setHoverBlock, this.clickBlock) }
      </>
    );
  }
}

export default FillHoles;
