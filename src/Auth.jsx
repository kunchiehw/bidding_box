import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

const propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  handleUpdateSession: PropTypes.func.isRequired,
};


class Auth extends Component {
  constructor(props) {
    super(props);
    this.changeUsername = this.changeUsername.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.handleSigninSubmit = this.handleSigninSubmit.bind(this);

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
    this.setState({ loading: true });
    fetch('http://localhost:8080/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
    })
      .then((res) => {
        this.setState({ loading: false });
        if (!res.ok) {
          throw Error(res.statusText);
        }
        return res.text();
      })
      .then((data) => {
        this.props.handleUpdateSession(data);
        this.props.history.push('/lobby');
      })
      .catch(() => {
        this.setState({ loading: false });
        this.props.handleUpdateSession(null);
      });
  }

  render() {
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
}

Auth.propTypes = propTypes;

export default withRouter(Auth);
