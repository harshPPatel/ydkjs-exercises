import React from 'react';

import './ProgressBar.css';

const ProgressBar = props => {
  const correctWidth = Math.round(
    (100 * props.score.correct) / props.score.possible
  );
  const incorrectWidth = Math.round(
    (100 * props.score.incorrect) / props.score.possible
  );
  return (
    <div className="Progress-Bar">
      <div
        className="Correct-Segment"
        data-testid="correct"
        style={{ width: `${correctWidth}%` }}
      />
      <div
        className="Incorrect-Segment"
        data-testid="incorrect"
        style={{ width: `${incorrectWidth}%` }}
      />
    </div>
  );
};

export default ProgressBar;
