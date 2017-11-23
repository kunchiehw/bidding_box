import React from 'react';
import PropTypes from 'prop-types';
import {suitBidToString, suitBidCSS, suitBidDisabled} from './HelperFunctions.jsx'

const propTypes = {
  bid: PropTypes.shape({
    level: PropTypes.number.isRequired,
    suit: PropTypes.string.isRequired
  }),
  curBid: PropTypes.shape({
    level: PropTypes.number.isRequired,
    suit: PropTypes.string.isRequired,
  }),
  handleClick: PropTypes.func.isRequired
};

function SuitBidButton(props) {
  const handleClick = () => {
    props.handleClick(props.bid);
  }

  return (
    <button className={suitBidCSS(props.bid)} onClick={handleClick} disabled={suitBidDisabled(props.curBid, props.bid)}>
      {suitBidToString(props.bid)}
    </button>
  );
}

SuitBidButton.propTypes = propTypes;

export default SuitBidButton;
