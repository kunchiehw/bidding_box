import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Divider } from 'semantic-ui-react';
import './RoomInterface.css';
import BidButtonBlock from './bid-button-block/BidButtonBlock';
import BidSequenceDisplay from './bid-sequence-display/BidSequenceDisplay';
import HandCardsDisplay from './hand-cards-display/HandCardsDisplay';
import { SEATS, VULS, SUITS, PARTICIPANTS_ROLE } from '../util/util';

function isPass(bid) {
  return (bid && bid.suit === 'PASS');
}

function isDouble(bid) {
  return (bid && bid.suit === 'DOUBLE');
}

function isSuit(bid) {
  return (bid && SUITS.indexOf(bid.suit) !== -1);
}

const propTypes = {
  role: PropTypes.oneOf(PARTICIPANTS_ROLE).isRequired,
  vulnerability: PropTypes.oneOf(VULS).isRequired,
  dealer: PropTypes.oneOf(SEATS).isRequired,
  // TODO: Make more specific validator
  eastHand: PropTypes.arrayOf(PropTypes.string).isRequired,
  westHand: PropTypes.arrayOf(PropTypes.string).isRequired,
  eastID: PropTypes.string.isRequired,
  westID: PropTypes.string.isRequired,
};

class RoomInterface extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bidSeq: [],
    };
    this.undoBidSeq = this.undoBidSeq.bind(this);
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
      return (bidSeqLen >= 4);
    }
    return false;
  }

  roleTurn() {
    const roleIndex = SEATS.indexOf(this.props.role);
    const dealerIndex = SEATS.indexOf(this.props.dealer);
    return (dealerIndex + this.state.bidSeq.length) % 4 === roleIndex;
  }

  handleBidButtonClick(bid) {
    const bidSeq = this.state.bidSeq.slice();
    bidSeq.push(bid);
    this.setState({
      bidSeq,
    });
  }

  undoBidSeq() {
    const bidSeq = this.state.bidSeq.slice();
    const roleIndex = SEATS.indexOf(this.props.role);
    const dealerIndex = SEATS.indexOf(this.props.dealer);

    bidSeq.pop();
    if (dealerIndex + bidSeq.length >= roleIndex) {
      while ((dealerIndex + bidSeq.length) % 4 !== roleIndex) {
        bidSeq.pop();
      }
      this.setState({
        bidSeq,
      });
    }
  }

  resetBidSeq() {
    this.setState({
      bidSeq: [],
    });
  }

  render() {
    const handCardsDisplayProp = {
      role: this.props.role,
      eastHand: this.props.eastHand,
      westHand: this.props.westHand,
      eastID: this.props.eastID,
      westID: this.props.westID,
      endBidSequence: this.shouldEndBidSeq(),
    };

    const bidButtonBlockProp = {
      curBid: this.findCurBid(),
      disabledDouble: this.shouldDisabledDouble(),
      disabledRedouble: this.shouldDisabledRedouble(),
      handleClick: this.handleBidButtonClick,
      shouldHideBidButtonBlock: this.shouldEndBidSeq() || !this.roleTurn(),
    };

    const bidSequenceDisplayProp = {
      dealer: this.props.dealer,
      vulnerability: this.props.vulnerability,
      bidSeq: this.state.bidSeq,
    };

    return (
      <div className="room-interface">
        <div className="room-main-block">
          <div className="main-upper-block">
            <HandCardsDisplay {...handCardsDisplayProp} />
          </div>
          <div className="main-lower-block">
            <BidButtonBlock {...bidButtonBlockProp} />
            <BidSequenceDisplay {...bidSequenceDisplayProp} />
          </div>
        </div>
        <Divider />
        <div className="room-tools-block">
          <Button onClick={this.undoBidSeq} size="small" color="grey">Undo</Button>
          <Button onClick={this.resetBidSeq} size="small" color="grey">Reset</Button>
        </div>
      </div>
    );
  }
}

RoomInterface.propTypes = propTypes;

export default RoomInterface;
