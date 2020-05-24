import React from 'react';
import _ from 'lodash';
import './style/App.css';
import { drawSetupPlayfield } from './draw-grid';
import filledGrid from './filled-grid';

interface SetupPlayfieldProps {
  grid: number[][];
  setGrid: (grid: number[][]) => void;
};

interface ComponentState {
  hoverBlock: { row: number, column: number } | null,
};

class SetupPlayfield extends React.Component<SetupPlayfieldProps, ComponentState> {
  constructor(props: SetupPlayfieldProps) {
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
        <div>
          {
            drawSetupPlayfield(this.props.grid, this.state.hoverBlock, this.setHoverBlock, this.clickBlock)
          }
        </div>
      </>
    );
  }
}

export default SetupPlayfield;
