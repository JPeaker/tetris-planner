import React from 'react';

export function drawGrid(
  grid: number[][],
  getBlock: (row: number, column: number, value: number) => (JSX.Element | null),
  onMouseLeave?: () => void,
  hideTopTwoRows: boolean = true) {
    return (
      <div className="grid" onMouseLeave={onMouseLeave}>
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