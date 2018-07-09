import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';

export class LoginPage extends Component {
  state = {
    authenticated: null
  };

  checkAuthentication = async () => {
    const authenticated = await this.props.auth.isAuthenticated();
    if (authenticated !== this.state.authenticated) {
      this.setState(() => ({
        authenticated
      }));
    }
  };

  login = async () => {
    this.props.auth.login('/dashboard');
  };

  componentDidMount() {
    this.checkAuthentication();
  };

  componentDidUpdate() {
    this.checkAuthentication();
  };

  render() {
    if (this.state.authenticated === null) return null;
    return this.state.authenticated
      ? (
        <Redirect to="/dashboard" />
      ) : (
        <div className="box-layout">
          <div className="box-layout__box">
            <h1 className="box-layout__title">Agent Toolkit</h1>
            <button className="button" onClick={this.login}>Login</button>
          </div>
        </div>
      );
  };
};

export default withAuth(LoginPage);