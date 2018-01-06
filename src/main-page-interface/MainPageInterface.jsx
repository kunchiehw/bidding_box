import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react';
import './MainPageInterface.css';
import logo from '../logo.svg';

const propTypes = {
  // props from HOC withRouter
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

function MainPageInterface(props) {
  const handleToLoginButtonClick = () => {
    props.history.push('/login');
  };

  return (
    <div className="main-page-interface">
      <header className="main-page-header">
        <img src={logo} className="main-page-logo" alt="logo" />
        <h1 className="main-page-title">Welcome to React</h1>
      </header>
      <Button className="to-login-button" size="small" onClick={handleToLoginButtonClick} color="green">
        <Icon name="sign in" />Log in
      </Button>
    </div>
  );
}

MainPageInterface.propTypes = propTypes;

export default withRouter(MainPageInterface);
