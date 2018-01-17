import React from 'react';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';
import { bidToString, suitColor } from '../helper-RoomInterface';
import { SEATS, STANDARD_SUITS, ALL_SUITS } from '../../util/util';

const propTypes = {
  dealer: PropTypes.oneOf(SEATS).isRequired,
  bidSeq: PropTypes.arrayOf(PropTypes.shape({
    level: PropTypes.number,
    suit: PropTypes.oneOf(ALL_SUITS).isRequired,
  })).isRequired,
};

function BidSequenceBlock(props) {
  const bidSequenceRows = [];
  let bidSequenceRow = [];
  let bidSequenceRowIndex = 0;

  // Generate empty cells first when the dealer is not WEST (the left most player).
  for (let seatIndex = 0; seatIndex < SEATS.length; seatIndex += 1) {
    if (props.dealer !== SEATS[seatIndex]) {
      bidSequenceRow.push(<Segment key={SEATS[seatIndex]} className="bid-sequence-cell empty-cell"> Empty </Segment>);
    } else {
      break;
    }
  }

  for (let bidSeqIndex = 0; bidSeqIndex < props.bidSeq.length; bidSeqIndex += 1) {
    const bid = props.bidSeq[bidSeqIndex];
    if (STANDARD_SUITS.includes(bid.suit)) {
      bidSequenceRow.push(<Segment key={bidSeqIndex} className="bid-sequence-cell" color={suitColor(bid.suit)} inverted> {bidToString(bid.level, bid.suit)} </Segment>);
    } else {
      bidSequenceRow.push(<Segment key={bidSeqIndex} className={`bid-sequence-cell ${bid.suit}-cell`}> {bidToString(bid.level, bid.suit)} </Segment>);
    }
    if (bidSequenceRow.length === 4) {
      bidSequenceRows.push(<div key={bidSequenceRowIndex} className="bid-sequence-row"> {bidSequenceRow} </div>);
      bidSequenceRow = [];
      bidSequenceRowIndex += 1;
    }
  }

  bidSequenceRows.push(<div key={bidSequenceRowIndex} className="bid-sequence-row"> {bidSequenceRow} </div>);

  return (
    <div className="bid-sequence-block">
      {bidSequenceRows}
    </div>
  );
}

BidSequenceBlock.propTypes = propTypes;

export default BidSequenceBlock;
