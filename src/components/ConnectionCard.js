import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { getAPI } from '../utils/api';

export class ConnectionCard extends Component {
  state = {
    connectionInfo: {
      hostname: '',
      port: undefined,
      status: '',
      error: '',
    },
    ready: false
  };

  getConnectionInfo = async () => {
    const { authToken, site } = this.props;
    const connectionInfo = await getAPI(
      `/support/sites/${site.id}/ssh`,
      authToken
    );

    if (connectionInfo.error) {
      this.setState(() => ({
        connectionInfo: {
          error: connectionInfo.error
        }
      }));
    } else if (!_.isEqual(this.state.connectionInfo, connectionInfo)) {
      this.setState(() => ({
        connectionInfo,
        ready: true
      }));
    }
  };

  componentDidMount() {
    this.getConnectionInfo();
  }

  render() {
    const { hostname, port, status, error } = this.state.connectionInfo;
    return (
      <div className="card">
        {!!error
          ? <div className="card__content">{error}</div>
          : (
            <div>
              {this.state.ready &&
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