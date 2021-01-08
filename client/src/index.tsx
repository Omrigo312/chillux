import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { VacationsProvider } from './context/VacationsContext';
import './dist/css/style.min.css';

ReactDOM.render(
  <VacationsProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </VacationsProvider>,

  document.getElementById('root')
);
