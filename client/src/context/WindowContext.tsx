import React, { createContext, useState } from 'react';
import Alert from '../models/Alert';

interface StateInterface {
  windowWidth: number;
  setWindowWidth: (newWidth: number) => void;
  navbarHeight: number;
  setNavbarHeight: (newHeight: number) => void;
  transparentNavbar: boolean;
  setTransparentNavbar: (newValue: boolean) => void;
  alerts: Alert[];
  setAlerts: (newAlerts: Alert[]) => void;
  addAlert: (newAlert: Alert) => void;
}

const initialState: StateInterface = {
  windowWidth: window.innerWidth,
  setWindowWidth: null,
  navbarHeight: 0,
  setNavbarHeight: null,
  transparentNavbar: false,
  setTransparentNavbar: null,
  alerts: [],
  setAlerts: null,
  addAlert: null,
};

export const WindowContext = createContext<StateInterface>(initialState);

export const WindowProvider = ({ children }: any) => {
  const [windowWidth, setWindowWidth] = useState(initialState.windowWidth);
  const [navbarHeight, setNavbarHeight] = useState(initialState.navbarHeight);
  const [transparentNavbar, setTransparentNavbar] = useState(initialState.transparentNavbar);
  const [alerts, setAlerts] = useState(initialState.alerts);

  const addAlert = (newAlert: Alert) => {
    setAlerts([...alerts, newAlert]);
    setTimeout(() => {
      setAlerts((alerts) => alerts.filter((alert) => alert.id !== newAlert.id));
    }, newAlert.timeout);
  };

  return (
    <WindowContext.Provider
      value={{
        windowWidth,
        setWindowWidth,
        navbarHeight,
        setNavbarHeight,
        transparentNavbar,
        setTransparentNavbar,
        alerts,
        setAlerts,
        addAlert,
      }}
    >
      {children}
    </WindowContext.Provider>
  );
};
