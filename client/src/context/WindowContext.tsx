import React, { createContext, useState } from 'react';

interface StateInterface {
  windowWidth: number;
  setWindowWidth: (newWidth: number) => void;
  navbarHeight: number;
  setNavbarHeight: (newHeight: number) => void;
}

const initialState: StateInterface = {
  windowWidth: window.innerWidth,
  setWindowWidth: null,
  navbarHeight: 0,
  setNavbarHeight: null,
};

export const WindowContext = createContext<StateInterface>(initialState);

export const WindowProvider = ({ children }: any) => {
  const [windowWidth, setWindowWidth] = useState(initialState.windowWidth);
  const [navbarHeight, setNavbarHeight] = useState(initialState.navbarHeight);

  return (
    <WindowContext.Provider value={{ windowWidth, setWindowWidth, navbarHeight, setNavbarHeight }}>
      {children}
    </WindowContext.Provider>
  );
};
