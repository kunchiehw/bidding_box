import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { decode } from 'jsonwebtoken';
import { Button, Divider } from 'semantic-ui-react';
import './RoomInterface.css';
import BidButtonBlock from './bid-button-block/BidButtonBlock';
import BidSequenceDisplay from './bid-sequence-display/BidSequenceDisplay';
import HandCardsDisplay from './hand-cards-display/HandCardsDisplay';
import ScoreBlock from './score-block/ScoreBlock';
import { SEATS, SUITS } from '../util/util';

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
  jwtToken: PropTypes.string,
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
    this.username = decode(this.props.jwtToken).username;
    this.roomName = this.props.match.params.roomName;

    /*
    this.roomInfo = null;
    this.boardInfo = null;
    */

    this.roomInfo = {
      eastID: 'Jarron',
      westID: 'wkc',
    };

    this.boardInfo = {
      vulnerability: 'NS',
      dealer: 'NORTH',
      eastHand: ['AKQJT98765432', '', '', ''],
      westHand: ['', 'KQJT9', 'KQJT', 'KQJT'],
      scoreList: [{
        bid: {
          level: 7,
          suit: 'SPADES',
        },
        declarer: 'EW',
        score: 100,
      }, {
        bid: {
          level: 7,
          suit: 'NOTRUMPS',
        },
        declarer: 'EAST',
        score: 0,
      }],
    };

    this.role = 'TESTER';

    this.undoBidSeq = this.undoBidSeq.bind(this);
    this.resetBidSeq = this.resetBidSeq.bind(this);
    this.handleBidButtonClick = this.handleBidButtonClick.bind(this);
    this.handleBackToLobby = this.handleBackToLobby.bind(this);
  }

  componentDidMount() {
    if (this.props.jwtToken) {
      this.socket = new WebSocket(`ws://${process.env.REACT_APP_BACKEND_URL}/room/${this.roomName}?jwt=${this.props.jwtToken}`);
      this.socket.addEventListener('message', (event) => {
        this.setState({ bidSeq: JSON.parse(event.data) });
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.jwtToken !== nextProps.jwtToken) {
      if (this.socket) {
        this.socket.close();
        this.socket = null;
      }

      if (nextProps.jwtToken) {
        this.socket = new WebSocket(`ws://${process.env.REACT_APP_BACKEND_URL}/room/${this.roomName}?jwt=${nextProps.jwtToken}`);
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
    if (this.role === 'TESTER') {
      return true;
    }

    const roleIndex = SEATS.indexOf(this.role);
    const dealerIndex = SEATS.indexOf(this.boardInfo.dealer);
    return (dealerIndex + this.state.bidSeq.length) % 4 === roleIndex;
  }

  handleBidButtonClick(bid) {
    const bidSeq = this.state.bidSeq.slice();
    bidSeq.push(bid);
    this.setState({
      bidSeq,
    });
    if (this.socket) this.socket.send(JSON.stringify(bidSeq));
  }

  undoBidSeq() {
    // Regard TESTER as EAST when press undo button.
    const role = (this.role === 'TESTER') ? 'EAST' : this.role;
    if (role === 'OBSERVER') return;

    const bidSeq = this.state.bidSeq.slice();
    const roleIndex = SEATS.indexOf(role);
    const dealerIndex = SEATS.indexOf(this.boardInfo.dealer);

    bidSeq.pop();
    if (dealerIndex + bidSeq.length >= roleIndex) {
      while ((dealerIndex + bidSeq.length) % 4 !== roleIndex) {
        bidSeq.pop();
      }
      this.setState({
        bidSeq,
      });
      if (this.socket) this.socket.send(JSON.stringify(bidSeq));
    }
  }

  resetBidSeq() {
    if (this.role === 'OBSERVER') return;

    this.setState({
      bidSeq: [],
    });
    if (this.socket) this.socket.send(JSON.stringify([]));
  }

  handleBackToLobby() {
    this.props.history.push('/lobby');
  }

  render() {
    const endBidSequence = this.shouldEndBidSeq();

    const handCardsDisplayProp = {
      // Regard TESTER as EAST in handCardsBlock.
      role: (this.role === 'TESTER') ? 'EAST' : this.role,
      eastHand: this.boardInfo.eastHand,
      westHand: this.boardInfo.westHand,
      eastID: this.roomInfo.eastID,
      westID: this.roomInfo.westID,
      endBidSequence,
    };

    const bidButtonBlockProp = {
      curBid: this.findCurBid(),
      disabledDouble: this.shouldDisabledDouble(),
      disabledRedouble: this.shouldDisabledRedouble(),
      handleClick: this.handleBidButtonClick,
      isDisabled: endBidSequence || !this.roleTurn(),
    };

    const bidSequenceDisplayProp = {
      dealer: this.boardInfo.dealer,
      vulnerability: this.boardInfo.vulnerability,
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
              <ScoreBlock scoreList={this.boardInfo.scoreList} />
            : <BidButtonBlock {...bidButtonBlockProp} /> }
          </div>
        </div>
        <Divider />
        <div className="room-tools-block">
          <Button
            className={(this.role === 'OBSERVER') ? 'display-none' : ''}
            onClick={this.undoBidSeq}
            size="small"
            color="grey"
          >
            Undo
          </Button>
          <Button onClick={this.resetBidSeq} size="small" color="grey">Reset</Button>
          <Button onClick={this.handleBackToLobby} size="small" color="grey">Back to Lobby</Button>
        </div>
      </div>
    );
  }
}


RoomInterface.propTypes = propTypes;
RoomInterface.defaultProps = defaultProps;

export default withRouter(RoomInterface);
