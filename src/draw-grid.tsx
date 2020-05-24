import React from 'react';
import _ from 'lodash';
import { ActivePiece } from './piece-types';
import Block from './block';
import { AppState } from './App';

export function drawGrid(
  state: AppState,
  currentPiece: ActivePiece | null,
  grid: number[][],
  hoverBlock: { row: number, column: number } | null,
  setHoverBlock: (row: number, column: number) => void,
  clickBlock: (row: number, column: number) => void,
) {
  const showHoverState = state === AppState.PLACE;
  const drawnGrid: number[][] = _.cloneDeep(grid);

  if (currentPiece) {
    currentPiece.blocks.forEach(block => {
      drawnGrid[block.row][block.column] = block.value;
    });
  }

  return (
    <div className="grid">
        {
          drawnGrid.map((row, rowKey) => {
            return (
              <div key={rowKey} className="row">
                {
                  // Hide the first two rows
                  rowKey >= 2 ?
                    row.map((block, blockKey) => {
                      const showHover = showHoverState && !!hoverBlock && rowKey > hoverBlock.row && blockKey === hoverBlock.column;
                      const hoverMouseEnter = showHoverState ? () => setHoverBlock(rowKey, blockKey) : undefined;
                      const hoverClick = showHoverState ? () => clickBlock(rowKey, blockKey) : undefined;
                      return (
                        <div key={rowKey * 20 + blockKey} className="bit">
                          <Block
                            value={block}
                            showHover={showHover}
                            row={rowKey}
                            column={blockKey}
                            onMouseEnter={hoverMouseEnter}
                            onClick={hoverClick}
                          />
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