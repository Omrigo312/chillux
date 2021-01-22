import { AppBar, Box, Button, Toolbar, Divider, Hidden } from '@material-ui/core';
import React, { Fragment, useContext, useEffect, useRef, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo-circle-transparent.png';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import NavbarLink from '../../models/NavbarLink';
import { AuthContext } from '../../context/AuthContext';
import { WindowContext } from '../../context/WindowContext';

export default function Navbar() {
  const [isShowNavbar, setIsShowNavbar] = useState(true);
  const { authState, logout } = useContext(AuthContext);
  const { setWindowWidth, setNavbarHeight, setTransparentNavbar, transparentNavbar } = useContext(WindowContext);

  const location = useLocation();
  const history = useHistory();
  const elementRef = useRef(null);

  const [currentTab, setCurrentTab] = useState(location.pathname);

  const onLogoutClicked = () => {
    history.push('/login');
    logout();
  };

  useEffect(() => {
    setCurrentTab(location.pathname);
    if (location.pathname === '/') {
      setTransparentNavbar(true);
    } else {
      setTransparentNavbar(false);
    }
  }, [location.pathname, setTransparentNavbar]);

  useEffect(() => {
    window.addEventListener('resize', (event: any) => setWindowWidth(event.target.innerWidth));
  });

  useEffect(() => {
    if (isShowNavbar) {
      setNavbarHeight(elementRef.current.clientHeight);
    }
  }, [isShowNavbar, setNavbarHeight]);

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
                  {link.icon ? <Hidden smDown>{text}</Hidden> : <Fragment>{text}</Fragment>}
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
          <Hidden smDown>Logout</Hidden>
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
          <Hidden smDown>Logout</Hidden>
        </Button>
      </Box>
    </Fragment>
  );

  useEffect(() => {
    const hiddenNavbarLinks = ['/login', '/register', '/register-success'];
    setIsShowNavbar(hiddenNavbarLinks.includes(location.pathname) ? false : true);
  }, [location.pathname]);

  const boxShadow = location.pathname === '/' ? 'none' : null;
  const background = !transparentNavbar ? 'linear-gradient(to left, rgba(106, 212, 238, 0.85), rgba(2, 52, 75, 0.95))' : '';

  return (
    <Fragment>
      {isShowNavbar && (
        <AppBar position="fixed" color="transparent" ref={elementRef} style={{ boxShadow: boxShadow }}>
          <Toolbar className="navbar" style={{ padding: 0, background: background }}>
            <Hidden smDown>
              <Link className="logo-container" to="/">
                <img src={logo} className="logo" alt="logo" />
                <div className="logo-text">
                  <h2>Chillux</h2>
                  <p>Luxury Vacations</p>
                </div>
              </Link>
            </Hidden>
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

