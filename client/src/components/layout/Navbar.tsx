import { AppBar, Box, Button, Toolbar, Divider } from '@material-ui/core';
import React, { Fragment, useContext, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo-circle-transparent.png';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import NavbarLink from '../../models/NavbarLink';
import { AuthContext } from '../../context/AuthContext';
import { WindowContext } from '../../context/WindowContext';

export default function Navbar() {
  const { authState, logout } = useContext(AuthContext);
  const { setWindowWidth } = useContext(WindowContext);
  const { setNavbarHeight } = useContext(WindowContext);

  const location = useLocation();
  const elementRef = useRef(null);

  const [currentTab, setCurrentTab] = useState(location.pathname);

  const onLogoutClicked = () => {
    logout();
  };

  useEffect(() => {
    setCurrentTab(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    window.addEventListener('resize', (event: any) => setWindowWidth(event.target.innerWidth));
  });

  useEffect(() => {
    setNavbarHeight(elementRef.current.clientHeight);
  }, [setNavbarHeight]);

  const userBarLinks = [
    new NavbarLink('/vacations', 'All Offers'),
    new NavbarLink('/account', 'Account', <PersonOutlineIcon />),
  ];

  const guestBarLinks = [
    new NavbarLink('/vacations', 'All Offers'),
    new NavbarLink('/register', 'Register'),
    new NavbarLink('/login', 'Login'),
  ];

  const adminBarLinks = [
    new NavbarLink('/vacations', 'All Offers'),
    new NavbarLink('/analytics', 'Analytics'),
    new NavbarLink('/add-vacation', 'Add vacation'),
    new NavbarLink('/account', 'Account', <PersonOutlineIcon />),
  ];

  const createBar = (links: NavbarLink[]) => (
    <Fragment>
      {links.map((link: NavbarLink, index: number) => {
        const { to, text } = link;
        const active = currentTab === to;
        const color = active ? 'rgb(90, 90, 90)' : 'white';
        return (
          <Fragment key={index}>
            <Box>
              <Link to={to}>
                <Button style={{ color: color }}>
                  {link.icon}
                  {text}
                </Button>
              </Link>
            </Box>
            <Divider light orientation="vertical" flexItem />
          </Fragment>
        );
      })}
    </Fragment>
  );

  const userBar = (
    <Fragment>
      {createBar(userBarLinks)}
      <Box>
        <Button name="logout" onClick={onLogoutClicked}>
          <ExitToAppIcon />
          Logout
        </Button>
      </Box>
    </Fragment>
  );

  const guestBar = <Fragment>{createBar(guestBarLinks)}</Fragment>;

  const adminBar = (
    <Fragment>
      {createBar(adminBarLinks)}
      <Box>
        <Button name="logout" onClick={onLogoutClicked}>
          <ExitToAppIcon />
          Logout
        </Button>
      </Box>
    </Fragment>
  );

  return (
    <Fragment>
      {location.pathname !== '/login' && location.pathname !== '/register' && (
        <AppBar position="fixed" color="transparent" ref={elementRef} style={{ boxShadow: 'none' }}>
          <Toolbar className="navbar" style={{ padding: 0 }}>
            <Link className="logo-container" to="/">
              <img src={logo} className="logo" alt="logo" />
              <div className="logo-text">
                <h2>Chillux</h2>
                <p>Luxury Vacations</p>
              </div>
            </Link>
            <Box
              width="100%"
              display="flex"
              flexDirection="row"
              justifyContent="flex-end"
              alignItems="center"
              className="navbar-content"
              m={1}
              p={1}
            >
              {authState.isAuthenticated ? (authState.userType === 'ADMIN' ? adminBar : userBar) : guestBar}
            </Box>
          </Toolbar>
        </AppBar>
      )}
    </Fragment>
  );
}

/* <Box className="search">
<TextField
variant="outlined"
placeholder="Find a vacation..."
onChange={() => {}}
InputProps={{
  startAdornment: (
    <InputAdornment position="start">
      <SearchIcon />
    </InputAdornment>
  ),
}}
/>
</Box> */
