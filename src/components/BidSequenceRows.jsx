import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Segment } from 'semantic-ui-react';
import { SEATS, STANDARD_SUITS, ALL_SUITS } from '..//utils/constants';
import { bidToString, suitColor } from '../utils/helpers';
import { levelValidator } from '../utils/validators';

const propTypes = {
  dealer: PropTypes.oneOf(SEATS).isRequired,
  bidSeq: PropTypes.arrayOf(PropTypes.shape({
    level: levelValidator.isRequired,
    suit: PropTypes.oneOf(ALL_SUITS).isRequired,
  })).isRequired,
};

function BidSequenceRows(props) {
  const bidSequenceRows = [];
  let bidSequenceRow = [];
  let bidSequenceRowIndex = 0;

  // Generate empty cells first when the dealer is not WEST (the left most player).
  for (let seatIndex = 0; seatIndex < SEATS.length; seatIndex += 1) {
    if (props.dealer !== SEATS[seatIndex]) {
      bidSequenceRow.push((
        <Grid.Column key={SEATS[seatIndex]}>
          <Segment className="bid-sequence-cell empty-cell">
            Empty
          </Segment>
        </Grid.Column>
      ));
    } else {
      break;
    }
  }

  for (let bidSeqIndex = 0; bidSeqIndex < props.bidSeq.length; bidSeqIndex += 1) {
    const bid = props.bidSeq[bidSeqIndex];
    if (STANDARD_SUITS.includes(bid.suit)) {
      bidSequenceRow.push((
        <Grid.Column key={bidSeqIndex}>
          <Segment className="bid-sequence-cell" color={suitColor(bid.suit)} inverted>
            {bidToString(bid.level, bid.suit)}
          </Segment>
        </Grid.Column>
      ));
    } else {
      bidSequenceRow.push((
        <Grid.Column key={bidSeqIndex} >
          <Segment className={`bid-sequence-cell ${bid.suit}-cell`}>
            {bidToString(bid.level, bid.suit)}
          </Segment>
        </Grid.Column>
      ));
    }
    if (bidSequenceRow.length === 4) {
      bidSequenceRows.push((
        <Grid.Row key={bidSequenceRowIndex} className="bid-sequence-row" column={4}>
          {bidSequenceRow}
        </Grid.Row>
      ));
      bidSequenceRow = [];
      bidSequenceRowIndex += 1;
    }
  }

  bidSequenceRows.push((
    <Grid.Row key={bidSequenceRowIndex} className="bid-sequence-row" column={4}>
      {bidSequenceRow}
    </Grid.Row>
  ));

  return bidSequenceRows;
}

BidSequenceRows.propTypes = propTypes;

export default BidSequenceRows;
