import React from 'react';
import _ from 'lodash';
import { ActivePiece } from './piece-types';
import Block from './block';
import { AppState } from './App';

export function drawSetupPlayfield(
  grid: number[][],
  hoverBlock: { row: number, column: number } | null,
  setHoverBlock: (row: number, column: number) => void,
  clickBlock: (row: number, column: number) => void,
) {
  return drawGrid(
    AppState.FILL_COLUMNS,
    null,
    grid,
    hoverBlock,
    setHoverBlock,
    clickBlock);
}

export function drawPlacePieces(
  grid: number[][],
  currentPiece: ActivePiece | null
) {
  return drawGrid(
    AppState.SET_PIECES,
    currentPiece,
    grid,
    null,
    undefined,
    undefined,
  );
}

function drawGrid(
  state: AppState,
  currentPiece: ActivePiece | null,
  grid: number[][],
  hoverBlock: { row: number, column: number } | null,
  setHoverBlock: ((row: number, column: number) => void) | undefined,
  clickBlock: ((row: number, column: number) => void) | undefined,
) {
  const showHoverState = state === AppState.FILL_COLUMNS;
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
                      return (
                        <div key={rowKey * 20 + blockKey} className="bit">
                          <Block
                            value={block}
                            showHover={showHover}
                            row={rowKey}
                            column={blockKey}
                            onMouseEnter={setHoverBlock && (() => setHoverBlock(rowKey, blockKey))}
                            onClick={clickBlock && (() => clickBlock(rowKey, blockKey))}
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