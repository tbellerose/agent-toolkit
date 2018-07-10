import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';
import Header from './Header';

export class Dashboard extends Component {
  logout = async () => {
    this.props.auth.logout('/');
  };

  render() {
    return (
      <div>
        <Header />
      </div>
    );
  };
};

export default withAuth(Dashboard);