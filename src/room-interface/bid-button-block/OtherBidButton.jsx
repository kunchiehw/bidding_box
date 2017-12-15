import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import { otherBidToString, bidColor } from '../helper';
import { NON_SUITS } from '../../util/util';

const propTypes = {
  suit: PropTypes.oneOf(NON_SUITS).isRequired,
  isDisabled: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
};

function OtherBidButton(props) {
  const handleClick = () => {
    props.handleClick({
      level: null,
      suit: props.suit,
    });
  };

  return (
    <Button
      className="bid-button"
      onClick={handleClick}
      disabled={props.isDisabled}
      size="small"
      color={bidColor(props.suit)}
      basic
    >
      {otherBidToString(props.suit)}
    </Button>
  );
}

OtherBidButton.propTypes = propTypes;

export default OtherBidButton;
