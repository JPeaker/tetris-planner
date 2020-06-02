import Row from './row';
import { Box } from '@material-ui/core';
import React from 'react';
import '../style/Block.css';

interface TetrisGridProps {
  grid: number[][];
  getBlock: (row: number, column: number, value: number) => JSX.Element;
  widthInRem?: number;
  onMouseLeave?: () => void;
  hideTopTwoRows?: boolean;
}
function TetrisGrid({ grid, widthInRem, onMouseLeave, getBlock, hideTopTwoRows }: TetrisGridProps) {
  const width = widthInRem || 20;
  const hideTopRows = hideTopTwoRows === undefined ? true : hideTopTwoRows;
  const numberOfColumns = Math.max(...grid.map(row => row.length));
  const rowHeight = width / numberOfColumns;
  return (
    <Box height={`${rowHeight}rem`} width={`${width}rem`} onMouseLeave={onMouseLeave}>
      {
        grid.map((row, rowKey) => {
          return hideTopRows && rowKey < 2
            ? null
            : <Row key={rowKey} rowKey={rowKey} blocks={row} getBlock={getBlock} />
        })
      }
    </Box>
  );
}

export default TetrisGrid;