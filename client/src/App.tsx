import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import RegisterSuccess from './components/auth/RegisterSuccess';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import AllVacations from './components/vacations/AllVacations';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/register-success" component={RegisterSuccess} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/vacations" component={AllVacations} />
      </Switch>
    </Router>
  );
}
