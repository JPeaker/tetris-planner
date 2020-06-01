import React, { MouseEvent } from 'react';
import classnames from 'classnames';
import '../style/App.css';
import filledGrid from './filled-grid';

interface BlockProps {
  row: number;
  column: number;
  value: number;
  nearInvisible?: boolean;
  slightlyHidden?: boolean;
  onMouseEnter?: (event: MouseEvent) => void;
  onClick?: (event: MouseEvent) => void;
}
function Block({ value, nearInvisible, slightlyHidden, row, column, onMouseEnter, onClick }: BlockProps) {
  const adjustedValue = slightlyHidden ? filledGrid[row][column] : value;
  return (
    <div
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      className={classnames({
        block: true,
        hidden: !nearInvisible && !slightlyHidden && !value,
        [`block-${adjustedValue}`]: true,
        'near-invisible': nearInvisible,
        'slightly-hidden': slightlyHidden,
      })}
    />
  );
}

export default Block;