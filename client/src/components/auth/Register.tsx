import { Button, IconButton, InputAdornment, TextField } from '@material-ui/core';
import React, { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';
import LockIcon from '@material-ui/icons/Lock';
import EmailIcon from '@material-ui/icons/Email';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import PasswordStrengthBar from 'react-password-strength-bar';
import GoogleLogin from 'react-google-login';
import logo from '../../assets/images/logo-circle-transparent.png';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { fadingBackground } from '../../utils/window';
import { googleLogin } from '../../utils/auth';
import LoginData from '../../models/LoginData';
import { WindowContext } from '../../context/WindowContext';
import Alert from '../../models/Alert';
import { handleError } from '../../utils/error';
import { app } from '../../utils/axiosConfig';

const GOOGLE_CLIENT_ID = '1333376791-188hppfhtekbpieohomh2j1a2tsrv3ip.apps.googleusercontent.com';

export default function Register() {
  const { authState, login } = useContext(AuthContext);
  const { addAlert } = useContext(WindowContext);

  const [formData, setFormData] = useState({ email: '', password: '', passwordRepeat: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRepeat, setShowPasswordRepeat] = useState(false);

  const history = useHistory();
  const { email, password, passwordRepeat } = formData;

  // background load effect
  useEffect(() => {
    fadingBackground();
  }, []);

  const onFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const onShowPasswordClicked = () => setShowPassword(!showPassword);
  const onShowPasswordRepeatClicked = () => setShowPasswordRepeat(!showPasswordRepeat);

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

    if (password !== passwordRepeat) {
      return addAlert(new Alert('Passwords do not match!', 'error', 3000));
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify(formData);

    try {
      await app.post('users', body, config);
      history.push('/register-success');
    } catch (error) {
      handleError(error, addAlert);
    }
  };

  if (authState.isAuthenticated) {
    return <Redirect to="/vacations" />;
  }

  const passMargin = password.length > 0 ? '5px' : '1.5rem';
  const errorHelperText = password !== passwordRepeat ? 'Passwords do not match!' : '';

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
        <div className="input-field-icon" style={{ marginTop: passMargin }}>
          <LockIcon style={{ marginRight: '0.5rem' }} />
          <TextField
            style={{ width: '100%' }}
            type={showPasswordRepeat ? 'text' : 'password'}
            required
            value={passwordRepeat}
            label="Repeat Password"
            error={password !== passwordRepeat}
            variant="outlined"
            placeholder="Repeat your password"
            name="passwordRepeat"
            onChange={onFieldChange}
            helperText={errorHelperText}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility" onClick={onShowPasswordRepeatClicked}>
                    {showPasswordRepeat ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
              inputProps: { maxLength: 30 },
            }}
          />
        </div>
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
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </form>
    </div>
  );
}
