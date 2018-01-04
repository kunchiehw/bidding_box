import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import MainPageInterface from './main-page-interface/MainPageInterface';
import LobbyInterface from './lobby-interface/LobbyInterface';
import Auth from './Auth';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      session: null,
    };
    this.handleUpdateSession = this.handleUpdateSession.bind(this);
  }

  handleUpdateSession(session) {
    this.setState({ session });
  }

  render() {
    const authProp = {
      isLoggedIn: this.state.session !== null,
      handleUpdateSession: this.handleUpdateSession,
    };

    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={MainPageInterface} />
            <Route
              path="/login"
              render={() => (
                <Auth {...authProp} />
                )}
            />
            <Route
              path="/lobby"
              render={props => ((this.state.session === null) ?
                <Redirect to={{ pathname: '/login', state: { from: props.location } }} /> :
                <LobbyInterface jwtToken={this.state.session} handleUpdateSession={this.handleUpdateSession} />)}
            />
          </Switch>
        </BrowserRouter>
      </div>
      /*
      <div className="App">
        <Auth {...authProp} />
        <hr />
        <LobbyInterface jwtToken={this.state.session} />
      </div>
      */
    );
  }
}

export default App;
