import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import MainPageInterface from './main-page-interface/MainPageInterface';
import LobbyInterface from './lobby-interface/LobbyInterface';
import LoginInterface from './login-interface/LoginInterface';
import RoomInterface from './room-interface/RoomInterface';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jwtToken: null,
    };
    this.handleUpdateJWTToken = this.handleUpdateJWTToken.bind(this);
  }

  handleUpdateJWTToken(jwtToken) {
    this.setState({ jwtToken });
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={MainPageInterface} />
            <Route
              path="/login"
              render={() => (
                <LoginInterface handleUpdateJWTToken={this.handleUpdateJWTToken} />
                )}
            />
            <Route
              path="/lobby"
              render={props => ((this.state.jwtToken === null) ?
                <Redirect to={{ pathname: '/login', state: { from: props.location } }} /> :
                <LobbyInterface jwtToken={this.state.jwtToken} handleUpdateJWTToken={this.handleUpdateJWTToken} />)}
            />
            <Route
              path="/room/:roomName"
              render={props => ((this.state.jwtToken === null) ?
                <Redirect to={{ pathname: '/login', state: { from: props.location } }} /> :
                <RoomInterface jwtToken={this.state.jwtToken} />)}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
