import { TextField } from '@material-ui/core';
import React, { ChangeEvent, useState } from 'react';

export default function addVacation() {
  const [formData, setFormData] = useState({
    destination: '',
    description: '',
    imageUrl: '',
    price: 0,
    startDate: '',
    endDate: '',
  });

  const { destination, description, imageUrl, price, startDate, endDate } = formData;

  const onFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const onSubmit = () => {};
  return (
    <form className="form" autoComplete="on" onSubmit={onSubmit} method="post">
      <h2 className="form-header">Create Account</h2>
      <TextField
        type="text"
        value={destination}
        required
        className="input-field"
        label="Destination"
        variant="outlined"
        name="destination"
        onChange={onFieldChange}
      />
      <TextField
        type="text"
        required
        value={description}
        className="input-field"
        label="Description"
        error={description.length < 10 && description.length > 0}
        variant="outlined"
        name="description"
        onChange={onFieldChange}
        InputProps={{
          inputProps: { minLength: 10,maxLength: },
        }}
      />
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
  );
}
