import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAPI } from '../utils/api';

export class ConnectionCard extends Component {
  state = {
    hostname: '',
    port: undefined,
    status: '',
    error: '',
    ready: false
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
      error,
      ready: true
    }));
  };

  componentDidMount() {
    this.getConnectionInfo();
  }

  render() {
    const { hostname, port, status, error, ready } = this.state;
    return (
      <div className="card">
        {!!error
          ? <div className="card__content">{error}</div>
          : (
            <div>
              {ready &&
                <div>
                  <h3 className="card__title">SSH/SFTP Info</h3>
                  <div className="card__content">
                    <p>Host: {hostname}</p>
                    <p>Port: {port}</p>
                    <p>Status: {this.state.status === 'active'
                      ? <span className="green">{status}</span>
                      : <span className="red">{status}</span>
                    }
                    </p>
                  </div>
                  <div className="card__action">
                    <button className="button">Create User</button>
                    <button className="button">Reset Permissions</button>
                  </div>
                </div>
              }
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