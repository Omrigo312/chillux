import { Button, IconButton, InputAdornment, TextField } from '@material-ui/core';
import GoogleLogin from 'react-google-login';
import { Redirect } from 'react-router-dom';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import LockIcon from '@material-ui/icons/Lock';
import EmailIcon from '@material-ui/icons/Email';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

const GOOGLE_CLIENT_ID = '1333376791-188hppfhtekbpieohomh2j1a2tsrv3ip.apps.googleusercontent.com';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { email, password } = formData;

  const onFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const onShowPasswordClicked = () => setShowPassword(!showPassword);

  const googleSuccessResponse = (response: any) => {
    console.log(`Success ${JSON.stringify(response.profileObj)}`);
    console.log(response);
    setIsLoggedIn(true);
  };

  const googleFailureResponse = (response: any) => {
    console.log(`Failure ${response}`);
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    console.log('You are logged in');
    setIsLoggedIn(true);
  };

  if (isLoggedIn) {
    return <Redirect to="/register" />;
  }

  return (
    <form className="form" autoComplete="on" onSubmit={onSubmit} method="post">
      <h2>Log In</h2>
      <TextField
        type="email"
        value={email}
        required
        className="input-field"
        label="Email"
        variant="outlined"
        placeholder="Your Email..."
        name="email"
        onChange={onFieldChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EmailIcon />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        type={showPassword ? 'text' : 'password'}
        required
        value={password}
        className="input-field"
        label="Password"
        variant="outlined"
        placeholder="Your Password..."
        name="password"
        autoComplete="current-password"
        onChange={onFieldChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton aria-label="toggle password visibility" onClick={onShowPasswordClicked}>
                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            </InputAdornment>
          ),
          inputProps: { min: 0, max: 10 },
        }}
      />
      <Button className="form-button" variant="contained" color="primary" type="submit">
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
      <p>
        Not a member? <a href="/register">Sign up now!</a>
      </p>
    </form>
  );
}
