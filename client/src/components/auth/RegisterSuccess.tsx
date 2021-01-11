import { Button, Card } from '@material-ui/core';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fadingBackground } from '../../utils/window';

export default function RegisterSuccess() {
  // background load effect
  useEffect(() => {
    fadingBackground();
  }, []);

  return (
    <div className="island-background-auth">
      <Card className="register-success">
        <h2>Success!</h2>
        <p>Congratulations, your account has been successfully created. </p>
        <Link to="/login">
          <Button color="primary" variant="contained">
            Login
          </Button>
        </Link>
      </Card>
    </div>
  );
}
