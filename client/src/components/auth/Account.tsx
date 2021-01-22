import {
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  InputAdornment,
  TextField,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import React, { ChangeEvent, FormEvent, Fragment, useContext, useState } from 'react';
import LockIcon from '@material-ui/icons/Lock';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { WindowContext } from '../../context/WindowContext';
import Alert from '../../models/Alert';
import { handleError } from '../../utils/error';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import WarningIcon from '@material-ui/icons/Warning';
import PasswordStrengthBar from 'react-password-strength-bar';

export default function Account() {
  const { authState, loadUser, logout } = useContext(AuthContext);
  const { navbarHeight } = useContext(WindowContext);
  const { addAlert } = useContext(WindowContext);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const history = useHistory();

  const { email, firstName, lastName, externalId } = authState.user;

  const [passwordFormData, setPasswordFormData] = useState({
    password: '',
    passwordRepeat: '',
  });
  const [nameFormData, setNameFormData] = useState({
    firstNameForm: firstName || '',
    lastNameForm: lastName || '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRepeat, setShowPasswordRepeat] = useState(false);
  const [requestName, setRequestName] = useState('');
  const [passwordIncorrect, setPasswordIncorrect] = useState(false);
  const [isDangerDialog, setIsDangerDialog] = useState(false);
  const { password, passwordRepeat } = passwordFormData;
  const { firstNameForm, lastNameForm } = nameFormData;

  const onShowPasswordClicked = () => setShowPassword(!showPassword);
  const onShowPasswordRepeatClicked = () => setShowPasswordRepeat(!showPasswordRepeat);

  const onPasswordFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPasswordFormData({ ...passwordFormData, [event.target.name]: event.target.value });
  };

  const onNameFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNameFormData({ ...nameFormData, [event.target.name]: event.target.value });
  };

  const checkPassword = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ password: currentPassword });

    try {
      await axios.post('http://localhost:3001/api/users/confirm-password', body, config);
    } catch (error) {
      console.log(error);
      setPasswordIncorrect(true);
      return addAlert(new Alert('Password is incorrect', 'error', 3000));
    }

    switch (requestName) {
      case 'name':
        return nameFormRequest();
      case 'password':
        return passwordFormRequest();
      case 'delete':
        return deleteRequest();
    }
  };

  const deleteAccount = () => {
    clearFieldState();
    setIsDialogOpen(true);
    setIsDangerDialog(true);
    setRequestName('delete');
  };

  const deleteRequest = async () => {
    try {
      await axios.delete('http://localhost:3001/api/users');
      logout();
      history.push('/');
      addAlert(new Alert('Account Deleted', 'success', 5000));
    } catch (error) {
      handleError(error, addAlert);
    }
  };

  const nameFormRequest = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { firstNameForm: firstName, lastNameForm: lastName } = nameFormData;

    const body = JSON.stringify({ firstName, lastName });

    try {
      await axios.put('http://localhost:3001/api/users/name', body, config);
      loadUser();
      history.push('/vacations');
      addAlert(new Alert('Name updated!', 'success', 5000));
    } catch (error) {
      handleError(error, addAlert);
    }
  };
  const passwordFormRequest = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify(passwordFormData);

    try {
      await axios.put('http://localhost:3001/api/users/password', body, config);
      loadUser();
      history.push('/vacations');
      addAlert(new Alert('Password updated!', 'success', 5000));
    } catch (error) {
      handleError(error, addAlert);
    }
  };

  const onNameFormSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setRequestName('name');
    clearFieldState();
    setIsDialogOpen(true);
  };

  const onPasswordFormSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (password !== passwordRepeat) {
      return addAlert(new Alert('Passwords do not match!', 'error', 3000));
    }

    setRequestName('password');
    clearFieldState();
    setIsDialogOpen(true);
  };

  const clearFieldState = () => {
    setIsDangerDialog(false);
    setPasswordIncorrect(false);
    setCurrentPassword('');
  };

  const passMargin = password.length > 0 ? '5px' : '1.5rem';
  const dialogHeader = isDangerDialog ? 'PERMANENTLY DELETE ACCOUNT' : 'Password Required';
  const dialogText = isDangerDialog
    ? 'You are about to permanently remove your account! Insert your password to confirm.'
    : 'In order to confirm the changes, please insert your password.';
  const confirmColor = isDangerDialog ? 'secondary' : 'primary';
  const confirmText = isDangerDialog ? 'Delete Account' : 'Confirm';
  const errorHelperText = password !== passwordRepeat ? 'Passwords do not match!' : '';

  return (
    <div className="account" style={{ marginBottom: '30px', marginTop: `${navbarHeight + 10}px` }}>
      {!externalId ? (
        <Fragment>
          {firstName && lastName ? <h1>{`${firstName} ${lastName}`}</h1> : <h1>{email}</h1>}

          <form className="form" autoComplete="on" onSubmit={onNameFormSubmit} method="post">
            <h2 className="form-header-small">Add \ Update Your Name</h2>
            <div className="input-field-icon">
              <AccountCircleIcon style={{ marginRight: '0.5rem' }} />
              <div className="form-duo" style={{ width: '100%' }}>
                <TextField
                  type="text"
                  required
                  value={firstNameForm}
                  label="First name"
                  variant="outlined"
                  placeholder="Add your first name"
                  name="firstNameForm"
                  onChange={onNameFieldChange}
                  inputProps={{ maxLength: 25 }}
                />
                <TextField
                  type="text"
                  required
                  value={lastNameForm}
                  label="Last name"
                  variant="outlined"
                  placeholder="Add your last name"
                  name="lastNameForm"
                  onChange={onNameFieldChange}
                  inputProps={{ maxLength: 25 }}
                />
              </div>
            </div>

            <Button className="form-button login-button" variant="contained" color="primary" type="submit">
              Update Name
            </Button>
          </form>

          <form className="form" autoComplete="on" onSubmit={onPasswordFormSubmit} method="post">
            <h2 className="form-header-small">Change Your Password</h2>

            <div className="input-field-icon">
              <LockIcon style={{ marginRight: '0.5rem' }} />
              <TextField
                style={{ width: '100%' }}
                type={showPassword ? 'text' : 'password'}
                value={password}
                required
                label="New password"
                variant="outlined"
                autoComplete="new-password"
                placeholder="Choose a new password..."
                name="password"
                error={password.length < 6 && password.length > 0}
                onChange={onPasswordFieldChange}
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
                value={passwordRepeat}
                required
                label="Repeat new password"
                variant="outlined"
                placeholder="Repeat your new password"
                name="passwordRepeat"
                error={password !== passwordRepeat}
                onChange={onPasswordFieldChange}
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
            <Button className="form-button login-button" variant="contained" color="primary" type="submit">
              Change password
            </Button>
          </form>
        </Fragment>
      ) : (
        <Fragment>
          <h1>You Are Logged In Using Google</h1>
          <Card className="google-card">
            <h2>Google Credentials:</h2>
            <h3>Email:</h3>
            <em>{email}</em>
            <h3>Full Name:</h3>
            <em>
              {firstName} {lastName}
            </em>
          </Card>
        </Fragment>
      )}
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
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{dialogHeader}</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogText}</DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            value={currentPassword}
            error={passwordIncorrect}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setCurrentPassword(event.target.value);
            }}
            label="Current Password"
            type="password"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={checkPassword} color={confirmColor}>
            {confirmText}
            {isDangerDialog && <WarningIcon style={{ color: 'red' }} />}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
