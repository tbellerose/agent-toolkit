import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setToken, clearToken } from '../actions/auth';
import { startSetSites, clearSites } from '../actions/sites';

export class AccountSearch extends Component {
  state = {
    error: '',
    authToken: this.props.authToken
  };

  handleAuthTokenChange = (e) => {
    let authToken = e.target.value;
    this.setState(() => ({
      authToken
    }));
  };

  handleSearch = async () => {
    if (!this.state.authToken) {
      this.setState(() => ({
        error: 'Please provide an auth token'
      }));
    } else {
      this.props.setToken(this.state.authToken);
      const error = await this.props.startSetSites();
      if (error) {
        this.setState(() => ({
          error: error.message
        }));
      } else {
        this.setState(() => ({
          error: ''
        }));
      }
    }
  };

  handleClear = () => {
    this.setState(() => ({
      authToken: ''
    }));
    this.props.clearToken();
    this.props.clearSites();
    this.setState(() => ({
      error: ''
    }));
  };

  render() {
    return (
      <div className="page-header">
        <div className="page-header__content">
          <input
            className="text-input"
            type="text"
            value={this.state.authToken}
            onChange={this.handleAuthTokenChange}
            placeholder="SSO Token"
            autoFocus
          />
          <button className="button" onClick={this.handleSearch}>Search</button>
          <button className="button" onClick={this.handleClear}>Clear</button>
        </div>
        {!!this.state.error &&
          <p className="form__error">{this.state.error}</p>
        }
      </div>
    );
  };
};

const mapStateToProps = (state) => ({
  authToken: state.auth.token,
  sites: state.sites
});

const mapDispatchToProps = (dispatch) => ({
  setToken: (token) => dispatch(setToken(token)),
  clearToken: () => dispatch(clearToken()),
  startSetSites: () => dispatch(startSetSites()),
  clearSites: () => dispatch(clearSites())
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountSearch);