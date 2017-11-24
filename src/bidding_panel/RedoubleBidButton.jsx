import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  disabledRedouble: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired
};

function RedoubleBidButton(props) {
  const handleClick = () => {
    props.handleClick({
      level: 0,
      suit: 'REDOUBLE'
    });
  }

  return (
    <button className='bidding-button redouble-button' onClick={handleClick} disabled={props.disabledRedouble}>
      XX
    </button>
  );
}

RedoubleBidButton.propTypes = propTypes;

export default RedoubleBidButton;
