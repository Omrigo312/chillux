import React, { createContext, useState } from 'react';
import LoginData from '../models/LoginData';

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
  };

  const logout = () => {
    setAuthState({ isAuthenticated: false, token: '', userType: '' });
    window.location.replace('/');
  };

  const loadUser = () => {
    setAuthState({
      isAuthenticated: true,
      token: localStorage.getItem('token'),
      userType: localStorage.getItem('userType'),
    });
  };

  return <AuthContext.Provider value={{ authState, login, logout }}>{children}</AuthContext.Provider>;
};
