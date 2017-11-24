import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  handleClick: PropTypes.func.isRequired
};

function PassBidButton(props) {
  const handleClick = () => {
    props.handleClick({
      level: 0,
      suit: 'PASS'
    });
  }

  return (
    <button className='bidding-button pass-button' onClick={handleClick}>Pass</button>
  );
}

PassBidButton.propTypes = propTypes;

export default PassBidButton;
