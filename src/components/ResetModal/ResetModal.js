import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { reinitializeScore } from '../../helpers/helpers';
import './ResetModal.css';

const ResetButton = props =>
  withRouter(({ history, resetScore }) => (
    <button
      className="Reset-Modal-button"
      onClick={() => {
        resetScore();
        history.push('/');
      }}
    >
      Yes
    </button>
  ))(props);

class ResetModal extends Component {
  constructor(props) {
    super(props);

    this.resetScore = this.resetScore.bind(this);
  }

  resetScore() {
    const { score, updateScore } = this.props;
    const newScore = reinitializeScore(score);
    updateScore(newScore);
    this.props.handleShowReset();
  }

  render() {
    return (
      <div className="Reset-Modal-Blackout">
        <div className="Reset-Modal-Container">
          <h4 className="Reset-Modal-Text">
            Are you sure you want to reset your score?
          </h4>
          <div className="Reset-Modal-Button-Container">
            <ResetButton resetScore={this.resetScore} />
            <button
              className="Reset-Modal-button"
              onClick={this.props.handleShowReset}
            >
              No
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ResetModal;
