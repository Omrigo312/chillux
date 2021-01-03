import { Button, TextField } from '@material-ui/core';
import axios from 'axios';
import React, { ChangeEvent, FormEvent, useState } from 'react';

export default function Register() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { email, password } = formData;

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ email, password });
    console.log(body);

    try {
      const res = await axios.post('/api/users', body, config);
      console.log(`Server Response: ${res}`);
    } catch (error) {
      alert(error.message);
      console.log(error.message);
    }
  };

  return (
    <form className="register-form" autoComplete="on" onSubmit={onSubmit}>
      <h2>Sign Up</h2>
      <TextField
        type="email"
        required
        className="input-field"
        id="register-email"
        label="Email"
        variant="outlined"
        name="email"
        onChange={onChange}
      />
      <TextField
        type="password"
        required
        className="input-field"
        id="register-password"
        label="Password"
        variant="outlined"
        name="password"
        onChange={onChange}
      />
      <Button variant="contained" color="primary" type="submit">
        Register
      </Button>
    </form>
  );
}
