import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import { suitBidToString, bidColor } from '../helper';
import { SUITS } from '../../util/util';

function suitToNumber(suit) {
  switch (suit) {
    case 'NOTRUMPS':
      return 5;
    case 'SPADES':
      return 4;
    case 'HEARTS':
      return 3;
    case 'DIAMONDS':
      return 2;
    case 'CLUBS':
      return 1;
    default:
      return 0;
  }
}

export function suitBidButtonDisabled(curBid, bid) {
  if (curBid === null || curBid.level < bid.level) {
    return false;
  }
  if (curBid.level > bid.level) {
    return true;
  }
  return (suitToNumber(curBid.suit) >= suitToNumber(bid.suit));
}

const propTypes = {
  bid: PropTypes.shape({
    level: PropTypes.number.isRequired,
    suit: PropTypes.oneOf(SUITS).isRequired,
  }).isRequired,
  curBid: PropTypes.shape({
    level: PropTypes.number.isRequired,
    suit: PropTypes.oneOf(SUITS).isRequired,
  }),
  handleClick: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
};

const defaultProps = {
  curBid: null,
};

function SuitBidButton(props) {
  const handleClick = () => {
    props.handleClick(props.bid);
  };

  return (
    <Button
      className="bid-button"
      onClick={handleClick}
      disabled={suitBidButtonDisabled(props.curBid, props.bid) || props.isDisabled}
      size="small"
      color={bidColor(props.bid.suit)}
    >
      {suitBidToString(props.bid)}
    </Button>
  );
}

SuitBidButton.propTypes = propTypes;
SuitBidButton.defaultProps = defaultProps;

export default SuitBidButton;
