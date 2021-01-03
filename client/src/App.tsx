import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './components/auth/Register';

export default function App() {
  return (
    <Router>
      <Fragment>
        <Switch>
          <Route exact path="/" component={Register} />
        </Switch>
      </Fragment>
    </Router>
  );
}
