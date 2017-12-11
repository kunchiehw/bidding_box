import React from 'react';
import PropTypes from 'prop-types';
import './HandCardsDisplay.css';
import { PARTICIPANTS_ROLE } from '../../util/util';

function generateIDCell(role, partipantsID) {
  const idString = `${role}\n${partipantsID}`;
  return (
    <div className="id-cell">{idString}</div>
  );
}

function generateCardsCell(handCards, shouldDisplay) {
  if (shouldDisplay) {
    const cardString =
      `\u2660: ${handCards[0]}\n` +
      `\u2665: ${handCards[1]}\n` +
      `\u2666: ${handCards[2]}\n` +
      `\u2663: ${handCards[3]}\n`;
    return (
      <div className="card-cell">
        <div className="card-cell-content">{cardString}</div>
      </div>
    );
  }

  return (
    <div className="card-cell">
      <div className="waiting-cell-content">Waiting...</div>
    </div>
  );
}

function generateCardsAndIDCell(role, partipantsID, handCards, shouldDisplay) {
  return (
    <div className="hand-cards-display-cell">
      {generateIDCell(role, partipantsID)}
      {generateCardsCell(handCards, shouldDisplay)}
    </div>
  );
}

const propTypes = {
  role: PropTypes.oneOf(PARTICIPANTS_ROLE).isRequired,
  // TODO: Make more specific validator
  eastHand: PropTypes.arrayOf(PropTypes.string).isRequired,
  westHand: PropTypes.arrayOf(PropTypes.string).isRequired,
  eastID: PropTypes.string.isRequired,
  westID: PropTypes.string.isRequired,
  endBidSequence: PropTypes.bool.isRequired,
};

function HandCardsDisplay(props) {
  const shouldDisplayWest = (props.role === 'WEST' || props.role === 'OBSERVER' || props.endBidSequence);
  const shouldDisplayEast = (props.role === 'EAST' || props.role === 'OBSERVER' || props.endBidSequence);

  return (
    <div className="hand-cards-display-block">
      {generateCardsAndIDCell('WEST', props.westID, props.westHand, shouldDisplayWest)}
      {generateCardsAndIDCell('EAST', props.eastID, props.eastHand, shouldDisplayEast)}
    </div>
  );
}

HandCardsDisplay.propTypes = propTypes;

export default HandCardsDisplay;
