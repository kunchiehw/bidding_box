import React from 'react';
import PropTypes from 'prop-types';
import './BidButtonBlock.css';
import SuitBidButton from './SuitBidButton';
import OtherBidButton from './OtherBidButton';
import { SUITS, NON_SUITS } from '../../util/util';

const propTypes = {
  curBid: PropTypes.shape({
    level: PropTypes.number.isRequired,
    suit: PropTypes.oneOf(SUITS).isRequired,
  }),
  disabledDouble: PropTypes.bool.isRequired,
  disabledRedouble: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
};

const defaultProps = {
  curBid: null,
};

function BidButtonBlock(props) {
  const handleClick = (bid) => {
    props.handleClick(bid);
  };

  const levelPanels = [];

  for (let level = 1; level <= 7; level += 1) {
    const suitButtons = [];
    for (let suitIndex = 0; suitIndex < SUITS.length; suitIndex += 1) {
      const suit = SUITS[suitIndex];
      const bid = { level, suit };
      const suitButtonProp = {
        bid,
        curBid: props.curBid,
        handleClick,
        isDisabled: props.isDisabled,
      };
      suitButtons.push(<SuitBidButton key={suit} {...suitButtonProp} />);
    }
    levelPanels.push(<div key={level} className="bid-button-row suit-bid-button-row">{suitButtons}</div>);
  }

  const passButtonProp = {
    suit: NON_SUITS[0],
    isDisabled: props.isDisabled,
    handleClick,
  };

  const doubleButtonProp = {
    suit: NON_SUITS[1],
    isDisabled: props.disabledDouble || props.isDisabled,
    handleClick,
  };

  const redoubleButtonProp = {
    suit: NON_SUITS[2],
    isDisabled: props.disabledRedouble || props.isDisabled,
    handleClick,
  };

  return (
    <div className="bid-button-block">
      {levelPanels}
      <div className="bid-button-row other-bid-button-row">
        <OtherBidButton {...passButtonProp} />
        <OtherBidButton {...doubleButtonProp} />
        <OtherBidButton {...redoubleButtonProp} />
      </div>
    </div>
  );
}

BidButtonBlock.propTypes = propTypes;
BidButtonBlock.defaultProps = defaultProps;

export default BidButtonBlock;
