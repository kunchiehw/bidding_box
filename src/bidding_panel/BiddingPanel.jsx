import React from 'react';
import PropTypes from 'prop-types';
import './BiddingPanel.css'
import SuitBidButton from './SuitBidButton.jsx';
import PassBidButton from './PassBidButton.jsx';
import DoubleBidButton from './DoubleBidButton.jsx';
import RedoubleBidButton from './RedoubleBidButton.jsx';
import {SUITS, VALID_SUITS} from '../util/Util.jsx';

const propTypes = {
  curBid: PropTypes.shape({
    level: PropTypes.number,
    suit: PropTypes.oneOf(VALID_SUITS),
    disabledDouble: PropTypes.bool,
    disabledRedouble: PropTypes.bool,
  }),
  handleClick: PropTypes.func.isRequired
};

const defaultProps = {
  curBid: {
    level: 0,
    suit: 'PASS',
    disabledDouble: true,
    disabledRedouble: true
  }
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
      const curBid = {
        level: props.curBid.level,
        suit: props.curBid.suit
      }
      const suitButtonProp = {
        bid: bid,
        curBid: curBid,
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
    handleClick: handleClick
  }

  const doubleButtonProp = {
    disabledDouble: props.curBid.disabledDouble,
    handleClick: handleClick
  }

  const redoubleButtonProp = {
    disabledRedouble: props.curBid.disabledRedouble,
    handleClick: handleClick
  }

  return (
    <div>
      {levelPanels}
      <div>
        <PassBidButton {...passButtonProp} />
        <DoubleBidButton {...doubleButtonProp} />
        <RedoubleBidButton {...redoubleButtonProp} />
      </div>
    </div>
  );
}

BiddingPanel.propTypes = propTypes;
BiddingPanel.defaultProps = defaultProps;

export default BiddingPanel;
