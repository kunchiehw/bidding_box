import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Divider } from 'semantic-ui-react';
import './RoomInterface.css';
import BidButtonBlock from './bid-button-block/BidButtonBlock';
import BidSequenceDisplay from './bid-sequence-display/BidSequenceDisplay';
import HandCardsDisplay from './hand-cards-display/HandCardsDisplay';
import ScoreBlock from './score-block/ScoreBlock';
import { SEATS, VULS, SUITS, PARTICIPANTS_ROLE, DECLARERS } from '../util/util';

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
  scoreList: PropTypes.arrayOf(PropTypes.shape({
    bid: PropTypes.shape({
      level: PropTypes.number,
      suit: PropTypes.oneOf(SUITS).isRequired,
    }),
    declarer: PropTypes.oneOf(DECLARERS).isRequired,
    score: PropTypes.number.isRequired,
  })).isRequired,
  jwtToken: PropTypes.string,
  roomName: PropTypes.string.isRequired,
};

const defaultProps = {
  jwtToken: null,
};


class RoomInterface extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bidSeq: [],
    };

    this.socket = null;

    this.undoBidSeq = this.undoBidSeq.bind(this);
    this.resetBidSeq = this.resetBidSeq.bind(this);
    this.handleBidButtonClick = this.handleBidButtonClick.bind(this);
  }

  componentDidMount() {
    if (this.props.jwtToken) {
      this.socket = new WebSocket(`ws://localhost:8080/room/${this.props.roomName}?jwt=${this.props.jwtToken}`);
      this.socket.addEventListener('message', (event) => {
        this.setState({ bidSeq: JSON.parse(event.data) });
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (this.props.jwtToken !== nextProps.jwtToken) {
      if (this.socket) {
        // disconnect socket
      }

      if (nextProps.jwtToken) {
        this.socket = new WebSocket(`ws://localhost:8080/room/${this.props.roomName}?jwt=${nextProps.jwtToken}`);
        this.socket.addEventListener('message', (event) => {
          this.setState({ bidSeq: JSON.parse(event.data) });
        });
      }
    }
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
    // TESTER could control all four players' bid.
    if (this.props.role === 'TESTER') {
      return true;
    }

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
    this.socket.send(JSON.stringify(bidSeq));
  }

  undoBidSeq() {
    // Regard TESTER as EAST when press undo button.
    const role = (this.props.role === 'TESTER') ? 'EAST' : this.props.role;
    if (role === 'OBSERVER') return;

    const bidSeq = this.state.bidSeq.slice();
    const roleIndex = SEATS.indexOf(role);
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
    this.socket.send(JSON.stringify(bidSeq));
  }

  resetBidSeq() {
    if (this.props.role === 'OBSERVER') return;

    this.setState({
      bidSeq: [],
    });
    this.socket.send('[]');
  }

  render() {
    const endBidSequence = this.shouldEndBidSeq();

    const handCardsDisplayProp = {
      // Regard TESTER as EAST in handCardsBlock.
      role: (this.props.role === 'TESTER') ? 'EAST' : this.props.role,
      eastHand: this.props.eastHand,
      westHand: this.props.westHand,
      eastID: this.props.eastID,
      westID: this.props.westID,
      endBidSequence,
    };

    const bidButtonBlockProp = {
      curBid: this.findCurBid(),
      disabledDouble: this.shouldDisabledDouble(),
      disabledRedouble: this.shouldDisabledRedouble(),
      handleClick: this.handleBidButtonClick,
      shouldDisabledBidButtonBlock: endBidSequence || !this.roleTurn(),
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
            <BidSequenceDisplay {...bidSequenceDisplayProp} />
            {(endBidSequence) ?
              <ScoreBlock scoreList={this.props.scoreList} />
            : <BidButtonBlock {...bidButtonBlockProp} /> }
          </div>
        </div>
        <Divider />
        <div className="room-tools-block">
          <Button
            className={(this.props.role === 'OBSERVER') ? 'display-none' : ''}
            onClick={this.undoBidSeq}
            size="small"
            color="grey"
          >
            Undo
          </Button>
          <Button onClick={this.resetBidSeq} size="small" color="grey">Reset</Button>
        </div>
      </div>
    );
  }
}


RoomInterface.propTypes = propTypes;
RoomInterface.defaultProps = defaultProps;

export default RoomInterface;
