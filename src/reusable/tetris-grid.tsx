import Row from './row';
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
    <div style={{ height: `${rowHeight}rem`, width: `${width}rem` }} onMouseLeave={onMouseLeave}>
      {
        grid.map((row, rowKey) => {
          return hideTopRows && rowKey < 2
            ? null
            : <Row key={rowKey} rowKey={rowKey} blocks={row} getBlock={getBlock} />
        })
      }
    </div>
  );
}

export default TetrisGrid;