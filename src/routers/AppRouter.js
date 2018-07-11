import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';
import Dashboard from '../components/Dashboard';
import LoginPage from '../components/LoginPage';
import ManageSite from '../components/ManageSite';
import NotFoundPage from '../components/NotFoundPage';
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
        <SecureRoute path="/manage/:siteId" component={ManageSite} />
        <Route component={NotFoundPage} />
      </Switch>
    </Security>
  </Router>
);

export default AppRouter;