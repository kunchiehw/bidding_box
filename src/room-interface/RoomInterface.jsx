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
import { getPlayerRole, getBidSeqIsEnded, getWhoseTurn, getCurrentBid,
  shouldDoubleButtonDisabled, shouldRedoubleButtonDisabled } from './helper-RoomInterface';

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
        eastID: 'jarron',
        westID: 'wkc',
      },
      boardInfo: {
        vulnerability: 'NS',
        dealer: 'WEST',
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
    this.updateRoomBidSeq = this.updateRoomBidSeq.bind(this);

    this.handleBidButtonClick = this.handleBidButtonClick.bind(this);
    this.handleUndoButton = this.handleUndoButton.bind(this);
    this.handleResetButton = this.handleResetButton.bind(this);
    this.handleBackToLobbyButton = this.handleBackToLobbyButton.bind(this);
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
      this.socket = new WebSocket(`ws://${process.env.REACT_APP_BACKEND_URL}/room/${this.roomName}`);
      this.socket.onopen = () => {
        this.socket.send(jwtToken);
      };
      this.socket.addEventListener('message', (event) => {
        const { bidSeq } = JSON.parse(event.data);
        this.setState({ bidSeq: JSON.parse(bidSeq) });
      });
    }
  }

  updateRoomBidSeq(bidSeq) {
    fetch(`${process.env.REACT_APP_BACKEND_SCHEMA}://${process.env.REACT_APP_BACKEND_URL}/room/${this.roomName}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.props.jwtToken}`,
      },
      body: JSON.stringify({ bidSeq }),
    });
  }

  handleBidButtonClick(level, suit) {
    const bidSeq = this.state.bidSeq.slice();
    bidSeq.push({ level, suit });
    this.updateRoomBidSeq(bidSeq);
  }

  handleUndoButton() {
    const userRole = getPlayerRole(this.state.roomInfo, this.username);
    const bidSeq = this.state.bidSeq.slice();
    const roleIndex = SEATS.indexOf(userRole);
    const dealerIndex = SEATS.indexOf(this.state.boardInfo.dealer);

    if (bidSeq.length === 0) return;

    bidSeq.pop();
    if (dealerIndex + bidSeq.length >= roleIndex) {
      while ((dealerIndex + bidSeq.length) % 4 !== roleIndex) {
        bidSeq.pop();
      }
      this.updateRoomBidSeq(bidSeq);
    }
  }

  handleResetButton() {
    this.updateRoomBidSeq([]);
  }

  handleBackToLobbyButton() {
    // TODO: inform server
    this.props.history.push('/lobby');
  }

  render() {
    const playerRole = getPlayerRole(this.state.roomInfo, this.username);
    const whoseTurn = (this.state.boardInfo) ?
      getWhoseTurn(playerRole, this.state.boardInfo.dealer, this.state.bidSeq) : null;
    const bidSeqIsEnded = getBidSeqIsEnded(this.state.bidSeq);

    const handCardsDisplayProp = {
      playerRole,
      eastHand: (this.state.boardInfo) ? this.state.boardInfo.eastHand : null,
      westHand: (this.state.boardInfo) ? this.state.boardInfo.westHand : null,
      eastID: (this.state.roomInfo && this.state.roomInfo.eastID) ? this.state.roomInfo.eastID : '',
      westID: (this.state.roomInfo && this.state.roomInfo.westID) ? this.state.roomInfo.westID : '',
      whoseTurn,
      bidSeqIsEnded,
    };

    const mainUpperBlock = (
      <div className="main-upper-block">
        <HandCardsDisplay {...handCardsDisplayProp} />
      </div>
    );

    let mainLowerBlock = null;

    if (this.state.boardInfo) {
      const currentBid = getCurrentBid(this.state.bidSeq);
      const bidButtonBlockProp = {
        currentLevel: currentBid.level,
        currentSuit: currentBid.suit,
        shouldDoubleButtonDisabled: shouldDoubleButtonDisabled(this.state.bidSeq),
        shouldRedoubleButtonDisabled: shouldRedoubleButtonDisabled(this.state.bidSeq),
        handleBidButtonClick: this.handleBidButtonClick,
      };
      const bidSequenceDisplayProp = {
        dealer: this.state.boardInfo.dealer,
        vulnerability: this.state.boardInfo.vulnerability,
        bidSeq: this.state.bidSeq,
      };

      mainLowerBlock = (
        <div className="main-lower-block">
          <BidSequenceDisplay {...bidSequenceDisplayProp} />
          {(bidSeqIsEnded) && <ScoreBlock scoreList={this.state.boardInfo.scoreList} />}
          {(!bidSeqIsEnded && whoseTurn === playerRole) &&
            <BidButtonBlock {...bidButtonBlockProp} />}
          {(!bidSeqIsEnded && whoseTurn !== playerRole) &&
            <div className="empty-div" > Something Here </div>}
        </div>
      );
    }

    const roomToolsBlock = (
      <div className="room-tools-block">
        {(playerRole !== 'OBSERVER') &&
          <Button onClick={this.handleUndoButton} size="small" color="grey">Undo</Button>}
        {(playerRole !== 'OBSERVER') &&
          <Button onClick={this.handleResetButton} size="small" color="grey">Reset</Button>}
        {(this.roomName === this.username) &&
          <Button size="small" color="grey">Host Setting</Button>}
        {<Button onClick={this.handleBackToLobbyButton} size="small" color="grey">Back to Lobby</Button>}
      </div>
    );

    return (
      <div className="room-interface">
        <div className="room-main-block">
          {mainUpperBlock}
          {mainLowerBlock}
        </div>
        <Divider />
        {roomToolsBlock}
      </div>
    );
  }
}


RoomInterface.propTypes = propTypes;
RoomInterface.defaultProps = defaultProps;

export default withRouter(RoomInterface);
