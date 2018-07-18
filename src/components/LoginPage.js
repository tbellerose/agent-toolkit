import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';
import { checkAuthentication } from '../utils/auth';

export class LoginPage extends Component {
  state = { authenticated: null, userinfo: null };

  checkAuthentication = checkAuthentication;

  login = async () => {
    this.props.auth.login('/dashboard');
  };

  async componentDidMount() {
    this.checkAuthentication();
  }

  async componentDidUpdate() {
    this.checkAuthentication();
  }

  render() {
    return (
      <div>
        {
          this.state.authenticated !== null &&
          <div>
            {this.state.authenticated
              ? (
                <Redirect to='/dashboard' />
              ) : (
                <div className='box-layout'>
                  <div className='box-layout__box'>
                    <h1 className='box-layout__title'>Agent Toolkit</h1>
                    <button className='button' onClick={ this.login }>Login</button>
                  </div>
                </div>
              )
            }
          </div>
        }
      </div>
    );
  }
}

LoginPage.propTypes = {
  auth: PropTypes.object
};

export default withAuth(LoginPage);
