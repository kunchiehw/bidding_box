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
                <LobbyInterface jwtToken="this is test token" />)}
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
