import React, { MouseEvent } from 'react';
import classnames from 'classnames';
import './style/App.css';
import filledGrid from './filled-grid';

interface BlockProps {
  row: number;
  column: number;
  value: number;
  showHover?: boolean;
  onMouseEnter?: (event: MouseEvent) => void;
  onClick?: (event: MouseEvent) => void;
}
function Block({ value, showHover, row, column, onMouseEnter, onClick }: BlockProps) {
  const adjustedValue = showHover ? filledGrid[row][column] : value;
  return (
    <div
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      className={classnames({
        block: true,
        hidden: !showHover && !value,
        [`block-${adjustedValue}`]: true,
        'show-hover': showHover
      })}
    />
  );
}

export default Block;
