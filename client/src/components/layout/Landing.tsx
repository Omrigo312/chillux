import { Button } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="island-background-darken" style={{ height: '100vh' }}>
      <div className="landing">
        <div className="landing-header">
          <h1>C h i l l u x</h1>
          <p> Find your perfect vacation. Treat yourself better. Chillux.</p>
        </div>
        <div className="landing-buttons">
          <Link to="/login">
            <Button className="login-button" variant="contained" color="primary">
              Login
            </Button>
          </Link>
          <Link to="/register">
            <Button className="register-button" variant="contained" color="primary">
              Register
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
