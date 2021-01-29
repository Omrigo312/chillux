import React, { createContext, useState } from 'react';
import LoginData from '../models/LoginData';
import { setToken } from '../utils/auth';
import { app } from '../utils/axiosConfig';

interface AuthStateInterFace {
  isAuthenticated: boolean;
  loading: boolean;
  token: string;
  userType: string;
  user: any;
}

interface StateInterface {
  authState: AuthStateInterFace;
  login: (loginData: LoginData) => void;
  logout: () => void;
  loadUser: () => void;
}

const initialState: StateInterface = {
  authState: { isAuthenticated: false, loading: true, token: null, userType: null, user: null },
  login: null,
  logout: null,
  loadUser: null,
};

export const AuthContext = createContext<StateInterface>(initialState);

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState(initialState.authState);

  const login = async (loginData: LoginData) => {
    const { token, userType } = loginData;
    localStorage.setItem('token', token);
    localStorage.setItem('userType', userType);
    await loadUser();
  };

  const logout = () => {
    setAuthState({ isAuthenticated: false, loading: false, token: null, userType: null, user: null });
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
  };

  const loadUser = async () => {
    if (localStorage.token) {
      setToken(localStorage.token);
    }
    try {
      const res = await app.get('users');
      const user = res.data;

      setAuthState({
        loading: false,
        isAuthenticated: true,
        token: localStorage.getItem('token'),
        userType: localStorage.getItem('userType'),
        user,
      });
    } catch (error) {
      logout();
    }
  };

  return <AuthContext.Provider value={{ authState, login, logout, loadUser }}>{children}</AuthContext.Provider>;
};
