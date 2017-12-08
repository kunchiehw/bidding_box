import React, { Component } from 'react';
import logo from './logo.svg';
import RoomPage from './RoomPage.jsx';
import Signin from './Signin'
import './App.css';

class App extends Component {

  render() {
    const testHandleClick = (bid) => {
      console.log(bid);
    };

    const testProp = {
      handleClick: testHandleClick
    };

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <hr />
        <Signin />
        <hr />
        <RoomPage {...testProp}/>
      </div>
    );
  }
}

export default App;
