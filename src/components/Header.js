import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';
import { clearUser } from '../actions/auth';

export class Header extends Component {
  state = { showMenu: false };

  toggleMenu = () => {
    this.setState((prevState) => ({
      showMenu: !prevState.showMenu
    }));
  };

  logout = () => {
    this.props.clearUser();
    this.props.auth.logout('/');
  };

  render() {
    return (
      <header className="header">
        <div className="header__content">
          <Link className="header__title" to="/dashboard">
            <h1>Agent Toolkit</h1>
          </Link>
          <div>
            <button className="button button--link" onClick={this.toggleMenu}>
              {this.props.user && this.props.user.name}
              {this.state.showMenu
                ? <i className="arrow up"></i>
                : <i className="arrow down"></i>
              }
            </button>
            {this.state.showMenu &&
              <div className="menu">
                <button className="menu__item" onClick={this.logout}>Logout</button>
              </div>
            }
          </div>
        </div>
      </header>
    );
  };
};

const mapStateToProps = (state) => ({
  user: state.auth.user
});

const mapDispatchToProps = (dispatch) => ({
  clearUser: () => dispatch(clearUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(withAuth(Header));