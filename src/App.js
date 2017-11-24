import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logo from './logo.svg';
import './App.css';
import BiddingPanel from './bidding_panel/BiddingPanel.jsx';
import {SEATS, VULS} from './util/Util.jsx';

const propTypes = {
  seat: PropTypes.oneOf(SEATS),
  vul: PropTypes.oneOf(VULS)
};

const defaultProps = {

};

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      bidSeq: []
    };
  }

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
        <BiddingPanel {...testProp}/>
      </div>
    );
  }
}

App.propTypes = propTypes;
App.defaultProps = defaultProps;

export default App;
