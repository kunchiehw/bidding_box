import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  disabledDouble: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired
};

function DoubleBidButton(props) {
  const handleClick = () => {
    props.handleClick({
      level: 0,
      suit: 'DOUBLE'
    });
  }

  return (
    <button className='bidding-button double-button' onClick={handleClick} disabled={props.disabledDouble}>X</button>
  );
}

DoubleBidButton.propTypes = propTypes;

export default DoubleBidButton;
