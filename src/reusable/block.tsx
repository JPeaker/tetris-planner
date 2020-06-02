import React, { MouseEvent } from 'react';
import classnames from 'classnames';
import '../style/Block.css';
import filledGrid from './filled-grid';
import { Box } from '@material-ui/core';

interface BlockProps {
  row: number;
  column: number;
  value: number;
  width?: string;
  disabled?: boolean;
  nearInvisible?: boolean;
  slightlyHidden?: boolean;
  onMouseEnter?: (event: MouseEvent) => void;
  onClick?: (event: MouseEvent) => void;
}
function Block({ value, nearInvisible, slightlyHidden, row, column, onMouseEnter, onClick, disabled, width }: BlockProps) {
  const adjustedValue = slightlyHidden ? filledGrid[row][column] : value;
  return (
    <Box
      key={column}
      width={width}
      height="100%"
      onMouseEnter={onMouseEnter}
      onClick={disabled ? () => {} : onClick}
      className={classnames({
        block: true,
        hidden: !nearInvisible && !slightlyHidden && !value,
        [`block-${adjustedValue}`]: true,
        'near-invisible': nearInvisible,
        'slightly-hidden': slightlyHidden || disabled,
      })}
    />
  );
}

export default Block;
