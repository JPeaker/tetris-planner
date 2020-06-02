import React from 'react';
import Piece from '../piece-enum';
import { getMap } from './move-piece';
import Row from './row';
import { Box } from '@material-ui/core';

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
  widthInRem: number = 20,
  onMouseLeave?: () => void,
  onClick?: () => void,
  hideTopTwoRows: boolean = true,
) {
  return null;
};