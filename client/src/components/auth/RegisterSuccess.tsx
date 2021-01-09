import { Button, Card } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

export default function RegisterSuccess() {
  return (
    <div className="island-background-darken">
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
