/* eslint-disable react-hooks/exhaustive-deps */
import { Button, CircularProgress } from '@material-ui/core';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { WindowContext, WindowProvider } from '../../context/WindowContext';

export default function Landing() {
  const [isLoading, setIsLoading] = useState(true);
  const { setTransparentNavbar } = useContext(WindowContext);
  const { authState } = useContext(AuthContext);

  const onVideoLoad = () => {
    setIsLoading(false);
    setTransparentNavbar(true);
  };

  useEffect(() => {
    const videoElement = document.getElementById('video');
    videoElement.addEventListener('loadeddata', onVideoLoad, false);
    setTransparentNavbar(false);
    return () => {
      videoElement.removeEventListener('loadeddata', onVideoLoad, false);
    };
  }, []);

  const background = isLoading ? 'white' : null;

  return (
    <WindowProvider>
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

        {authState.isAuthenticated ? (
          <Redirect to="/vacations" />
        ) : (
          <div className="landing">
            {isLoading ? (
              <CircularProgress style={{ justifySelf: 'center' }} />
            ) : (
              <Fragment>
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
              </Fragment>
            )}
          </div>
        )}
      </div>
    </WindowProvider>
  );
}
