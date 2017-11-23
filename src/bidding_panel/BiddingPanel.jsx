import React from 'react';
import PropTypes from 'prop-types';
import './BiddingPanel.css'
import SuitBidButton from './SuitBidButton.jsx';
import PassBidButton from './PassBidButton.jsx';
import DoubleBidButton from './DoubleBidButton.jsx';
import RedoubleBidButton from './RedoubleBidButton.jsx';

const suits = ['CLUBS', 'DIAMONDS', 'HEARTS', 'SPADES', 'NOTRUMPS'];

const propTypes = {
  curBid: PropTypes.shape({
    level: PropTypes.number,
    suit: PropTypes.string,
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
}

function BiddingPanel(props) {
  const handleClick = (bid) => {
    props.handleClick(bid);
  }

  const levelPanels = [];

  for (var level = 1; level <= 7; level++) {
    const suitButtons = [];
    for (var suitIndex = 0; suitIndex < suits.length; suitIndex++) {
      const suit = suits[suitIndex];
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
    bid: {
      level: 0,
      suit: 'PASS'
    },
    handleClick: handleClick
  }

  const doubleButtonProp = {
    bid: {
      level: 0,
      suit: 'DOUBLE'
    },
    disabledDouble: props.curBid.disabledDouble,
    handleClick: handleClick
  }

  const redoubleButtonProp = {
    bid: {
      level: 0,
      suit: 'REDOUBLE'
    },
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
