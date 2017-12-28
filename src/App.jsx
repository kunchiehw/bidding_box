import React, { Component } from 'react';
import LobbyInterface from './lobby-interface/LobbyInterface';
import Auth from './Auth';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      session: null,
    };
  }

  render() {
    const handleUpdateSession = (session) => {
      this.setState({ session });
    };

    const authProp = {
      isLoggedIn: this.state.session !== null,
      handleUpdateSession,
    };

    return (
      <div className="App">
        <Auth {...authProp} />
        <hr />
        <LobbyInterface jwtToken={this.state.session} />
      </div>
    );
  }
}

export default App;
