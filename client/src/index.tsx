import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { VacationsProvider } from './context/VacationsContext';
import { WindowProvider } from './context/WindowContext';
import './dist/css/style.min.css';

ReactDOM.render(
  <WindowProvider>
    <VacationsProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </VacationsProvider>
  </WindowProvider>,

  document.getElementById('root')
);
