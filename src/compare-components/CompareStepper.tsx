import React from 'react';
import '../style/App.css';
class CompareStepper extends React.Component {
  render() {
    return (
      <div className="instructions">
        <p>
          Now we need to evaluate which is the preferable stack after each placement.
        </p>
        <p>
          If we can compare each of the resulting stacks, and decide which we would prefer, we are able to calculate which option for primary and next piece is best, and so which action you should take.
        </p>
        <p>
          Click the option which has the stack that you would prefer. Do note that a stack can look worse, but you could have gained a tetris from it, which would make it more valuable.
        </p>
      </div>
    );
  }
}

export default CompareStepper;
