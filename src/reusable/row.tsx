import React, { MouseEvent } from 'react';
import '../style/Block.css';

interface RowProps {
  rowKey: number;
  blocks: number[];
  getBlock: (row: number, column: number, value: number) => JSX.Element;
}
function Row({ rowKey, blocks, getBlock }: RowProps) {
  return (
    <div className="row">
      {
        blocks.map((block, blockIndex) => React.cloneElement(getBlock(rowKey, blockIndex, block), {
          row: rowKey,
          column: blockIndex,
          value: block,
          width: blocks.length ? `${100 / blocks.length}%` : 'auto'
        }))
      }
    </div>
  );
}

export default Row;
