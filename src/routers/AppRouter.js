import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';
import LoginPage from '../components/LoginPage';
import Dashboard from '../components/Dashboard';
import config from '../../app.config';

const AppRouter = () => (
  <Router>
    <Security
      issuer={config.issuer}
      client_id={config.client_id}
      redirect_uri={config.redirect_uri}
    >
      <Switch>
        <Route path="/" exact={true} component={LoginPage} />
        <Route path="/implicit/callback" component={ImplicitCallback} />
        <SecureRoute path="/dashboard" component={Dashboard} />
      </Switch>
    </Security>
  </Router>
);

export default AppRouter;