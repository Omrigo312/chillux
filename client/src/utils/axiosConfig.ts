import axios from 'axios';

const env = process.env.NODE_ENV; // current environment

export const app = axios.create({
  baseURL:
    env === 'production'
      ? 'http://3.123.26.182/api/' // production
      : 'http://localhost:3001/api/', // development
});
