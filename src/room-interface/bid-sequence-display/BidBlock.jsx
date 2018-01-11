import React from 'react';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';
import { bidToString, suitColor } from '../helper-RoomInterface';
import { SEATS, ALL_SUITS } from '../../util/util';

const propTypes = {
  dealer: PropTypes.oneOf(SEATS).isRequired,
  bidSeq: PropTypes.arrayOf(PropTypes.shape({
    level: PropTypes.number,
    suit: PropTypes.oneOf(ALL_SUITS).isRequired,
  })).isRequired,
};

function BidCell(bid, bidIndex) {
  const cssString = 'bid-sequence-display-cell bid-cell';

  if (!bid) {
    return (<div key={bidIndex} className={`${cssString} empty-cell`} > Empty </div>);
  }

  if (bid.level === 0) {
    return (
      <Segment key={bidIndex} className={`${cssString} ${bid.suit}-cell`} size="small">
        {bidToString(bid.level, bid.suit)}
      </Segment>
    );
  }

  return (
    <Segment key={bidIndex} className={cssString} size="small" color={suitColor(bid.suit)} inverted>
      {bidToString(bid.level, bid.suit)}
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
