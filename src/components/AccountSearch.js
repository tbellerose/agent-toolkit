import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setToken, clearToken } from '../actions/auth';

export class AccountSearch extends Component {
  state = {
    error: '',
    authToken: this.props.authToken
  };

  onAuthTokenChange = (e) => {
    let authToken = e.target.value;
    this.setState(() => ({
      authToken
    }));
  };

  onSearch = () => {
    if (!this.state.authToken) {
      this.setState(() => ({
        error: 'Please provide an auth token'
      }));
    } else {
      this.props.setToken(this.state.authToken);
    }
  };

  onClear = () => {
    this.setState(() => ({
      authToken: ''
    }));
    this.props.clearToken();
  };

  render() {
    return (
      <div className="page-header">
        {!!this.state.error &&
          <p className="form__error">{this.state.error}</p>
        }
        <div className="page-header__content">
          <input
            className="text-input"
            type="text"
            value={this.state.authToken}
            onChange={this.onAuthTokenChange}
            placeholder="Auth Token"
            autoFocus
          />
          <button className="button" onClick={this.onSearch}>Search</button>
          <button className="button" onClick={this.onClear}>Clear</button>
        </div>
      </div>
    );
  };
};

const mapStateToProps = (state) => ({
  authToken: state.auth.token
});

const mapDispatchToProps = (dispatch) => ({
  setToken: (token) => dispatch(setToken(token)),
  clearToken: () => dispatch(clearToken())
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountSearch);