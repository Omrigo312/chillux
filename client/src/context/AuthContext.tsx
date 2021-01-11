import axios from 'axios';
import React, { createContext, useState } from 'react';
import LoginData from '../models/LoginData';
import { setToken } from '../utils/auth';

interface AuthStateInterFace {
  isAuthenticated: boolean;
  token: string;
  userType: string;
}

interface StateInterface {
  authState: AuthStateInterFace;
  login: (loginData: LoginData) => void;
  logout: () => void;
  loadUser: () => void;
}

const initialState: StateInterface = {
  authState: { isAuthenticated: false, token: '', userType: '' },
  login: null,
  logout: null,
  loadUser: null,
};

export const AuthContext = createContext<StateInterface>(initialState);

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState(initialState.authState);

  const login = (loginData: LoginData) => {
    const { token, userType } = loginData;
    setAuthState({ isAuthenticated: true, token, userType });
    localStorage.setItem('token', token);
    localStorage.setItem('userType', userType);
    loadUser();
  };

  const logout = () => {
    setAuthState({ isAuthenticated: false, token: '', userType: '' });
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    window.location.replace('/');
  };

  const loadUser = async () => {
    if (localStorage.token) {
      setToken(localStorage.token);
    }
    try {
      await axios.get('http://localhost:3001/api/users');

      setAuthState({
        isAuthenticated: true,
        token: localStorage.getItem('token'),
        userType: localStorage.getItem('userType'),
      });
    } catch (error) {
      setAuthState({ isAuthenticated: false, token: '', userType: '' });
      localStorage.removeItem('token');
      localStorage.removeItem('userType');
    }
  };

  return <AuthContext.Provider value={{ authState, login, logout, loadUser }}>{children}</AuthContext.Provider>;
};
