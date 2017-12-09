import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { authenticateUser, signOut } from './util/aws-helper';


const propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  updateSession: PropTypes.func.isRequired,
};


class Auth extends Component {
  constructor(props) {
    super(props);
    this.changeUsername = this.changeUsername.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.handleSigninSubmit = this.handleSigninSubmit.bind(this);
    this.handleSignoutSubmit = this.handleSignoutSubmit.bind(this);

    this.state = {
      username: '',
      password: '',
      loading: false,
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
    this.setState({ loading: true });
    authenticateUser(this.state.username, this.state.password)
      .then((result) => {
        console.log(result);
        this.setState({ username: result.accessToken.payload.username, loading: false });
        this.props.updateSession(result);
      })
      .catch((err) => {
        console.log(err);
        this.setState({ loading: false });
        this.props.updateSession(null);
      });
  }

  handleSignoutSubmit(e) {
    e.preventDefault();
    this.setState({ loading: true });
    signOut()
      .then(() => {
        this.setState({ loading: false });
        this.props.updateSession(null);
      });
  }

  signin() {
    return (
      <div className="Signin">
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
        <form onSubmit={this.handleSignoutSubmit}>
          <div>
            <button type="submit" disabled={this.state.loading}>Sign Out</button>
          </div>
        </form>
      </div>
    );
  }

  render() {
    if (this.props.isLoggedIn) {
      return this.signout();
    }
    return this.signin();
  }
}

Auth.propTypes = propTypes;
export default Auth;
