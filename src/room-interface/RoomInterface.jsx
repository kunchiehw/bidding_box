import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './RoomInterface.css';
import BidButtonBlock from './bid-button-block/BidButtonBlock';
import BidSequenceDisplay from './bid-sequence-display/BidSequenceDisplay';
import HandCardsDisplay from './hand-cards-display/HandCardsDisplay';
import { SEATS, VULS, SUITS } from '../util/util';

const propTypes = {
  seat: PropTypes.oneOf(SEATS),
  vulnerability: PropTypes.oneOf(VULS),
  dealer: PropTypes.oneOf(SEATS),
};

const defaultProps = {
  seat: 'EAST',
  vulnerability: 'NS',
  dealer: 'NORTH',
};

function isPass(bid) {
  return (bid && bid.suit === 'PASS');
}

function isDouble(bid) {
  return (bid && bid.suit === 'DOUBLE');
}

function isSuit(bid) {
  return (bid && SUITS.indexOf(bid.suit) !== -1);
}

class RoomInterface extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bidSeq: [],
    };
    this.resetBidSeq = this.resetBidSeq.bind(this);
    this.handleBidButtonClick = this.handleBidButtonClick.bind(this);
  }

  shouldDisabledDouble() {
    const bidSeqLen = this.state.bidSeq.length;
    if (isSuit(this.state.bidSeq[bidSeqLen - 1])) {
      return false;
    }
    if (isSuit(this.state.bidSeq[bidSeqLen - 3]) &&
        isPass(this.state.bidSeq[bidSeqLen - 2]) &&
        isPass(this.state.bidSeq[bidSeqLen - 1])) {
      return false;
    }
    return true;
  }

  shouldDisabledRedouble() {
    const bidSeqLen = this.state.bidSeq.length;
    if (isDouble(this.state.bidSeq[bidSeqLen - 1])) {
      return false;
    }
    if (isDouble(this.state.bidSeq[bidSeqLen - 3]) &&
        isPass(this.state.bidSeq[bidSeqLen - 2]) &&
        isPass(this.state.bidSeq[bidSeqLen - 1])) {
      return false;
    }
    return true;
  }

  findCurBid() {
    for (let i = this.state.bidSeq.length - 1; i >= 0; i -= 1) {
      if (isSuit(this.state.bidSeq[i])) {
        return this.state.bidSeq[i];
      }
    }
    return null;
  }

  shouldEndBidSeq() {
    const bidSeqLen = this.state.bidSeq.length;
    if (isPass(this.state.bidSeq[bidSeqLen - 3]) &&
        isPass(this.state.bidSeq[bidSeqLen - 2]) &&
        isPass(this.state.bidSeq[bidSeqLen - 1])) {
      return (bidSeqLen >= 4) || isPass(this.state.bidSeq[bidSeqLen - 4]);
    }
    return false;
  }

  handleBidButtonClick(bid) {
    const bidSeq = this.state.bidSeq.slice();
    bidSeq.push(bid);
    this.setState({
      bidSeq,
    });
    console.log(bidSeq);
  }

  resetBidSeq() {
    this.setState({
      bidSeq: [],
    });
    console.log('RESET');
  }

  render() {
    const endBidSequence = this.shouldEndBidSeq();

    const handCardsDisplayProp = {
      eastHand: ['AKQJT98765432', '', '', ''],
      westHand: ['', 'AKQJT98765432', '', ''],
      seat: this.props.seat,
      endBidSequence,
    };

    const bidSequenceDisplayProp = {
      dealer: this.props.dealer,
      vulnerability: this.props.vulnerability,
      bidSeq: this.state.bidSeq,
    };

    const biddingPanelProp = {
      curBid: this.findCurBid(),
      disabledDouble: this.shouldDisabledDouble(),
      disabledRedouble: this.shouldDisabledRedouble(),
      handleClick: this.handleBidButtonClick,
    };

    return (
      <div className="room-interface">
        <div className="room-main-block">
          <div className="main-upper-block">
            <HandCardsDisplay {...handCardsDisplayProp} />
          </div>
          <div className="main-lower-block">
            <BidButtonBlock {...biddingPanelProp} />
            <BidSequenceDisplay {...bidSequenceDisplayProp} />
          </div>
        </div>
        <div className="room-tools-block">
          <button onClick={this.resetBidSeq}>Reset</button>
        </div>
      </div>
    );
  }
}

RoomInterface.propTypes = propTypes;
RoomInterface.defaultProps = defaultProps;

export default RoomInterface;
