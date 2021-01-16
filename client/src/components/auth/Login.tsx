import { Button, IconButton, InputAdornment, TextField } from '@material-ui/core';
import GoogleLogin from 'react-google-login';
import { Link, Redirect } from 'react-router-dom';
import React, { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';
import LockIcon from '@material-ui/icons/Lock';
import EmailIcon from '@material-ui/icons/Email';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import LoginData from '../../models/LoginData';
import logo from '../../assets/images/logo-circle-transparent.png';
import { fadingBackground } from '../../utils/window';
import { googleLogin } from '../../utils/auth';
import { WindowContext } from '../../context/WindowContext';
import Alert from '../../models/Alert';
import { handleError } from '../../utils/error';

const GOOGLE_CLIENT_ID = '1333376791-188hppfhtekbpieohomh2j1a2tsrv3ip.apps.googleusercontent.com';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const { authState, login } = useContext(AuthContext);
  const { addAlert } = useContext(WindowContext);
  const { email, password } = formData;

  // background load effect
  useEffect(() => {
    fadingBackground();
  }, []);

  const onFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const onShowPasswordClicked = () => setShowPassword(!showPassword);

  const googleSuccessResponse = async (response: any) => {
    const res = await googleLogin(response, addAlert);
    login(new LoginData(res.data.token, res.data.userType));
  };

  const googleFailureResponse = (response: any) => {
    console.log(response);
    addAlert(new Alert('Failed to log in with Google', 'error', 3000));
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify(formData);

    try {
      const res = await axios.post('http://localhost:3001/api/users/login', body, config);
      login(new LoginData(res.data.token, res.data.userType));
    } catch (error) {
      handleError(error, addAlert);
    }
  };

  if (authState.isAuthenticated) {
    return <Redirect to="/vacations" />;
  }

  return (
    <div className="island-background-auth">
      <form className="form" autoComplete="on" onSubmit={onSubmit} method="post">
        <Link className="logo-container" to="/">
          <img src={logo} className="logo" alt="logo" />
          <div className="logo-text">
            <h2>Chillux</h2>
            <p>Luxury Vacations</p>
          </div>
        </Link>
        <h2 className="form-header">Log In</h2>
        <div className="input-field-icon">
          <EmailIcon style={{ marginRight: '0.5rem' }} />
          <TextField
            style={{ width: '100%' }}
            type="email"
            value={email}
            required
            label="Email"
            variant="outlined"
            placeholder="Your Email..."
            name="email"
            onChange={onFieldChange}
          />
        </div>
        <div className="input-field-icon">
          <LockIcon style={{ marginRight: '0.5rem' }} />
          <TextField
            style={{ width: '100%' }}
            type={showPassword ? 'text' : 'password'}
            required
            value={password}
            label="Password"
            variant="outlined"
            placeholder="Your Password..."
            name="password"
            autoComplete="current-password"
            onChange={onFieldChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility" onClick={onShowPasswordClicked}>
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
              inputProps: { maxLength: 30 },
            }}
          />
        </div>
        <Button className="form-button login-button" variant="contained" color="primary" type="submit">
          Login
        </Button>
        <GoogleLogin
          className="form-button google-button"
          clientId={GOOGLE_CLIENT_ID}
          buttonText="Continue with Google"
          onSuccess={googleSuccessResponse}
          onFailure={googleFailureResponse}
          cookiePolicy={'single_host_origin'}
          // isSignedIn={true}
        />
        <p className="form-footer">
          Not a member? <a href="/register">Sign up now!</a>
        </p>
      </form>
    </div>
  );
}
