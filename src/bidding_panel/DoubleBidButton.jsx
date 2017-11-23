import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  bid: PropTypes.shape({
    level: PropTypes.number.isRequired,
    suit: PropTypes.string.isRequired
  }),
  disabledDouble: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired
};

function DoubleBidButton(props) {
  const handleClick = () => {
    props.handleClick(props.bid);
  }

  return (
    <button className='bidding-button double-button' onClick={handleClick} disabled={props.disabledDouble}>X</button>
  );
}

DoubleBidButton.propTypes = propTypes;

export default DoubleBidButton;
