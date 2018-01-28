import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { decode } from 'jsonwebtoken';
import { Container, Header, Search, Button, Modal, Icon, List } from 'semantic-ui-react';
import './LobbyInterface.css';
import LobbyRoomList from './LobbyRoomList';
import { SERVER_API_HOST } from '../utils/constants';

const propTypes = {
  jwtToken: PropTypes.string,
  handleUpdateJWTToken: PropTypes.func.isRequired,

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
      roomListFull: [],
      roomListShow: [],
      loading: false,
    };
    this.username = decode(this.props.jwtToken).username;
    this.handleCreateTable = this.handleCreateTable.bind(this);
    this.handleRoomListClick = this.handleRoomListClick.bind(this);
    this.handleSignoutSubmit = this.handleSignoutSubmit.bind(this);
    this.handleRefreshRoomList = this.handleRefreshRoomList.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  componentDidMount() {
    this.handleRefreshRoomList();
  }

  handleRefreshRoomList(e) {
    if (e) e.preventDefault();
    this.setState({ loading: true });
    fetch(`${SERVER_API_HOST}/room`, {
      method: 'GET',
    })
      .then((res) => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        return res.text();
      })
      .then((data) => {
        const roomList = JSON.parse(data);
        this.setState({
          roomListFull: roomList,
          roomListShow: roomList,
          loading: false,
        });
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  }

  handleCreateTable(role) {
    console.log(role);
    fetch(`${SERVER_API_HOST}/room/${this.username}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.props.jwtToken}`,
      },
    });
    this.props.history.push(`/room/${this.username}`);
  }

  handleRoomListClick(roomName, seat) {
    if (seat) {
      const updatedInfo = (seat === 'EAST') ?
        { eastId: decode(this.props.jwtToken).username } : { westId: decode(this.props.jwtToken).username };
      fetch(`${SERVER_API_HOST}/room/${roomName}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.props.jwtToken}`,
        },
        body: JSON.stringify(updatedInfo),
      });
    }
    this.props.history.push(`/room/${roomName}`);
  }

  handleSignoutSubmit(e) {
    e.preventDefault();
    this.setState({ loading: true });
    this.props.handleUpdateJWTToken(null);
    this.props.history.push('/');
    this.setState({ loading: false });
  }

  handleSearchChange(e, data) {
    const re = new RegExp(_.escapeRegExp(data.value), 'i');
    const isMatch = result => re.test(result.id) || re.test(result.eastId) || re.test(result.westId);
    this.setState({
      roomListShow: _.filter(this.state.roomListFull, isMatch),
    });
  }

  render() {
    const lobbyHeaderDiv = (
      <div>
        <div>
          <p>
            { `Welcome to the lobby, ${this.username}! ` }

            <Button
              className="sign-out-button"
              onClick={this.handleSignoutSubmit}
              disabled={this.state.loading}
              size="tiny"
              color="red"
            >
              <Icon name="sign out" /> Sign out
            </Button>
          </p>
        </div>

        <List horizontal>
          <List.Item>
            <Modal trigger={
              <Button icon labelPosition="left" color="green">
                <Icon name="plus" />
                Create My Table
              </Button>}
            >
              <Header icon="plus" content="Create My Table" />
              <Modal.Content>
                Please select your role.
              </Modal.Content>
              <Modal.Actions>
                <Button onClick={() => this.handleCreateTable('WEST')} color="teal">
                  <Icon name="plus" /> Sit West
                </Button>
                <Button onClick={() => this.handleCreateTable('EAST')} color="teal">
                  <Icon name="plus" /> Sit East
                </Button>
                <Button onClick={() => this.handleCreateTable('OBSERVER')} color="blue">
                  <Icon name="plus" /> Watch
                </Button>
              </Modal.Actions>
            </Modal>
          </List.Item>
          <List.Item>
            <Button icon="refresh" onClick={this.handleRefreshRoomList} />
          </List.Item>
          <List.Item>
            <Search open={false} onSearchChange={this.handleSearchChange} />
          </List.Item>
        </List>

      </div>
    );

    const roomListTestProps = {
      roomList: this.state.roomListShow,
      handleClick: this.handleRoomListClick,
    };

    return (
      <Container className="lobby-interface" textAlign="center">
        {lobbyHeaderDiv}
        <LobbyRoomList {...roomListTestProps} />
      </Container>
    );
  }
}

LobbyInterface.propTypes = propTypes;
LobbyInterface.defaultProps = defaultProps;

export default withRouter(LobbyInterface);
