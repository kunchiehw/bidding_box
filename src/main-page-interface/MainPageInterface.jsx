import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import './MainPageInterface.css';
import logo from '../logo.svg';

function MainPageInterface(props) {
  const handleToLoginButtonClick = () => {
    props.history.push('/login');
  };

  return (
    <div>
      <header className="main-page-header">
        <img src={logo} className="main-page-logo" alt="logo" />
        <h1 className="main-page-title">Welcome to React</h1>
      </header>
      <hr />
      <Button className="to-login-button" size="small" onClick={handleToLoginButtonClick}>
        Log in
      </Button>
    </div>
  );
}

export default withRouter(MainPageInterface);
