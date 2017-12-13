import React from 'react';
import PropTypes from 'prop-types';
import './HandCardsDisplay.css';
import { suitChar, bidColor } from '../helper';
import { PARTICIPANTS_ROLE } from '../../util/util';

function generateIDCell(role, partipantsID) {
  const idString = `${role}\n${partipantsID}`;
  return (
    <div className="id-cell">{idString}</div>
  );
}

function generateSuitCell(suit, handCard) {
  return (
    <div>
      <span style={{ color: bidColor(suit) }}> {suitChar(suit)} </span>
      <span> {handCard} </span>
    </div>
  );
}

function generateCardsCell(handCards, shouldDisplay) {
  if (shouldDisplay) {
    return (
      <div className="card-cell">
        <div className="card-cell-content">
          {generateSuitCell('SPADES', handCards[0])}
          {generateSuitCell('HEARTS', handCards[1])}
          {generateSuitCell('DIAMONDS', handCards[2])}
          {generateSuitCell('CLUBS', handCards[3])}
        </div>
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
  const shouldDisplayEast = (props.role === 'EAST' || props.role === 'OBSERVER' ||
    props.role === 'ALL_SEATS' || props.endBidSequence);

  return (
    <div className="hand-cards-display-block">
      {generateCardsAndIDCell('WEST', props.westID, props.westHand, shouldDisplayWest)}
      {generateCardsAndIDCell('EAST', props.eastID, props.eastHand, shouldDisplayEast)}
    </div>
  );
}

HandCardsDisplay.propTypes = propTypes;

export default HandCardsDisplay;
