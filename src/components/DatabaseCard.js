import React, { Component } from 'react';
import { connect } from 'react-redux';
import config from '../../app.config';

export class DatabaseCard extends Component {
  state = {
    name: '',
    fqdn: '',
    port: undefined,
    adminUsername: '',
    adminPassword: ''
  };

  getDatabaseInfo = async () => {
    const siteId = this.props.site.id;
    const response = await fetch(`${config.api_uri}/sites/${siteId}/database`, {
      headers: {
        'Authorization': `sso-jwt ${this.props.authToken}`
      }
    });
    const { name, fqdn, port, adminUsername, adminPassword } = await response.json();
    this.setState(() => ({
      name,
      fqdn,
      port,
      adminUsername,
      adminPassword
    }));
  };

  componentDidMount() {
    this.getDatabaseInfo();
  }

  render() {
    const { name, fqdn, port, adminPassword, adminUsername } = this.state;
    return (
      <div className="card">
        <h3 className="card__title">Database Info</h3>
        <div className="card__content">
          <p>DB Name: {name}</p>
          <p>FQDN: {fqdn}</p>
          <p>Port: {port}</p>
          <p>Username: {adminUsername}</p>
          <p>Password: {adminPassword}</p>
        </div>
        <div className="card__action">
          <button className="button">Reset Password</button>
          <button className="button">Kill Connections</button>
        </div>
      </div>
    );
  };
};

const mapStateToProps = (state) => ({
  authToken: state.auth.token
});

export default connect(mapStateToProps)(DatabaseCard);