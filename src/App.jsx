import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import { decode } from 'jsonwebtoken';
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
    this.cookies = new Cookies();
  }

  componentWillMount() {
    const jwtToken = this.cookies.get('jwtToken');
    if (jwtToken) {
      if (decode(jwtToken).exp > Math.floor(Date.now() / 1000)) {
        this.setState({ jwtToken });
      } else {
        this.cookies.remove('jwtToken');
      }
    }
  }

  handleUpdateJWTToken(jwtToken) {
    if (jwtToken) {
      this.cookies.set('jwtToken', jwtToken);
    } else {
      this.cookies.remove('jwtToken');
    }

    this.setState({ jwtToken });
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                this.state.jwtToken ? (<Redirect to="/lobby" />) : (<Redirect to="/login" />)
              )}
            />
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
