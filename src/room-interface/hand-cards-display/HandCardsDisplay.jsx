import React from 'react';
import PropTypes from 'prop-types';
import './HandCardsDisplay.css';
import { SEATS } from '../../util/util';

const propTypes = {
  // TODO: Make more specific validator
  eastHand: PropTypes.arrayOf(PropTypes.string).isRequired,
  westHand: PropTypes.arrayOf(PropTypes.string).isRequired,
  seat: PropTypes.oneOf(SEATS).isRequired,
  endBidSequence: PropTypes.bool.isRequired,
};

function HandCardsDisplay(props) {
  const eastCards = 'EAST\n' +
    `\u2660: ${props.eastHand[0]}\n` +
    `\u2665: ${props.eastHand[1]}\n` +
    `\u2666: ${props.eastHand[2]}\n` +
    `\u2663: ${props.eastHand[3]}\n`;

  const westCards = 'WEST\n' +
    `\u2660: ${props.westHand[0]}\n` +
    `\u2665: ${props.westHand[1]}\n` +
    `\u2666: ${props.westHand[2]}\n` +
    `\u2663: ${props.westHand[3]}\n`;

  const westCSS = `hand-cards-display-cell west-hand-cell${
    (props.seat !== 'WEST' && !props.endBidSequence) ? ' hidden-hand-cell' : ''}`;

  const eastCSS = `hand-cards-display-cell east-hand-cell${
    (props.seat !== 'EAST' && !props.endBidSequence) ? ' hidden-hand-cell' : ''}`;

  return (
    <div className="hand-cards-display-block">
      <div className={westCSS}>{westCards}</div>
      <div className={eastCSS}>{eastCards}</div>
    </div>
  );
}

HandCardsDisplay.propTypes = propTypes;

export default HandCardsDisplay;
