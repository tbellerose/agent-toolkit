import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withAuth } from '@okta/okta-react';
import { checkAuthentication } from '../utils/auth';
import { setUser } from '../actions/auth';
import Header from './Header';

export class Dashboard extends Component {
  state = { authenticated: null, userinfo: null };

  checkAuthentication = checkAuthentication;

  logout = async () => {
    this.props.auth.logout('/');
  };

  async componentDidMount() {
    await this.checkAuthentication();
    this.props.setUser(this.state.userinfo);
  };

  render() {
    return (
      <div>
        <Header />
      </div>
    );
  };
};

const mapDispatchToProps = (dispatch) => ({
  setUser: (user) => dispatch(setUser(user))
});

export default connect(undefined, mapDispatchToProps)(withAuth(Dashboard));