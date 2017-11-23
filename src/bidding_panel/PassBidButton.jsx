import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  bid: PropTypes.shape({
    level: PropTypes.number.isRequired,
    suit: PropTypes.string.isRequired
  }),
  handleClick: PropTypes.func.isRequired
};

function PassBidButton(props) {
  const handleClick = () => {
    props.handleClick(props.bid);
  }

  return (
    <button className='bidding-button pass-button' onClick={handleClick}>Pass</button>
  );
}

PassBidButton.propTypes = propTypes;

export default PassBidButton;
