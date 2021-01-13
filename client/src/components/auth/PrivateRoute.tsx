import { CircularProgress } from '@material-ui/core';
import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export default function PrivateRoute({ component: Component, ...rest }: any) {
  const { authState } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        authState.loading ? (
          <CircularProgress />
        ) : authState.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}
