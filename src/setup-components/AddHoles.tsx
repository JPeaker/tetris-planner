import React, { ComponentState } from 'react';
import _ from 'lodash';
import '../style/App.css';
import { BlockProps } from '../reusable/block';
import TetrisGrid from '../reusable/tetris-grid';
import filledGrid from '../reusable/filled-grid';

interface AddHolesProps {
  grid: number[][];
  setGrid: (grid: number[][]) => void;
};

class AddHoles extends React.Component<AddHolesProps, ComponentState> {
  constructor(props: AddHolesProps) {
    super(props);

    this.state = {
      hoverBlock: null
    };

    this.setHoverBlock = this.setHoverBlock.bind(this);
    this.clickBlock = this.clickBlock.bind(this);
    this.getBlockProps = this.getBlockProps.bind(this);
  }

  setHoverBlock(row: number, column: number): void {
    this.setState({ hoverBlock: { row, column } });
  }

  clickBlock(row: number, column: number): void {
    const grid = _.cloneDeep(this.props.grid);

    if (grid[row][column] === 0) {
      grid[row][column] = filledGrid[row][column];
    } else {
      grid[row][column] = 0;
    }

    this.setState({ hoverBlock: null });
    this.props.setGrid(grid);
  }

  getBlockProps(row: number, column: number, value: number): Partial<BlockProps> {
    const { hoverBlock } = this.state;
    return {
      slightlyHidden: !!hoverBlock && hoverBlock.row === row && hoverBlock.column === column && !!this.props.grid[row][column],
      onMouseEnter: () => this.setHoverBlock(row, column),
      onClick: () => this.clickBlock(row, column),
    }
  }

  render() {
    return <TetrisGrid grid={this.props.grid} getBlockProps={this.getBlockProps} />;
  }
}

export default AddHoles;