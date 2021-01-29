import axios from 'axios';
import Alert from '../models/Alert';
import { app } from './axiosConfig';
import { handleError } from './error';

export const setToken = (token: string) => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export const googleLogin = async (response: any, addAlert: (alert: Alert) => void) => {
  const googleProfile = response.profileObj;

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify(googleProfile);

  try {
    return await app.post('users/login', body, config);
  } catch (error) {
    handleError(error, addAlert);
  }
};
