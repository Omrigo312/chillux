import { Button, IconButton, InputAdornment, TextField } from '@material-ui/core';
import GoogleLogin from 'react-google-login';
import { Link, Redirect } from 'react-router-dom';
import React, { ChangeEvent, FormEvent, Fragment, useContext, useEffect, useState } from 'react';
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
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import WarningIcon from '@material-ui/icons/Warning';

export default function Account() {
  const { authState } = useContext(AuthContext);
  const { navbarHeight, windowWidth } = useContext(WindowContext);
  const { email, firstName, lastName } = authState.user;

  const [formData, setFormData] = useState({
    password: '',
    passwordRepeat: '',
    firstNameForm: firstName,
    lastNameForm: lastName,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRepeat, setShowPasswordRepeat] = useState(false);
  const { password, passwordRepeat, firstNameForm, lastNameForm } = formData;

  const onShowPasswordClicked = () => setShowPassword(!showPassword);
  const onShowPasswordRepeatClicked = () => setShowPasswordRepeat(!showPasswordRepeat);

  const onFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const deleteAccount = () => {};

  const onSubmit = () => { 
    
  };
  
  const marginTop = windowWidth < 768 ? navbarHeight + 25 : 0;

  return (
    <div className="account">
      <h1 style={{ marginTop }}>Update Your Account Information:</h1>
      <form className="form" autoComplete="on" onSubmit={onSubmit} method="post">
        {firstName && lastName ? (
          <h2 className="form-header">{`${firstName} ${lastName}`}</h2>
        ) : (
          <h2 className="form-header">{email}</h2>
        )}
        <div className="input-field-icon">
          <AccountCircleIcon style={{ marginRight: '0.5rem' }} />
          <div className="form-duo" style={{ width: '100%' }}>
            <TextField
              type="text"
              value={firstNameForm}
              label="First name"
              variant="outlined"
              placeholder="Add your first name"
              name="firstNameForm"
              onChange={onFieldChange}
            />
            <TextField
              type="text"
              value={lastNameForm}
              label="Last name"
              variant="outlined"
              placeholder="Add your last name"
              name="lastNameForm"
              onChange={onFieldChange}
            />
          </div>
        </div>
        <div className="input-field-icon">
          <LockIcon style={{ marginRight: '0.5rem' }} />
          <TextField
            style={{ width: '100%' }}
            type={showPassword ? 'text' : 'password'}
            value={password}
            label="New password"
            variant="outlined"
            placeholder="Choose a new password..."
            name="password"
            onChange={onFieldChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility" onClick={onShowPasswordClicked}>
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
              inputProps: { min: 6, max: 30 },
            }}
          />
        </div>
        <div className="input-field-icon">
          <LockIcon style={{ marginRight: '0.5rem' }} />
          <TextField
            style={{ width: '100%' }}
            type={showPasswordRepeat ? 'text' : 'password'}
            value={passwordRepeat}
            label="Repeat new password"
            variant="outlined"
            placeholder="Repeat your new password"
            name="passwordRepeat"
            onChange={onFieldChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility" onClick={onShowPasswordRepeatClicked}>
                    {showPasswordRepeat ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
              inputProps: { max: 30 },
            }}
          />
        </div>
        <Button className="form-button login-button" variant="contained" color="primary" type="submit">
          Update information
        </Button>
      </form>
      <Button
        className="form-button delete-account"
        variant="contained"
        color="primary"
        startIcon={<WarningIcon />}
        endIcon={<WarningIcon />}
        onClick={deleteAccount}
      >
        Delete Account
      </Button>
    </div>
  );
}
