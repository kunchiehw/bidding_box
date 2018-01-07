import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Button, Form, Icon } from 'semantic-ui-react';
import './LoginInterface.css';

const propTypes = {
  handleUpdateJWTToken: PropTypes.func.isRequired,

  // props from HOC withRouter
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};


class LoginInterface extends Component {
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
    fetch(`${process.env.REACT_APP_BACKEND_SCHEMA}://${process.env.REACT_APP_BACKEND_URL}/token`, {
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
        this.props.handleUpdateJWTToken(data);
        this.props.history.push('/lobby');
      })
      .catch(() => {
        this.setState({ loading: false });
        this.props.handleUpdateJWTToken(null);
      });
  }

  render() {
    return (
      <div className="login-interface">
        <Form onSubmit={this.handleSigninSubmit}>
          <Form.Input
            label="Username"
            placeholder="Please enter your username"
            width="3"
            type="text"
            onChange={this.changeUsername}
          />
          <Form.Input
            label="Password"
            placeholder="Please enter your password"
            width="3"
            type="password"
            onChange={this.changePassword}
          />
          <Button type="submit" disabled={this.state.loading} color="green">
            <Icon name="sign in" />Submit
          </Button>
        </Form>
      </div>
    );
  }
}

LoginInterface.propTypes = propTypes;

export default withRouter(LoginInterface);
