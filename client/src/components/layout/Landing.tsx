import { Button } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="showcase" style={{ height: '100vh' }}>
      <video
        src="https://vod-progressive.akamaized.net/exp=1610079698~acl=%2A%2F1135811441.mp4%2A~hmac=a2756b4a6bd75fa3dccc34405dda7c3ab676e8180fe4f014918ed25b50ef0c18/vimeo-prod-skyfire-std-us/01/4585/11/297927791/1135811441.mp4"
        muted
        loop
        autoPlay
      ></video>
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
