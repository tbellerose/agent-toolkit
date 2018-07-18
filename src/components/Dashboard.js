import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withAuth } from '@okta/okta-react';
import { checkAuthentication } from '../utils/auth';
import { setUser } from '../actions/auth';
import Header from './Header';
import AccountSearch from './AccountSearch';
import LoadingPage from './LoadingPage';
import SiteList from './SiteList';

export class Dashboard extends Component {
  state = { authenticated: null, userinfo: null };

  checkAuthentication = checkAuthentication;

  async componentDidMount() {
    await this.checkAuthentication();
    if (!this.state.authenticated) {
      this.props.history.push('/');
    }
    this.props.setUser(this.state.userinfo);
  }

  render() {
    return (
      <div>
        {this.state.userinfo
          ? (
            <div>
              <Header />
              <div className='content-container'>
                <AccountSearch />
                <SiteList />
              </div>
            </div>
          ) : (
            <LoadingPage />
          )
        }
      </div>
    );
  }
}

Dashboard.propTypes = {
  setUser: PropTypes.func,
  history: PropTypes.object
};

const mapDispatchToProps = (dispatch) => ({
  setUser: (user) => dispatch(setUser(user))
});

export default connect(null, mapDispatchToProps)(withAuth(Dashboard));
