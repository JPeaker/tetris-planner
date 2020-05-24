import React from 'react';
import classnames from 'classnames';

import './App.css';

function Block({ value }) {
  return (
    <div className={classnames({ block: true, hidden: !value, [`block-${value}`]: true })} />
  );
}

export default Block;
