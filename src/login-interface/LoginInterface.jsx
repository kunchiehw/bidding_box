import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Grid, Container, Header, Button, Form, Icon } from 'semantic-ui-react';
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
        if (!res.ok) {
          throw Error(res.statusText);
        }
        return res.text();
      })
      .then((data) => {
        this.props.handleUpdateJWTToken(data);
        this.setState({ loading: false });
        this.props.history.push('/lobby');
      })
      .catch(() => {
        this.props.handleUpdateJWTToken(null);
        this.setState({ loading: false });
      });
  }

  render() {
    return (
      <Grid centered verticalAlign="middle" style={{ height: '100%' }}>
        <Grid.Column textAlign="center" className="login-interface" style={{ width: '400px' }}>
          <Header as="h2">Login to account</Header>
          <Form onSubmit={this.handleSigninSubmit}>
            <Form.Input
              placeholder="Username"
              required
              type="text"
              onChange={this.changeUsername}
            />
            <Form.Input
              placeholder="Password"
              required
              type="password"
              onChange={this.changePassword}
            />
            <Button type="submit" disabled={this.state.loading} color="green" fluid>
              <Icon name="sign in" />Submit
            </Button>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

LoginInterface.propTypes = propTypes;

export default withRouter(LoginInterface);
