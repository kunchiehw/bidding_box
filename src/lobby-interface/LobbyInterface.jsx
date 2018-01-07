import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { decode } from 'jsonwebtoken';
import { Button } from 'semantic-ui-react';
import './LobbyInterface.css';
import LobbyRoomList from './LobbyRoomList';

const propTypes = {
  jwtToken: PropTypes.string,
  handleUpdateSession: PropTypes.func.isRequired,

  // props from HOC withRouter
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const defaultProps = {
  jwtToken: null,
};

class LobbyInterface extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomList: [
        {
          roomName: 'Temporary',
          eastID: 'Temporary',
        },
        {
          roomName: 'Whatever',
          westID: 'What',
          eastID: 'Ever',
        },
        {
          roomName: 'LOL',
          westID: 'LMS',
        },
        {
          roomName: 'Bridge',
        },
      ],
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
          <div className="lobby-welcome-banner">
            { `Welcome to the lobby, ${this.username}! ` }
          </div>
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
      roomList: this.state.roomList,
      handleClick: this.handleRoomListClick,
    };

    return (
      <div className="lobby-interface">
        {lobbyHeaderDiv}
        <LobbyRoomList {...roomListTestProps} />
      </div>
    );
  }
}

LobbyInterface.propTypes = propTypes;
LobbyInterface.defaultProps = defaultProps;

export default withRouter(LobbyInterface);
