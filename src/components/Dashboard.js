import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';

export class Dashboard extends Component {
  logout = async () => {
    this.props.auth.logout('/');
  };

  render() {
    return (
      <div>
        <button className="button" onClick={this.logout}>Logout</button>
      </div>
    );
  };
};

export default withAuth(Dashboard);