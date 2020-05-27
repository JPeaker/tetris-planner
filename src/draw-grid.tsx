import React from 'react';

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