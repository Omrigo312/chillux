import { Button, IconButton, InputAdornment, TextField } from '@material-ui/core';
import GoogleLogin from 'react-google-login';
import { Link, Redirect } from 'react-router-dom';
import React, { ChangeEvent, FormEvent, useContext, useState } from 'react';
import LockIcon from '@material-ui/icons/Lock';
import EmailIcon from '@material-ui/icons/Email';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import LoginData from '../../models/LoginData';
import logo from '../../assets/images/logo-circle-transparent.png';

const GOOGLE_CLIENT_ID = '1333376791-188hppfhtekbpieohomh2j1a2tsrv3ip.apps.googleusercontent.com';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const { authState, login } = useContext(AuthContext);
  const { email, password } = formData;

  const onFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const onShowPasswordClicked = () => setShowPassword(!showPassword);

  const googleSuccessResponse = (response: any) => {
    console.log(`Success ${JSON.stringify(response.profileObj)}`);
    console.log(response);
  };

  const googleFailureResponse = (response: any) => {
    console.log(`Failure ${response}`);
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({ email, password });

    try {
      const res = await axios.post('http://localhost:3001/api/users/login', body, config);
      console.log(`Server Response: ${JSON.stringify(res.data)}`);
      login(new LoginData(res.data.token, res.data.userType));
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  if (authState.isAuthenticated) {
    return <Redirect to="/vacations" />;
  }

  return (
    <div className="island-background-darken">
      <form className="form" autoComplete="on" onSubmit={onSubmit} method="post">
        <Link className="logo-container" to="/">
          <img src={logo} className="logo" alt="logo" />
          <div className="logo-text">
            <h2>Chillux</h2>
            <p>Luxury Vacations</p>
          </div>
        </Link>
        <h2 className="form-header">Log In</h2>
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
