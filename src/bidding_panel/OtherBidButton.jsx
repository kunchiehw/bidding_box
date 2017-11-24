import React from 'react';
import PropTypes from 'prop-types';
import {otherBidCSS, otherBidToString} from './HelperFunctions.jsx';
import {NON_SUITS} from '../util/Util.jsx';

const propTypes = {
  suit: PropTypes.oneOf(NON_SUITS),
  isDisabled: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired
};

function OtherBidButton(props) {
  const handleClick = () => {
    props.handleClick({
      level: null,
      suit: props.suit
    });
  }

  return (
    <button className={otherBidCSS(props.suit)} onClick={handleClick} disabled={props.isDisabled}>
      {otherBidToString(props.suit)}
    </button>
  );
}

OtherBidButton.propTypes = propTypes;

export default OtherBidButton;
