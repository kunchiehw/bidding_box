import React from 'react';
import PropTypes from 'prop-types';
import './ScoreBlock.css';
import { suitBidToString, bidColor, declarerToString } from '../helper';
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

function generateScoreCell(score, index) {
  return (
    <div key={index} className="score-cell">
      <span className="score-bid" style={{ color: bidColor(score.bid.suit) }} > {suitBidToString(score.bid)} </span>
      <span className="score-declarer"> {declarerToString(score.declarer)} </span>
      <span className="score-score"> {score.score} </span>
    </div>
  );
}

function ScoreBlock(props) {
  const scoreCells = [];

  for (let scoreIndex = 0; scoreIndex < props.scoreList.length; scoreIndex += 1) {
    scoreCells.push(generateScoreCell(props.scoreList[scoreIndex], scoreIndex));
  }
  if (scoreCells.length === 0) {
    return (
      <div className="score-block">
        <span style={{ fontWeight: 'bold' }}>Scores</span>
        <div>
          <span>No possible scores</span>
        </div>
      </div>
    );
  }

  return (
    <div className="score-block">
      <span style={{ fontWeight: 'bold' }}>Scores</span>
      {scoreCells}
    </div>
  );
}

ScoreBlock.propTypes = propTypes;

export default ScoreBlock;
