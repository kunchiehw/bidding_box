import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RoomInterface from '../room-interface/RoomInterface';

const propTypes = {
  jwtToken: PropTypes.string,
};

const defaultProps = {
  jwtToken: null,
};

class LobbyInterface extends Component {
  constructor(props) {
    super(props);
    this.state = {
      finalTableID: null,
      finalRole: null,
      enteredTableID: '',
      chosenRole: 'TESTER',
      loading: false,
    };
    this.handleTableIDChange = this.handleTableIDChange.bind(this);
    this.handleRoleChange = this.handleRoleChange.bind(this);
    this.handleTableAndRoleSubmit = this.handleTableAndRoleSubmit.bind(this);
    this.handleLeaveTable = this.handleLeaveTable.bind(this);
  }

  handleTableIDChange(e) {
    this.setState({ enteredTableID: e.target.value });
  }

  handleRoleChange(e) {
    this.setState({ chosenRole: e.target.value });
  }

  handleTableAndRoleSubmit(e) {
    e.preventDefault();
    // TODO: Fetch table state from server
    this.setState({
      finalTableID: this.state.enteredTableID,
      finalRole: this.state.chosenRole,
    });
  }

  handleLeaveTable() {
    // TODO: inform server.
    this.setState({
      finalTableID: null,
      finalRole: null,
    });
  }

  render() {
    const testProp = {
      role: this.state.finalRole,
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
      roomName: this.state.finalTableID,
      jwtToken: this.props.jwtToken,
    };

    if (this.props.jwtToken) {
      if (this.state.finalTableID && this.state.finalRole) {
        return (
          <div>
            <div>
              { `Welcome to table ${this.state.finalTableID}. Your role is ${this.state.finalRole}. ` }
              <button disabled={this.state.loading} onClick={this.handleLeaveTable}> Leave Table </button>
            </div>
            <hr />
            <RoomInterface {...testProp} />
          </div>
        );
      }
      return (
        <div>
          <div> Welcome to lobby. Please enter your table ID and select your role. </div>
          <form onSubmit={this.handleTableAndRoleSubmit}>
            <div>
              <input
                value={this.state.enteredTableID}
                placeholder="Table ID"
                type="text"
                onChange={this.handleTableIDChange}
              />
            </div>
            <label htmlFor="EAST">
              <input
                type="radio"
                value="EAST"
                checked={this.state.chosenRole === 'EAST'}
                onChange={this.handleRoleChange}
              />
              {' EAST '}
            </label>
            <label htmlFor="WEST">
              <input
                type="radio"
                value="WEST"
                checked={this.state.chosenRole === 'WEST'}
                onChange={this.handleRoleChange}
              />
              {' WEST '}
            </label>
            <label htmlFor="OBSERVER">
              <input
                type="radio"
                value="OBSERVER"
                checked={this.state.chosenRole === 'OBSERVER'}
                onChange={this.handleRoleChange}
              />
              {' OBSERVER '}
            </label>
            <label htmlFor="TESTER">
              <input
                type="radio"
                value="TESTER"
                checked={this.state.chosenRole === 'TESTER'}
                onChange={this.handleRoleChange}
              />
              {' TESTER '}
            </label>
            <div>
              <button type="submit" disabled={this.state.loading}>Select</button>
            </div>
          </form>
        </div>
      );
    }

    return (
      <div> You have to log in. </div>
    );
  }
}

LobbyInterface.propTypes = propTypes;
LobbyInterface.defaultProps = defaultProps;

export default LobbyInterface;
