import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';
import { clearUser, clearToken } from '../actions/auth';
import { clearSites } from '../actions/sites';

export class Header extends Component {
  state = { showMenu: false };

  toggleMenu = () => {
    this.setState((prevState) => ({
      showMenu: !prevState.showMenu
    }));
  };

  logout = async () => {
    this.props.clearToken();
    this.props.clearUser();
    this.props.clearSites();
    this.props.auth.logout('/');
  };

  render() {
    return (
      <header className='header'>
        <div className='header__content'>
          <Link className='header__title' to='/dashboard'>
            <h1>Agent Toolkit</h1>
          </Link>
          <div>
            <button className='button button--link' onClick={ this.toggleMenu }>
              {this.props.user && this.props.user.name}
              {this.state.showMenu
                ? <i className='arrow up'></i>
                : <i className='arrow down'></i>
              }
            </button>
            {this.state.showMenu &&
              <div className='dropdown-menu'>
                <button className='dropdown-menu__item' onClick={ this.logout }>Logout</button>
              </div>
            }
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  user: PropTypes.object,
  clearUser: PropTypes.func,
  clearToken: PropTypes.func,
  clearSites: PropTypes.func,
  auth: PropTypes.object
};

const mapStateToProps = (state) => ({
  user: state.auth.user
});

const mapDispatchToProps = (dispatch) => ({
  clearUser: () => dispatch(clearUser()),
  clearToken: () => dispatch(clearToken()),
  clearSites: () => dispatch(clearSites())
});

export default connect(mapStateToProps, mapDispatchToProps)(withAuth(Header));
