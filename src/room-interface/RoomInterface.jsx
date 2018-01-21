import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { decode } from 'jsonwebtoken';
import { Container, Button, Divider, Dimmer, Loader } from 'semantic-ui-react';
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
      roomInfo: null,
      boardInfo: null,
    };

    this.socket = null;
    this.username = decode(this.props.jwtToken).username;
    this.roomName = this.props.match.params.roomName;

    this.updateWebSocket = this.updateWebSocket.bind(this);
    this.updateRoomBidSeq = this.updateRoomBidSeq.bind(this);

    this.handleBidButtonClick = this.handleBidButtonClick.bind(this);
    this.handleClickToSit = this.handleClickToSit.bind(this);
    this.handleUndoButton = this.handleUndoButton.bind(this);
    this.handleResetButton = this.handleResetButton.bind(this);
    this.handleLeaveSeat = this.handleLeaveSeat.bind(this);
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

  componentWillUnmount() {
    if (this.socket) {
      this.socket.close();
    }
  }

  updateWebSocket(jwtToken) {
    if (jwtToken) {
      this.socket = new WebSocket(`ws://${process.env.REACT_APP_BACKEND_URL}/room/${this.roomName}`);
      this.socket.onopen = () => {
        this.socket.send(jwtToken);
      };
      this.socket.onmessage = (event) => {
        const { bidSeq, roomInfo, boardInfo } = JSON.parse(event.data);
        if (bidSeq) {
          this.setState({ bidSeq: JSON.parse(bidSeq) });
        }
        if (roomInfo) {
          this.setState({ roomInfo });
        }
        if (boardInfo) {
          this.setState({ boardInfo: JSON.parse(boardInfo) });
        }
      };
      this.socket.onclose = () => {
        this.props.history.push('/lobby');
      };
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

  handleClickToSit(seat) {
    const updatedInfo = (seat === 'EAST') ? { eastID: this.username } : { westID: this.username };
    fetch(`${process.env.REACT_APP_BACKEND_SCHEMA}://${process.env.REACT_APP_BACKEND_URL}/room/${this.roomName}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.props.jwtToken}`,
      },
      body: JSON.stringify(updatedInfo),
    });
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

  handleLeaveSeat() {
    const playerRole = getPlayerRole(this.state.roomInfo, this.username);
    let updatedInfo = null;
    if (playerRole === 'WEST') updatedInfo = 'westID';
    else if (playerRole === 'EAST') updatedInfo = 'eastID';
    if (updatedInfo) {
      const roomInfo = {};
      roomInfo[updatedInfo] = '';
      fetch(`${process.env.REACT_APP_BACKEND_SCHEMA}://${process.env.REACT_APP_BACKEND_URL}/room/${this.roomName}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.props.jwtToken}`,
        },
        body: JSON.stringify({ roomInfo }),
      });
    }
  }

  handleBackToLobbyButton() {
    this.handleLeaveSeat();
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
      bidSeqIsEnded,
      handleClickToSit: this.handleClickToSit,
    };

    const upperBlock = (
      <Container className="upper-block">
        <HandCardsDisplay {...handCardsDisplayProp} />
      </Container>
    );

    let middleBlock = null;

    if (this.state.boardInfo) {
      const activeDimmer = (whoseTurn !== playerRole);
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

      middleBlock = (
        <Container className="middle-block">
          <BidSequenceDisplay {...bidSequenceDisplayProp} />
          {(bidSeqIsEnded) && <ScoreBlock scoreList={this.state.boardInfo.scoreList} />}
          {(!bidSeqIsEnded) &&
            <Dimmer.Dimmable className="bid-button-block-dimmer" as={Container} dimmed={activeDimmer} >
              <Dimmer active={activeDimmer} inverted>
                <Loader active={activeDimmer} inverted indeterminate>
                  SHOW SOME MESSAGE
                </Loader>
              </Dimmer>
              <BidButtonBlock {...bidButtonBlockProp} />
            </Dimmer.Dimmable>}
        </Container>
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
        {<Button onClick={this.handleLeaveSeat} size="small" color="grey">Leave seat</Button>}
        {<Button onClick={this.handleBackToLobbyButton} size="small" color="grey">Back to Lobby</Button>}
      </div>
    );

    return (
      <Container className="room-interface" textAlign="center">
        {upperBlock}
        {middleBlock}
        <Divider />
        {roomToolsBlock}
      </Container>
    );
  }
}


RoomInterface.propTypes = propTypes;
RoomInterface.defaultProps = defaultProps;

export default withRouter(RoomInterface);
