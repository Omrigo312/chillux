import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { VacationsProvider } from './context/VacationsContext';
import { WindowProvider } from './context/WindowContext';
import './dist/css/style.min.css';

ReactDOM.render(
  <AuthProvider>
    <WindowProvider>
      <VacationsProvider>
        <App />
      </VacationsProvider>
    </WindowProvider>
  </AuthProvider>,
  document.getElementById('root')
);
