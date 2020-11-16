import { Grid } from 'nes-tetris-representation/lib/piece-types';
import React from 'react';
import '../style/Block.css';
import Block, { BlockProps } from './block';

type GetBlockFunction = (row: number, column: number, value: number) => Partial<BlockProps>;

interface TetrisGridProps {
  grid: Grid;
  beforeGrid?: Grid | null;
  getBlockProps?: GetBlockFunction;
  blockSizeInRem?: number;
  onClick?: () => void;
  onMouseLeave?: () => void;
  className?: string;
  hideTopTwoRows?: boolean;
}

function getRow(row: number, blocks: number[], beforeBlocks: number[] | null, blockSizeInRem: number, getBlockProps: GetBlockFunction | undefined) {
  const width = blocks.length ? `${100 / blocks.length}%` : 'auto';
  return (
    <div className="row" key={row} style={{ height: `${blockSizeInRem}rem` }}>
      {
        blocks.map((block, blockIndex) =>
          <Block
            key={row * 20 + blockIndex}
            row={row}
            column={blockIndex}
            value={block}
            width={width}
            showDiff={!!beforeBlocks && !!block && !beforeBlocks[blockIndex]}
            {...(getBlockProps === undefined ? undefined : getBlockProps(row, blockIndex, block))}
          />)
      }
    </div>
  );
}

function TetrisGrid({ grid, beforeGrid = null, blockSizeInRem = 2, onClick, onMouseLeave, getBlockProps, hideTopTwoRows = true, className }: TetrisGridProps) {
  const numberOfRows = grid.length - (hideTopTwoRows ? 2 : 0);
  const numberOfColumns = Math.max(...grid.map(row => row.length));
  const width = blockSizeInRem * numberOfColumns;
  const height = blockSizeInRem * numberOfRows;
  return (
    <div style={{ height: `${height}rem`, width: `${width}rem`, margin: 'auto' }} onClick={onClick} onMouseLeave={onMouseLeave} className={className}>
      {
        grid.map((row, rowKey) => {
          return hideTopTwoRows && rowKey < 2
            ? null
            : getRow(rowKey, row, beforeGrid ? beforeGrid[rowKey] : null, blockSizeInRem, getBlockProps)
        })
      }
    </div>
  );
}

export default TetrisGrid;