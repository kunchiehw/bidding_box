import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './ScoreBlock.css';
import { bidToString, suitColor, declarerToString } from '../helper-RoomInterface';
import { DECLARERS, STANDARD_SUITS } from '../../util/util';

const propTypes = {
  scoreList: PropTypes.arrayOf(PropTypes.shape({
    bid: PropTypes.shape({
      level: PropTypes.number,
      suit: PropTypes.oneOf(STANDARD_SUITS).isRequired,
    }),
    declarer: PropTypes.oneOf(DECLARERS).isRequired,
    score: PropTypes.number.isRequired,
  })).isRequired,
};

class ScoreBlock extends PureComponent {
  render() {
    if (this.props.scoreList.length === 0) {
      return (
        <div className="score-block">
          <span style={{ fontWeight: 'bold' }}>Scores</span>
          <div>
            <span>No possible scores</span>
          </div>
        </div>
      );
    }

    const scoreCells = this.props.scoreList.map(score => (
      // TODO: find a better key
      <div key={score.score} className="score-cell">
        <span className="score-bid" style={{ color: suitColor(score.bid.suit) }} >
          {bidToString(score.bid.level, score.bid.suit)}
        </span>
        <span className="score-declarer"> {declarerToString(score.declarer)} </span>
        <span className="score-score"> {score.score} </span>
      </div>
    ));

    return (
      <div className="score-block">
        <span style={{ fontWeight: 'bold' }}>Scores</span>
        {scoreCells}
      </div>
    );
  }
}

ScoreBlock.propTypes = propTypes;

export default ScoreBlock;
