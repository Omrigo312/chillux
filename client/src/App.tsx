/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Account from './components/auth/Account';
import Login from './components/auth/Login';
import PrivateRoute from './components/auth/PrivateRoute';
import Register from './components/auth/Register';
import RegisterSuccess from './components/auth/RegisterSuccess';
import Alerts from './components/layout/Alerts';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import addVacation from './components/admin/AddVacation';
import AllVacations from './components/vacations/AllVacations';
import ModifyVacation from './components/admin/ModifyVacation';
import { AuthContext } from './context/AuthContext';
import { setToken } from './utils/auth';
import Analytics from './components/admin/Analytics';
import io from 'socket.io-client';
import { VacationsContext } from './context/VacationsContext';
import { Vacation } from './models/Vacation';

export default function App() {
  const { logout, loadUser } = useContext(AuthContext);
  const { setVacations } = useContext(VacationsContext);

  useEffect(() => {
    const socket = io.connect('http://localhost:3001', {
      query: { token: localStorage.getItem('token') },
    });

    socket.on('new-vacation', (vacations: Vacation[]) => {
      setVacations(vacations);
    });

    // client-side
    socket.on('connect_error', (error: any) => {
      console.error(error.message);
    });

    if (localStorage.token) {
      setToken(localStorage.token);
    }

    loadUser();

    // log user out from all tabs if they log out in one tab
    window.addEventListener('storage', () => {
      if (!localStorage.token) {
        logout();
      }
    });
  }, []);

  return (
    <Router>
      <Navbar />
      <Alerts />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/register-success" component={RegisterSuccess} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/vacations" component={AllVacations} />
        <PrivateRoute exact path="/add-vacation" component={addVacation} />
        <PrivateRoute path="/modify-vacation/:id" component={ModifyVacation} />
        <PrivateRoute exact path="/account" component={Account} />
        <PrivateRoute exact path="/analytics" component={Analytics} />
      </Switch>
    </Router>
  );
}
