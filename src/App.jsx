import React, { Component } from 'react';
import logo from './logo.svg';
import RoomInterface from './room-interface/RoomInterface';
import Signin from './Signin';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    };
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
        <Signin {...authProp} />
        <hr />
        <RoomInterface {...testProp} />
      </div>
    );
  }
}

export default App;
