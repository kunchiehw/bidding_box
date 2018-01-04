import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import LobbyRoomList from './LobbyRoomList';
import RoomInterface from '../room-interface/RoomInterface';

const propTypes = {
  jwtToken: PropTypes.string,
  handleUpdateSession: PropTypes.func.isRequired,
};

const defaultProps = {
  jwtToken: null,
};

class LobbyInterface extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomName: null,
      role: null,
      loading: false,
    };
    this.handleCreateTable = this.handleCreateTable.bind(this);
    this.handleLeaveTable = this.handleLeaveTable.bind(this);
    this.handleRoomListClick = this.handleRoomListClick.bind(this);
    this.handleSignoutSubmit = this.handleSignoutSubmit.bind(this);
  }

  handleCreateTable() {
    // TODO: Inform server

    this.setState({
      roomName: 'shouldBeId',

      // TODO: decide what the proper role is
      role: 'TESTER',
    });
  }

  handleLeaveTable() {
    // TODO: Inform server

    this.setState({
      roomName: null,
      role: null,
    });
  }

  handleRoomListClick(roomName, role) {
    // TODO: Inform server

    this.setState({
      roomName,
      role,
    });
  }

  handleSignoutSubmit(e) {
    e.preventDefault();
    this.setState({ loading: true });
    this.props.handleUpdateSession(null);
    this.props.history.push('/');
    this.setState({ loading: false });
  }

  render() {
    const lobbyHeaderDiv = (
      <div className="lobby-header">
        <div>
          { 'Welcome to the lobby. ' }
          <form onSubmit={this.handleSignoutSubmit}>
            <div>
              <button type="submit" disabled={this.state.loading}>Sign Out</button>
            </div>
          </form>
        </div>
        <Button
          className="create-table-button"
          onClick={this.handleCreateTable}
          disabled={this.state.roomName !== null}
          size="small"
        >
            Create table
        </Button>
        <Button
          className="leave-table-button"
          onClick={this.handleLeaveTable}
          disabled={this.state.roomName === null}
          size="small"
        >
            Leave table
        </Button>
      </div>
    );

    const roomListTestProps = {
      roomList: [
        {
          roomName: 'TEST',
          eastOccupied: true,
          westOccupied: false,
        },
      ],
      handleClick: this.handleRoomListClick,
    };

    const roomTestProps = {
      role: this.state.role,
      vulnerability: 'NS',
      dealer: 'NORTH',
      eastHand: ['AKQJT98765432', '', '', ''],
      westHand: ['', 'KQJT9', 'KQJT', 'KQJT'],
      eastID: 'Jarron',
      westID: 'wkc',
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
      roomName: this.state.roomName,
      jwtToken: this.props.jwtToken,
    };

    if (this.props.jwtToken === null) {
      return (
        <div>
          Please log in.
        </div>
      );
    }

    return (
      <div>
        {lobbyHeaderDiv}
        {(this.state.roomName === null) ?
          <LobbyRoomList {...roomListTestProps} />
          : <RoomInterface {...roomTestProps} />
        }
      </div>
    );
  }
}

LobbyInterface.propTypes = propTypes;
LobbyInterface.defaultProps = defaultProps;

export default withRouter(LobbyInterface);
