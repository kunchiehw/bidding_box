import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import { suitBidToString, suitBidButtonDisabled, bidColor } from '../helper';
import { SUITS } from '../../util/util';

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
      disabled={suitBidButtonDisabled(props.curBid, props.bid)}
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
