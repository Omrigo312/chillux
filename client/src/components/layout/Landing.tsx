/* eslint-disable react-hooks/exhaustive-deps */
import { Button, CircularProgress } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { WindowContext } from '../../context/WindowContext';

export default function Landing() {
  const [isLoading, setIsLoading] = useState(true);
  const { setTransparentNavbar } = useContext(WindowContext);

  useEffect(() => {
    document.getElementById('video').addEventListener(
      'loadeddata',
      () => {
        setIsLoading(false);
        setTransparentNavbar(true);
      },
      false
    );
    setTransparentNavbar(false);
  }, []);

  const background = isLoading ? 'white' : null;

  return (
    <div className="showcase" style={{ height: '100vh' }}>
      <video
        id="video"
        src="https://drive.google.com/uc?export=download&id=135XjCsDqFeniYO9goOoeexaZERYWvGZW"
        loop
        muted
        autoPlay
        preload="auto"
      ></video>
      <div className="overlay" style={{ background: background }}></div>

      {isLoading ? (
        <CircularProgress style={{ justifySelf: 'center' }} />
      ) : (
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
      )}
    </div>
  );
}
