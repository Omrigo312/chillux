import { AppBar, Box, Button, Toolbar, Divider } from '@material-ui/core';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo-wide.png';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import NavbarLink from '../../models/NavbarLink';
import { AuthContext } from '../../context/AuthContext';

export default function Navbar() {
  const { authState, logout } = useContext(AuthContext);
  const location = useLocation();

  const [currentTab, setCurrentTab] = useState(location.pathname);

  const onLogoutClicked = () => {
    logout();
  };

  useEffect(() => {
    setCurrentTab(location.pathname);
  }, [location.pathname]);

  const userBarLinks = [
    new NavbarLink('/offers', 'All Offers'),
    new NavbarLink('/account', 'Account', <PersonOutlineIcon />),
  ];

  const guestBarLinks = [
    new NavbarLink('/offers', 'All Offers'),
    new NavbarLink('/register', 'Register'),
    new NavbarLink('/login', 'Login'),
  ];

  const adminBarLinks = [
    new NavbarLink('/offers', 'All Offers'),
    new NavbarLink('/analytics', 'Analytics'),
    new NavbarLink('/add-offer', 'Add offer'),
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
    <AppBar position="fixed" color="inherit">
      <Toolbar className="navbar" style={{ padding: 0 }}>
        <Link className="logo-container" to="/">
          <img src={logo} className="logo" alt="logo" />
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
          {authState.isAuthenticated ? (authState.userType === 'USER' ? userBar : adminBar) : guestBar}
        </Box>
      </Toolbar>
    </AppBar>
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
