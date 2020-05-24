import React from 'react';
import classnames from 'classnames';
import './style/App.css';

function Block({ value }: { value: number }) {
  return (
    <div className={classnames({ block: true, hidden: !value, [`block-${value}`]: true })} />
  );
}

export default Block;
