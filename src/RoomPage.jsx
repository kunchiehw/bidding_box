import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BiddingPanel from './bidding_panel/BiddingPanel.jsx';
import {SEATS, VULS, SUITS} from './util/Util.jsx';

const propTypes = {
  seat: PropTypes.oneOf(SEATS),
  vul: PropTypes.oneOf(VULS),
  dealer: PropTypes.oneOf(SEATS)
};

const defaultProps = {
  seat: 'NORTH',
  vul: 'NONE',
  dealer: 'NORTH'
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

class RoomPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      bidSeq: []
    };
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
    const bidSeqLen = this.state.bidSeq.length;
    if (isSuit(this.state.bidSeq[bidSeqLen - 1])) {
      return this.state.bidSeq[bidSeqLen - 1];
    }
    if (isSuit(this.state.bidSeq[bidSeqLen - 2])) {
      return this.state.bidSeq[bidSeqLen - 2];
    }
    if (isSuit(this.state.bidSeq[bidSeqLen - 3])) {
      return this.state.bidSeq[bidSeqLen - 3];
    }
    return null;
  }

  shouldEndBidSeq() {
    const bidSeqLen = this.state.bidSeq.length;
    if (bidSeqLen <= 3) {
      return false;
    }
    if (isPass(this.state.bidSeq[bidSeqLen - 3]) &&
        isPass(this.state.bidSeq[bidSeqLen - 2]) &&
        isPass(this.state.bidSeq[bidSeqLen - 1])) {
      return (bidSeqLen > 4) || isPass(this.state.bidSeq[bidSeqLen - 4]);
    }
    return false;
  }

  handleBidButtonClick(bid) {
    let bidSeq = this.state.bidSeq.slice()
    bidSeq.push(bid)
    this.setState({
      bidSeq: bidSeq
    });
    console.log(bidSeq);
  }

  resetBidSeq() {
    this.setState({
      bidSeq: []
    });
    console.log("RESET");
  }

  render() {

    if (this.shouldEndBidSeq()) {
      return (
        <div className="room-page">
          <button onClick={this.resetBidSeq.bind(this)}>Reset</button>
        </div>
      );
    }
    const curProp = {
      curBid: this.findCurBid(),
      disabledDouble: this.shouldDisabledDouble(),
      disabledRedouble: this.shouldDisabledRedouble(),
      handleClick: this.handleBidButtonClick
    };

    return (
      <div className="room-page">
        <BiddingPanel {...curProp}/>
      </div>
    );
  }
}

RoomPage.propTypes = propTypes;
RoomPage.defaultProps = defaultProps;

export default RoomPage;
