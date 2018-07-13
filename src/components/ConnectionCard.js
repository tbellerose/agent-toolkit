import React, { Component } from 'react';
import { connect } from 'react-redux';
import config from '../../app.config';

export class ConnectionCard extends Component {
  state = {
    hostname: '',
    port: undefined,
    status: ''
  };

  getConnectionInfo = async () => {
    const { authToken, site } = this.props;
    const response = await fetch(`${config.api_uri}/support/sites/${site.id}/ssh`, {
      headers: {
        'Authorization': `sso-jwt ${authToken}`
      }
    });
    const { hostname, port, status } = await response.json();
    this.setState(() => ({
      hostname,
      port,
      status
    }));
  };

  componentDidMount() {
    this.getConnectionInfo();
  }

  render() {
    return (
      <div className="card">
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
    );
  };
};

const mapStateToProps = (state) => ({
  authToken: state.auth.token
});

export default connect(mapStateToProps)(ConnectionCard);