import React from 'react';
import Piece from './piece-enum';
import { getMap } from './move-piece';

export function getPieceGrid(piece: Piece): number[][] {
  const pieceGrid = getMap[piece](0, 0, 0);
    const rows = pieceGrid.blocks.map(block => block.row);
    const columns = pieceGrid.blocks.map(block => block.column);

    const minRow = Math.min(...rows);
    const maxRow = Math.max(...rows);
    const minColumn = Math.min(...columns);
    const maxColumn = Math.max(...columns);
    const grid: number[][] = [];

    for (var i = 0; i <= maxRow - minRow; i++) {
      const row: number[] = [];
      for (var j = 0; j <= maxColumn - minColumn; j++) {
        row.push(0);
      }
      grid.push(row);
    }

    pieceGrid.blocks.forEach(block => {
      if (block.value) {
        grid[block.row - minRow][block.column - minColumn] = block.value;
      }
    });
    return grid;
}

export function drawGrid(
  grid: number[][],
  getBlock: (row: number, column: number, value: number) => (JSX.Element | null),
  onMouseLeave?: () => void,
  onClick?: () => void,
  className?: string,
  hideTopTwoRows: boolean = true) {
    return (
      <div className={`grid ${className || ''}`} onMouseLeave={onMouseLeave} onClick={onClick}>
        {
          grid.map((row, rowKey) => {
            return hideTopTwoRows && rowKey < 2 ? null : (
              <div key={rowKey} className={`row row-${row.length}`}>
                {
                  row.map((block, blockKey) => {
                    return (
                      <div key={rowKey * grid.length + blockKey} className="bit">
                        { getBlock(rowKey, blockKey, block) }
                      </div>
                    );
                  })
                }
              </div>
            );
          })
        }
    </div>
  );
}