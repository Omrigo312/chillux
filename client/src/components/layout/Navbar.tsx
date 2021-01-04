import { AppBar, Box, Button, Toolbar } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo-wide.png';

export default function Navbar() {
  const isAuthenticated = false;

  const authBar = <Box></Box>;
  const guestBar = (
    <Box
      width="100%"
      display="flex"
      flexDirection="row"
      justifyContent="flex-end"
      alignItems="center"
      className="navbar-content"
      m={1}
    >
      {/* <Box className="search">
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
      </Box> */}
      <Box>
        <Link to="/offers">
          <Button>All Offers</Button>
        </Link>
      </Box>
      <Box>
        <Link to="/register">
          <Button>Register</Button>
        </Link>
      </Box>
      <Box>
        <Link to="/login">
          <Button>Login</Button>
        </Link>
      </Box>
    </Box>
  );

  return (
    <AppBar position="static" color="inherit">
      <Toolbar className="navbar" style={{ padding: 0 }}>
        <Link className="logo-container" to="/">
          <img src={logo} className="logo" alt="logo" />
        </Link>

        {isAuthenticated ? authBar : guestBar}
      </Toolbar>
    </AppBar>
  );
}
