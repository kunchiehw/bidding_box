import React, { Component } from 'react';
import { authenticateUser } from './cognito';

class Signin extends Component {
  constructor(props) {
    super(props);
    this.changeUsername = this.changeUsername.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.handleSigninSubmit = this.handleSigninSubmit.bind(this);

    this.state = {
      username: '',
      password: '',
      isLoggedIn: false,
    };
  }

  changeUsername(e) {
    this.setState({ username: e.target.value });
  }

  changePassword(e) {
    this.setState({ password: e.target.value });
  }

  handleSigninSubmit(e) {
    e.preventDefault();
    console.log('Entered:', this.state);
    authenticateUser(this.state.username, this.state.password, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(result);
      this.setState({ isLoggedIn: true, username: result.accessToken.payload.username });
    });
  }

  signin() {
    return (
      <div className="Signin">
        <h2>Sign In</h2>
        <form onSubmit={this.handleSigninSubmit}>
          <div>
            <input
              value={this.state.username}
              placeholder="username"
              type="text"
              onChange={this.changeUsername}
            />
          </div>
          <div>
            <input
              value={this.state.password}
              placeholder="Password"
              type="password"
              minLength={6}
              onChange={this.changePassword}
            />
          </div>
          <div>
            <button type="submit" disabled={this.state.loading}>Sign In</button>
          </div>
        </form>
      </div>
    );
  }

  signout() {
    return (
      <div>
        <h2>Hi, {this.state.username}</h2>
      </div>
    );
  }

  render() {
    if (this.state.isLoggedIn) {
      return this.signout();
    }
    return this.signin();
  }
}

export default Signin;
