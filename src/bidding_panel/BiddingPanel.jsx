import React from 'react';
import PropTypes from 'prop-types';
import './BiddingPanel.css'
import SuitBidButton from './SuitBidButton.jsx';
import OtherBidButton from './OtherBidButton.jsx';
import {SUITS, NON_SUITS} from '../util/Util.jsx';

const propTypes = {
  curBid: PropTypes.shape({
    level: PropTypes.number,
    suit: PropTypes.oneOf(SUITS)
  }),
  disabledDouble: PropTypes.bool,
  disabledRedouble: PropTypes.bool,
  handleClick: PropTypes.func.isRequired
};

const defaultProps = {
  curBid: null,
  disabledDouble: true,
  disabledRedouble: true
};

function BiddingPanel(props) {
  const handleClick = (bid) => {
    props.handleClick(bid);
  }

  const levelPanels = [];

  for (var level = 1; level <= 7; level++) {
    const suitButtons = [];
    for (var suitIndex = 0; suitIndex < SUITS.length; suitIndex++) {
      const suit = SUITS[suitIndex];
      const bid = {
        level: level,
        suit: suit
      }
      const suitButtonProp = {
        bid: bid,
        curBid: props.curBid,
        handleClick: handleClick
      }
      suitButtons.push(
        <SuitBidButton key={suit} {...suitButtonProp}/>
      );
    }
    levelPanels.push(
      <div key={level}>{suitButtons}</div>
    );
  }

  const passButtonProp = {
    suit: NON_SUITS[0],
    isDisabled: false,
    handleClick: handleClick
  }

  const doubleButtonProp = {
    suit: NON_SUITS[1],
    isDisabled: props.disabledDouble,
    handleClick: handleClick
  }

  const redoubleButtonProp = {
    suit: NON_SUITS[2],
    isDisabled: props.disabledRedouble,
    handleClick: handleClick
  }

  return (
    <div>
      {levelPanels}
      <div>
        <OtherBidButton {...passButtonProp} />
        <OtherBidButton {...doubleButtonProp} />
        <OtherBidButton {...redoubleButtonProp} />
      </div>
    </div>
  );
}

BiddingPanel.propTypes = propTypes;
BiddingPanel.defaultProps = defaultProps;

export default BiddingPanel;
