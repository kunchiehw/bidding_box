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
import { SEATS } from '../util/util';
import { shouldDisabledDouble, shouldDisabledRedouble, findCurBid, shouldEndBidSeq, roleTurn, getRole } from './helper';

const propTypes = {
  jwtToken: PropTypes.string,

  // props from HOC withRouter
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      roomName: PropTypes.string,
    }),
  }).isRequired,
};

const defaultProps = {
  jwtToken: null,
};


class RoomInterface extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bidSeq: [],
      roomInfo: {
        eastID: 'Jarron',
      },
      boardInfo: {
        vulnerability: 'NS',
        dealer: 'NORTH',
        eastHand: {
          SPADES: 'AKQJT98765432',
          HEARTS: '',
          DIAMONDS: '',
          CLUBS: '',
        },
        westHand: {
          SPADES: '',
          HEARTS: 'KQJT9',
          DIAMONDS: 'KQJT',
          CLUBS: 'KQJT',
        },
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
      },
    };

    this.socket = null;
    this.username = decode(this.props.jwtToken).username;
    this.roomName = this.props.match.params.roomName;

    this.updateWebSocket = this.updateWebSocket.bind(this);

    this.handleBidButtonClick = this.handleBidButtonClick.bind(this);
    this.handleUndoBidSeq = this.handleUndoBidSeq.bind(this);
    this.handleResetBidSeq = this.handleResetBidSeq.bind(this);
    this.handleBackToLobby = this.handleBackToLobby.bind(this);
  }

  componentDidMount() {
    this.updateWebSocket(this.props.jwtToken);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.jwtToken !== nextProps.jwtToken) {
      if (this.socket) {
        this.socket.close();
        this.socket = null;
      }
      this.updateWebSocket(nextProps.jwtToken);
    }
  }

  updateWebSocket(jwtToken) {
    if (jwtToken) {
      this.socket = new WebSocket(`ws://${process.env.REACT_APP_BACKEND_URL}/room/${this.roomName}?jwt=${jwtToken}`);
      this.socket.addEventListener('message', (event) => {
        this.setState({ bidSeq: JSON.parse(event.data) });
      });
    }
  }

  handleBidButtonClick(bid) {
    const bidSeq = this.state.bidSeq.slice();
    bidSeq.push(bid);
    this.setState({ bidSeq });
    if (this.socket) this.socket.send(JSON.stringify(bidSeq));
  }

  handleUndoBidSeq() {
    // Regard TESTER as EAST when press undo button.
    const userRole = getRole(this.state.roomInfo, this.username);
    const role = (userRole === 'TESTER') ? 'EAST' : userRole;
    if (role === 'OBSERVER') return;

    const bidSeq = this.state.bidSeq.slice();
    const roleIndex = SEATS.indexOf(role);
    const dealerIndex = SEATS.indexOf(this.state.boardInfo.dealer);

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

  handleResetBidSeq() {
    const role = getRole(this.state.roomInfo, this.username);
    if (role === 'OBSERVER') return;

    this.setState({
      bidSeq: [],
    });
    if (this.socket) this.socket.send(JSON.stringify([]));
  }

  handleBackToLobby() {
    // TODO: inform server
    this.props.history.push('/lobby');
  }

  render() {
    const endBidSequence = shouldEndBidSeq(this.state.bidSeq);
    const role = getRole(this.state.roomInfo, this.username);

    const handCardsDisplayProp = {
      // Regard TESTER as EAST in handCardsBlock.
      role: (role === 'TESTER') ? 'EAST' : this.role,
      eastHand: this.state.boardInfo.eastHand,
      westHand: this.state.boardInfo.westHand,
      eastID: (this.state.roomInfo) ? this.state.roomInfo.eastID : null,
      westID: (this.state.roomInfo) ? this.state.roomInfo.westID : null,
      endBidSequence,
    };

    const bidButtonBlockProp = {
      curBid: findCurBid(this.state.bidSeq),
      disabledDouble: shouldDisabledDouble(this.state.bidSeq),
      disabledRedouble: shouldDisabledRedouble(this.state.bidSeq),
      handleClick: this.handleBidButtonClick,
      isDisabled: endBidSequence || !roleTurn(role, this.state.boardInfo.dealer, this.state.bidSeq),
    };

    const bidSequenceDisplayProp = {
      dealer: this.state.boardInfo.dealer,
      vulnerability: this.state.boardInfo.vulnerability,
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
              <ScoreBlock scoreList={this.state.boardInfo.scoreList} />
            : <BidButtonBlock {...bidButtonBlockProp} /> }
          </div>
        </div>
        <Divider />
        <div className="room-tools-block">
          <Button
            className={(role === 'OBSERVER') ? 'display-none' : ''}
            onClick={this.handleUndoBidSeq}
            size="small"
            color="grey"
          >
            Undo
          </Button>
          <Button onClick={this.handleResetBidSeq} size="small" color="grey">Reset</Button>
          <Button onClick={this.handleBackToLobby} size="small" color="grey">Back to Lobby</Button>
        </div>
      </div>
    );
  }
}


RoomInterface.propTypes = propTypes;
RoomInterface.defaultProps = defaultProps;

export default withRouter(RoomInterface);
