import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  bid: PropTypes.shape({
    level: PropTypes.number.isRequired,
    suit: PropTypes.string.isRequired
  }),
  disabledRedouble: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired
};

function RedoubleBidButton(props) {
  const handleClick = () => {
    props.handleClick(props.bid);
  }

  return (
    <button className='bidding-button redouble-button' onClick={handleClick} disabled={props.disabledRedouble}>
      XX
    </button>
  );
}

RedoubleBidButton.propTypes = propTypes;

export default RedoubleBidButton;
