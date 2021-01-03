import { Button, IconButton, InputAdornment, TextField } from '@material-ui/core';
import axios from 'axios';
import GoogleLogin from 'react-google-login';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import LockIcon from '@material-ui/icons/Lock';
import EmailIcon from '@material-ui/icons/Email';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

export default function Register() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const { email, password } = formData;

  const onFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const onShowPasswordClicked = () => setShowPassword(!showPassword);

  const googleSuccessResponse = (response: any) => {
    console.log(`Success ${response.wt.cu}`);
    console.log(response);
  };

  const googleFailureResponse = (response: any) => {
    console.log(`Failure ${response.wt.cu}`);
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
      const errors = error.response.data.errors;
      errors.forEach((error: any) => {
        alert(error.msg);
      });
    }
  };

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
        clientId="1333376791-188hppfhtekbpieohomh2j1a2tsrv3ip.apps.googleusercontent.com"
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
