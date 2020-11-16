import React from 'react';
import _ from 'lodash';
import '../style/App.css';
import filledGrid from '../reusable/filled-grid';
import TetrisGrid from '../reusable/tetris-grid';
import { BlockProps } from '../reusable/block';
import { Grid } from 'nes-tetris-representation/lib/piece-types';
import PasteHandler from 'nes-tetris-representation/lib/paste-handler';

interface FillPlayfieldProps {
  grid: Grid;
  setGrid: (grid: Grid) => void;
};

interface ComponentState {
  hoverBlock: { row: number, column: number } | null,
  pasteHandler: PasteHandler | null,
};

class FillPlayfield extends React.Component<FillPlayfieldProps, ComponentState> {
  constructor(props: FillPlayfieldProps) {
    super(props);

    this.state = {
      hoverBlock: null,
      pasteHandler: null,
    };

    this.setHoverBlock = this.setHoverBlock.bind(this);
    this.clickBlock = this.clickBlock.bind(this);
    this.getBlockProps = this.getBlockProps.bind(this);

  }

  componentDidMount() {
    const pasteHandler = new PasteHandler('paste-area', 'pasted-image', 'dummy-canvas');
    const callback = (board: Grid) => this.props.setGrid(board);
    pasteHandler.setUpPasteability(callback);

    this.setState({ pasteHandler });
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
      <img id="pasted-image" style={{ display: 'none' }} />
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
