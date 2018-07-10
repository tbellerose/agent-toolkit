import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withAuth } from '@okta/okta-react';
import { checkAuthentication } from '../utils/auth';
import { setUser, clearUser } from '../actions/auth';
import Header from './Header';
import LoadingPage from './LoadingPage';

export class Dashboard extends Component {
  state = { authenticated: null, userinfo: null };

  checkAuthentication = checkAuthentication;

  async componentDidMount() {
    await this.checkAuthentication();
    this.props.setUser(this.state.userinfo);
  };

  render() {
    return (
      <div>
        {this.state.userinfo
          ? (
            <Header />
          ) : (
            <LoadingPage />
          )
        }
      </div>
    );
  };
};

const mapDispatchToProps = (dispatch) => ({
  setUser: (user) => dispatch(setUser(user))
});

export default connect(undefined, mapDispatchToProps)(withAuth(Dashboard));