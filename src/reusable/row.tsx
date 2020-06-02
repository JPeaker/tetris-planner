import React, { MouseEvent } from 'react';
import '../style/Block.css';
import { Box } from '@material-ui/core';

interface RowProps {
  rowKey: number;
  blocks: number[];
  getBlock: (row: number, column: number, value: number) => JSX.Element;
}
function Row({ rowKey, blocks, getBlock }: RowProps) {
  return (
    <Box width="100%" height="100%">
      {
        blocks.map((block, blockIndex) => React.cloneElement(getBlock(rowKey, blockIndex, block), {
          row: rowKey,
          column: blockIndex,
          value: block,
          width: blocks.length ? `${100 / blocks.length}%` : 'auto'
        }))
      }
    </Box>
  );
}

export default Row;
