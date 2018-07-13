import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAPI } from '../utils/api';

export class ConnectionCard extends Component {
  state = {
    hostname: '',
    port: undefined,
    status: '',
    error: ''
  };

  getConnectionInfo = async () => {
    const { authToken, site } = this.props;
    const { hostname, port, status, error } = await getAPI(
      `/support/sites/${site.id}/ssh`,
      authToken
    );
    this.setState(() => ({
      hostname,
      port,
      status,
      error
    }));
  };

  componentDidMount() {
    this.getConnectionInfo();
  }

  render() {
    return (
      <div className="card">
        {!!this.state.error
          ? <div className="card__content">{this.state.error}</div>
          : (
            <div>
              <h3 className="card__title">SSH/SFTP Info</h3>
              <div className="card__content">
                <p>Host: {this.state.hostname}</p>
                <p>Port: {this.state.port}</p>
                <p>Status:
          {
                    this.state.status === 'active'
                      ? <span className="green">{this.state.status}</span>
                      : <span className="red">{this.state.status}</span>
                  }
                </p>
              </div>
              <div className="card__action">
                <button className="button">Create User</button>
                <button className="button">Reset Permissions</button>
              </div>
            </div>
          )
        }
      </div>
    );
  };
};

const mapStateToProps = (state) => ({
  authToken: state.auth.token
});

export default connect(mapStateToProps)(ConnectionCard);