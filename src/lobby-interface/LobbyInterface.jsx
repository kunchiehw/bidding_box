import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { decode } from 'jsonwebtoken';
import { Button } from 'semantic-ui-react';
import LobbyRoomList from './LobbyRoomList';

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
      loading: false,
    };
    this.username = decode(this.props.jwtToken).username;
    this.handleCreateTable = this.handleCreateTable.bind(this);
    this.handleRoomListClick = this.handleRoomListClick.bind(this);
    this.handleSignoutSubmit = this.handleSignoutSubmit.bind(this);
  }

  handleCreateTable() {
    // TODO: Inform server
    this.props.history.push(`/room/${this.username}`);
  }

  handleRoomListClick(roomName) {
    // TODO: Inform server
    this.props.history.push(`/room/${roomName}`);
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
          <Button
            className="sign-out-button"
            onClick={this.handleSignoutSubmit}
            disabled={this.state.loading}
            size="small"
          >
              Sign out
          </Button>
        </div>
        <Button
          className="create-table-button"
          onClick={this.handleCreateTable}
          size="small"
        >
            Create My Table
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

    return (
      <div>
        {lobbyHeaderDiv}
        <LobbyRoomList {...roomListTestProps} />
      </div>
    );
  }
}

LobbyInterface.propTypes = propTypes;
LobbyInterface.defaultProps = defaultProps;

export default withRouter(LobbyInterface);
