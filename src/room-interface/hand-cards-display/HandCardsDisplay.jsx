import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Segment, Divider } from 'semantic-ui-react';
import './HandCardsDisplay.css';
import { suitChar, bidColor } from '../helper';
import { PARTICIPANTS_ROLE } from '../../util/util';

function generateIDCell(role, partipantsID) {
  const idString = `${role} : ${partipantsID}`;
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
          {generateSuitCell('SPADES', handCards.SPADES)}
          {generateSuitCell('HEARTS', handCards.HEARTS)}
          {generateSuitCell('DIAMONDS', handCards.DIAMONDS)}
          {generateSuitCell('CLUBS', handCards.CLUBS)}
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
    <Segment className="hand-cards-display-cell">
      {generateIDCell(role, partipantsID)}
      <Divider />
      {generateCardsCell(handCards, shouldDisplay)}
    </Segment>
  );
}

const propTypes = {
  role: PropTypes.oneOf(PARTICIPANTS_ROLE).isRequired,
  // TODO: Make more specific validator
  eastHand: PropTypes.shape({
    SPADES: PropTypes.string.isRequired,
    HEARTS: PropTypes.string.isRequired,
    DIAMONDS: PropTypes.string.isRequired,
    CLUBS: PropTypes.string.isRequired,
  }).isRequired,
  westHand: PropTypes.shape({
    SPADES: PropTypes.string.isRequired,
    HEARTS: PropTypes.string.isRequired,
    DIAMONDS: PropTypes.string.isRequired,
    CLUBS: PropTypes.string.isRequired,
  }).isRequired,
  eastID: PropTypes.string.isRequired,
  westID: PropTypes.string.isRequired,
  endBidSequence: PropTypes.bool.isRequired,
};

function HandCardsDisplay(props) {
  const shouldDisplayWest = (props.role === 'WEST' || props.role === 'OBSERVER' || props.endBidSequence);
  const shouldDisplayEast = (props.role === 'EAST' || props.role === 'OBSERVER' ||
    props.role === 'ALL_SEATS' || props.endBidSequence);

  return (
    <Grid className="hand-cards-display-block" columns="equal">
      <Grid.Column>
        {generateCardsAndIDCell('WEST', props.westID, props.westHand, shouldDisplayWest)}
      </Grid.Column>
      <Grid.Column>
        {generateCardsAndIDCell('EAST', props.eastID, props.eastHand, shouldDisplayEast)}
      </Grid.Column>
    </Grid>
  );
}

HandCardsDisplay.propTypes = propTypes;

export default HandCardsDisplay;
