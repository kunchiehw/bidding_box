import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

function MainPageInterface() {
  return (
    <div>
      <div>
        Lovely (?) Side Project
      </div>
      <Link to="/login">
        <Button className="to-login-button" size="small">
          Log in
        </Button>
      </Link>
    </div>
  );
}

export default MainPageInterface;
