import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';
import { checkAuthentication } from '../utils/auth';

export class Header extends Component {
  state = { showMenu: false, authenticated: null, userinfo: null };

  checkAuthentication = checkAuthentication;

  toggleMenu = () => {
    this.setState((prevState) => ({
      showMenu: !prevState.showMenu
    }));
  };

  logout = () => {
    this.props.auth.logout('/');
  }

  async componentDidUpdate() {
    this.checkAuthentication();
  }

  async componentDidMount() {
    this.checkAuthentication();
  }

  render() {
    return (
      <header className="header">
        <div className="header__content">
          <Link className="header__title" to="/dashboard">
            <h1>Agent Toolkit</h1>
          </Link>
          <div>
            {
              this.state.userinfo &&
              <button className="button button--link" onClick={this.toggleMenu}>
                {this.state.userinfo.name}
                {
                  this.state.showMenu
                    ? <i className="arrow up"></i>
                    : <i className="arrow down"></i>
                }
              </button>
            }
            {
              this.state.showMenu &&
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

export default withAuth(Header);