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
      isLoggedIn: false,
    };
  }

  componentDidMount() {
    getSession().then(() => {
      this.setState({ isLoggedIn: true });
    });
  }

  render() {
    const testHandleClick = (bid) => {
      console.log(bid);
    };

    const updateLogin = (isLoggedIn) => {
      this.setState({ isLoggedIn });
    };

    const testProp = {
      handleClick: testHandleClick,
    };

    const authProp = {
      isLoggedIn: this.state.isLoggedIn,
      updateLogin,
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
