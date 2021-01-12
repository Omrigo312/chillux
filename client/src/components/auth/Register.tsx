import { Button, IconButton, InputAdornment, TextField } from '@material-ui/core';
import axios from 'axios';
import React, { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';
import LockIcon from '@material-ui/icons/Lock';
import EmailIcon from '@material-ui/icons/Email';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import PasswordStrengthBar from 'react-password-strength-bar';
import GoogleLogin from 'react-google-login';
import logo from '../../assets/images/logo-circle-transparent.png';
import { Link, Redirect } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { fadingBackground } from '../../utils/window';
import { googleLogin } from '../../utils/auth';
import LoginData from '../../models/LoginData';

const GOOGLE_CLIENT_ID = '1333376791-188hppfhtekbpieohomh2j1a2tsrv3ip.apps.googleusercontent.com';

export default function Register() {
  const { authState, login } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
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
    const res = await googleLogin(response);
    login(new LoginData(res.data.token, res.data.userType));
  };

  const googleFailureResponse = (response: any) => {
    console.log(`Failure ${response}`);
    alert('Failed to log in with Google');
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
    const body = JSON.stringify(formData);

    try {
      await axios.post('http://localhost:3001/api/users', body, config);
      window.location.replace('/register-success');
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
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
        <h2 className="form-header">Create Account</h2>
        <div className="input-field">
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
        <div className="input-field">
          <LockIcon style={{ marginRight: '0.5rem' }} />
          <TextField
            style={{ width: '100%' }}
            type={showPassword ? 'text' : 'password'}
            required
            value={password}
            label="Password"
            error={password.length < 6 && password.length > 0}
            variant="outlined"
            placeholder="New Password..."
            name="password"
            autoComplete="new-password"
            onChange={onFieldChange}
            InputProps={{
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
        </div>
        {password.length > 0 && <PasswordStrengthBar minLength={6} password={password} />}
        <Button className="form-button register-button" variant="contained" color="primary" type="submit">
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
