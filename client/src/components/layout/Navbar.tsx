import {
  AppBar,
  Box,
  Button,
  IconButton,
  Slider,
  Toolbar,
  Typography,
  InputBase,
  TextField,
  InputAdornment,
} from '@material-ui/core';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo-wide.png';
import SearchIcon from '@material-ui/icons/Search';

export default function Navbar() {
  const isAuthenticated = false;

  const authBar = <Box></Box>;
  const guestBar = (
    <Box
      width="100%"
      display="flex"
      p={1}
      m={1}
      flexDirection="row"
      justifyContent="flex-end"
      alignItems="center"
      className="navbar-content"
    >
      <Box className="search">
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
      </Box>
      <Box p={1}>
        <Link to="/offers">
          <Button>All Offers</Button>
        </Link>
      </Box>
      <Box p={1}>
        <Link to="/register">
          <Button>Register</Button>
        </Link>
      </Box>
      <Box p={1}>
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
