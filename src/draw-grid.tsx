import React from 'react';

export function drawGrid(
  grid: number[][],
  getBlock: (row: number, column: number, value: number) => (JSX.Element | null),
  onMouseLeave?: () => void) {
  return (
    <div className="grid" onMouseLeave={onMouseLeave}>
        {
          grid.map((row, rowKey) => {
            return (
              <div key={rowKey} className="row">
                {
                  // Hide the first two rows
                  rowKey >= 2 ?
                    row.map((block, blockKey) => {
                      return (
                        <div key={rowKey * 20 + blockKey} className="bit">
                          { getBlock(rowKey, blockKey, block) }
                        </div>
                      );
                    }) : null
                }
              </div>
            );
          })
        }
    </div>
  );
}