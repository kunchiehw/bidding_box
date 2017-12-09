import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { authenticateUser } from './cognito';


const propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  updateLogin: PropTypes.func.isRequired,
};


class Signin extends Component {
  constructor(props) {
    super(props);
    this.changeUsername = this.changeUsername.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.handleSigninSubmit = this.handleSigninSubmit.bind(this);

    this.state = {
      username: '',
      password: '',
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
    authenticateUser(this.state.username, this.state.password)
      .then((result) => {
        console.log(result);
        this.setState({ username: result.accessToken.payload.username });
        this.props.updateLogin(true);
      })
      .catch((err) => {
        console.log(err);
        this.props.updateLogin(false);
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
    if (this.props.isLoggedIn) {
      return this.signout();
    }
    return this.signin();
  }
}

Signin.propTypes = propTypes;
export default Signin;
