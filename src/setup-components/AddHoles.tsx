import React, { ComponentState } from 'react';
import _ from 'lodash';
import '../style/App.css';
import { drawGrid } from '../reusable/draw-grid';
import Block from '../reusable/block';

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
  }

  setHoverBlock(row: number, column: number): void {
    this.setState({ hoverBlock: { row, column } });
  }

  clickBlock(row: number, column: number): void {
    const grid = _.cloneDeep(this.props.grid);
    grid[row][column] = 0;

    this.setState({ hoverBlock: null });
    this.props.setGrid(grid);
  }

  render() {
    return (
      <>
        {
          drawGrid(this.props.grid, (row: number, column: number, value: number) => {
            const { hoverBlock } = this.state;

            return (
              <Block
                row={row}
                column={column}
                value={value}
                slightlyHidden={!!hoverBlock && hoverBlock.row === row && hoverBlock.column === column && !!this.props.grid[row][column]}
                onMouseEnter={() => this.setHoverBlock(row, column)}
                onClick={() => this.clickBlock(row, column)}
              />
            );
          })
        }
      </>
    );
  }
}

export default AddHoles;
