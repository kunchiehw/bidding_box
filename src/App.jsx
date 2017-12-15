import React, { Component } from 'react';
import logo from './logo.svg';
import RoomInterface from './room-interface/RoomInterface';
import Auth from './Auth';
import './App.css';
import { getSession } from './util/aws-helper';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      session: null,
    };
  }

  componentDidMount() {
    getSession().then((session) => {
      this.setState({ session });
    });
  }

  render() {
    const handleUpdateSession = (session) => {
      this.setState({ session });
    };

    const testProp = {
      role: 'TESTER',
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
    };

    const authProp = {
      isLoggedIn: this.state.session !== null,
      handleUpdateSession,
    };


    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <hr />
        <Auth {...authProp} />
        <hr />
        <RoomInterface {...testProp} />
      </div>
    );
  }
}

export default App;
