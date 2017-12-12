import React from 'react';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';
import { suitBidToString, otherBidToString, bidColor } from '../helper';
import { SEATS, SUITS, NON_SUITS } from '../../util/util';

const propTypes = {
  dealer: PropTypes.oneOf(SEATS).isRequired,
  bidSeq: PropTypes.arrayOf(PropTypes.shape({
    level: PropTypes.number,
    suit: PropTypes.oneOf(SUITS.concat(NON_SUITS)).isRequired,
  })).isRequired,
};

function BidCell(bid, bidIndex) {
  const cssString = 'bid-sequence-display-cell bid-cell';

  if (!bid) {
    return (<div key={bidIndex} className={`${cssString} empty-cell`} > Empty </div>);
  }

  if (!bid.level) {
    return (
      <Segment key={bidIndex} className={cssString} size="small" color={bidColor(bid.suit)} inverted>
        {otherBidToString(bid.suit)}
      </Segment>
    );
  }

  return (
    <Segment key={bidIndex} className={cssString} size="small" color={bidColor(bid.suit)} inverted>
      {suitBidToString(bid)}
    </Segment>
  );
}

function BidBlock(props) {
  const bidRows = [];
  let bidRow = [];

  switch (props.dealer) {
    case 'SOUTH':
      bidRow.push(BidCell(null, -3));
      bidRow.push(BidCell(null, -2));
      bidRow.push(BidCell(null, -1));
      break;
    case 'EAST':
      bidRow.push(BidCell(null, -2));
      bidRow.push(BidCell(null, -1));
      break;
    case 'NORTH':
      bidRow.push(BidCell(null, -1));
      break;
    default:
      break;
  }

  for (let bidIndex = 0; bidIndex < props.bidSeq.length; bidIndex += 1) {
    bidRow.push(BidCell(props.bidSeq[bidIndex], bidIndex));
    if (bidRow.length === 4) {
      bidRows.push(<div key={bidIndex} className="display-bid-row"> {bidRow} </div>);
      bidRow = [];
    }
  }

  bidRows.push(<div key="last" className="display-bid-row"> {bidRow} </div>);

  return (
    <div className="display-bid-panel">
      {bidRows}
    </div>
  );
}

BidBlock.propTypes = propTypes;

export default BidBlock;
