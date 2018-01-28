import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Grid, Segment, Header, Message, Button, Form, Icon, Divider } from 'semantic-ui-react';
import { SERVER_API_HOST } from '../utils/constants';
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
      errorMessage: null,
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
    fetch(`${SERVER_API_HOST}/token`, {
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
        this.setState({ loading: false, errorMessage: null });
        this.props.history.push('/lobby');
      })
      .catch((err) => {
        this.props.handleUpdateJWTToken(null);
        this.setState({ loading: false, errorMessage: err.message });
      });
  }

  render() {
    return (
      <Grid centered verticalAlign="middle" style={{ height: '100%' }}>
        <Grid.Column className="login-interface" style={{ width: '400px' }}>
          <Header as="h2" textAlign="center">Login to account</Header>
          <Message
            header={this.state.errorMessage}
            hidden={!this.state.errorMessage}
            error
            icon="warning circle"
          />
          <Segment padded>
            <Form onSubmit={this.handleSigninSubmit}>
              <Form.Input
                placeholder="Username"
                required
                icon="user"
                iconPosition="left"
                type="text"
                onChange={this.changeUsername}
              />
              <Form.Input
                placeholder="Password"
                required
                icon="lock"
                iconPosition="left"
                type="password"
                onChange={this.changePassword}
              />
              <Button type="submit" disabled={this.state.loading} color="green" fluid size="large">
                <Icon name="sign in" />Login
              </Button>
            </Form>
          </Segment>
          <Divider hidden />
        </Grid.Column>
      </Grid>
    );
  }
}

LoginInterface.propTypes = propTypes;

export default withRouter(LoginInterface);
