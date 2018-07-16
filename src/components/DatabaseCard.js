import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAPI } from '../utils/api';

export class DatabaseCard extends Component {
  state = {
    name: '',
    fqdn: '',
    port: undefined,
    adminUsername: '',
    adminPassword: '',
    error: '',
    ready: false
  };

  getDatabaseInfo = async () => {
    const siteId = this.props.site.id;
    const {
      name,
      fqdn,
      port,
      adminUsername,
      adminPassword,
      error
    } = await getAPI(`/sites/${siteId}/database`, this.props.authToken);

    this.setState(() => ({
      name,
      fqdn,
      port,
      adminUsername,
      adminPassword,
      error,
      ready: true
    }));
  };

  componentDidMount() {
    this.getDatabaseInfo();
  }

  render() {
    const { name, fqdn, port, adminPassword, adminUsername, ready } = this.state;
    return (
      <div className="card">
        {!!this.state.error
          ? (
            <div className="card__content">
              <p>{this.state.error}</p>
            </div>
          ) : (
            <div>
              {ready &&
                <div>
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

export default connect(mapStateToProps)(DatabaseCard);