import React, { createContext, useState } from 'react';

interface StateInterface {
  windowWidth: number;
  setWindowWidth: (newWidth: number) => void;
  navbarHeight: number;
  setNavbarHeight: (newHeight: number) => void;
  transparentNavbar: boolean;
  setTransparentNavbar: (newValue: boolean) => void;
}

const initialState: StateInterface = {
  windowWidth: window.innerWidth,
  setWindowWidth: null,
  navbarHeight: 0,
  setNavbarHeight: null,
  transparentNavbar: false,
  setTransparentNavbar: null,
};

export const WindowContext = createContext<StateInterface>(initialState);

export const WindowProvider = ({ children }: any) => {
  const [windowWidth, setWindowWidth] = useState(initialState.windowWidth);
  const [navbarHeight, setNavbarHeight] = useState(initialState.navbarHeight);
  const [transparentNavbar, setTransparentNavbar] = useState(initialState.transparentNavbar);

  return (
    <WindowContext.Provider
      value={{
        windowWidth,
        setWindowWidth,
        navbarHeight,
        setNavbarHeight,
        transparentNavbar,
        setTransparentNavbar,
      }}
    >
      {children}
    </WindowContext.Provider>
  );
};
