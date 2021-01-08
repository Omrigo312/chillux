import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import './dist/css/style.min.css';

ReactDOM.render(
  <AuthProvider>
    <App />
  </AuthProvider>,

  document.getElementById('root')
);
