import { createContext, useState } from 'react';
import LoginData from '../models/LoginData';

interface AuthStateInterFace {
  isAuthenticated: boolean;
  token: string;
  userType: string;
}

interface StateInterface {
  state: AuthStateInterFace;
  login: (loginData: LoginData) => void;
  logout: () => void;
}

const initialState: StateInterface = {
  state: { isAuthenticated: false, token: '', userType: '' },
  login: null,
  logout: null,
};

export const AuthContext = createContext<StateInterface>(initialState);

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState({ isAuthenticated: false, token: '', userType: '' });

  const login = (loginData: LoginData) => {
    setAuthState({ isAuthenticated: true, token: loginData.token, userType: loginData.userType });
  };

  const logout = () => {
    setAuthState({ isAuthenticated: false, token: '', userType: '' });
  };

  return <AuthContext.Provider value={{ state: authState, login, logout }}>{children}</AuthContext.Provider>;
};
