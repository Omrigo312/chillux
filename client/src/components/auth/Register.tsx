import { Button, IconButton, InputAdornment, TextField } from '@material-ui/core';
import axios from 'axios';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import LockIcon from '@material-ui/icons/Lock';
import EmailIcon from '@material-ui/icons/Email';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import PasswordStrengthBar from 'react-password-strength-bar';
import GoogleLogin from 'react-google-login';
import logo from '../../assets/images/logo-circle-transparent.png';
import { Link } from 'react-router-dom';

const GOOGLE_CLIENT_ID = '1333376791-188hppfhtekbpieohomh2j1a2tsrv3ip.apps.googleusercontent.com';

export default function Register() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
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

    if (password.length < 6) {
      return alert('Password is too short!');
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({ email, password });

    try {
      const res = await axios.post('http://localhost:3001/api/users', body, config);
      console.log(`Server Response: ${JSON.stringify(res.data)}`);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

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
        <h2 className="form-header">Create Account</h2>
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
          error={password.length < 6 && password.length > 0}
          variant="outlined"
          placeholder="New Password..."
          name="password"
          autoComplete="new-password"
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
            inputProps: { minLength: 6, maxLength: 30 },
          }}
        />
        {password.length > 0 && <PasswordStrengthBar minLength={6} password={password} />}
        <Button className="form-button" variant="contained" color="primary" type="submit">
          Sign Up
        </Button>
        <GoogleLogin
          className="form-button google-button"
          clientId={GOOGLE_CLIENT_ID}
          buttonText="Continue with Google"
          onSuccess={googleSuccessResponse}
          onFailure={googleFailureResponse}
          cookiePolicy={'single_host_origin'}
        />
        <p className="form-footer">
          Already have an account? <a href="/login">Sign in</a>
        </p>
      </form>
    </div>
  );
}
