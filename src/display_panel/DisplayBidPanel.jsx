import React from 'react';
import PropTypes from 'prop-types';
import './DisplayPanel.css';
import {suitBidToString, otherBidToString} from '../bidding_panel/HelperFunctions.jsx';
import {SEATS, SUITS, NON_SUITS} from '../util/Util.jsx';

const propTypes = {
  dealer: PropTypes.oneOf(SEATS).isRequired,
  bidSeq: PropTypes.arrayOf(PropTypes.shape({
    level: PropTypes.number,
    suit: PropTypes.oneOf(SUITS.concat(NON_SUITS)).isRequired
  }))
};

function DisplayBidBlock(bid, bidIndex) {
  if (!bid) {
    return (<div key={bidIndex} className='display-block bid-block'></div>);
  }
  else if (!bid.level) {
    return (<div key={bidIndex} className='display-block bid-block'>{otherBidToString(bid.suit)}</div>);
  }
  else {
    return (<div key={bidIndex} className='display-block bid-block'>{suitBidToString(bid)}</div>);
  }
}

function DisplayBidPanel(props) {
  var bidRows = [];
  var bidRow = [];

  switch (props.dealer) {
    case 'SOUTH':
      bidRow.push(DisplayBidBlock(null, -3));
      bidRow.push(DisplayBidBlock(null, -2));
      bidRow.push(DisplayBidBlock(null, -1));
      break;
    case 'EAST':
      bidRow.push(DisplayBidBlock(null, -2));
      bidRow.push(DisplayBidBlock(null, -1));
      break;
    case 'NORTH':
      bidRow.push(DisplayBidBlock(null, -1));
      break;
    default:
      break;
  }

  for (var bidIndex = 0; bidIndex < props.bidSeq.length; bidIndex++) {
    bidRow.push(DisplayBidBlock(props.bidSeq[bidIndex], bidIndex));
    if (bidRow.length === 4) {
      bidRows.push( <div key={bidIndex} className='display-bid-row'> {bidRow} </div> );
      bidRow = [];
    }
  }

  bidRows.push( <div key='last' className='display-bid-row'> {bidRow} </div> );

  return (
    <div className='display-bid-panel'>
      {bidRows}
    </div>
  );
}

DisplayBidPanel.propTypes = propTypes;

export default DisplayBidPanel;
