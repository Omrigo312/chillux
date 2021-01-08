import { Button } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import showcase from '../../assets/videos/showcase.mp4';

export default function Landing() {
  return (
    <div className="showcase" style={{ height: '100vh' }}>
      <video src={showcase} muted loop autoPlay></video>
      <div className="overlay"></div>
      <div className="landing">
        <div className="landing-header">
          <h2>Chillux</h2>
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
