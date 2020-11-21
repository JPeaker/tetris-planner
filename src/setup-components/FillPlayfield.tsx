import React from 'react';
import _ from 'lodash';
import '../style/App.css';
import { Grid, BlockProps, filledGrid, setUpPasting, TetrisGrid } from 'nes-tetris-representation';

interface FillPlayfieldProps {
  grid: Grid;
  setGrid: (grid: Grid) => void;
};

interface ComponentState {
  hoverBlock: { row: number, column: number } | null,
};

class FillPlayfield extends React.Component<FillPlayfieldProps, ComponentState> {
  constructor(props: FillPlayfieldProps) {
    super(props);

    this.state = {
      hoverBlock: null,
    };

    this.setHoverBlock = this.setHoverBlock.bind(this);
    this.clickBlock = this.clickBlock.bind(this);
    this.getBlockProps = this.getBlockProps.bind(this);

  }

  componentDidMount() {
    const callback = (board: Grid) => this.props.setGrid(board);

    setUpPasting(
      document.getElementById('paste-area') as HTMLDivElement,
      document.getElementById('pasted-image') as HTMLImageElement,
      document.getElementById('dummy-canvas') as HTMLCanvasElement,
      callback,
    );
  }

  setHoverBlock(row: number, column: number): void {
    this.setState({ hoverBlock: { row, column } });
  }

  clickBlock(row: number, column: number): void {
    const grid = _.cloneDeep(this.props.grid);

    for (var i = 0; i < 22; i++) {
      if (i >= row) {
        grid[i][column] = filledGrid[i][column];
      } else {
        grid[i][column] = 0;
      }
    }

    this.setState({ hoverBlock: null });
    this.props.setGrid(grid);
  }

  getBlockProps(row: number, column: number, value: number): Partial<BlockProps> {
    const { hoverBlock } = this.state;
    const slightlyHidden = !!hoverBlock && row >= hoverBlock.row && column === hoverBlock.column;
    const nearInvisible = !!hoverBlock && row < hoverBlock.row && column === hoverBlock.column;
    return {
      slightlyHidden,
      nearInvisible,
      onMouseEnter: () => this.setHoverBlock(row, column),
      onClick: () => this.clickBlock(row, column)
    };
  }

  render() {
    return <>
      <input className="paste-box" id="paste-area" placeholder="Paste screenshot here" />
      <img alt="" id="pasted-image" style={{ display: 'none' }} />
      <canvas id="dummy-canvas" style={{ display: 'none' }} />
      <TetrisGrid
        grid={this.props.grid}
        getBlockProps={this.getBlockProps}
        onMouseLeave={() => this.setState({ hoverBlock: null })}
      />
    </>;
  }
}

export default FillPlayfield;
