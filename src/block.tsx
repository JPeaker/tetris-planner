import React, { MouseEvent } from 'react';
import classnames from 'classnames';
import './style/App.css';
import filledGrid from './filled-grid';

interface BlockProps {
  value: number;
  showHover: boolean;
  row: number;
  column: number;
  onMouseEnter: ((event: MouseEvent) => void) | undefined;
  onClick: ((event: MouseEvent) => void) | undefined;
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
