import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAPI } from '../utils/api';
import { postAPI } from '../utils/api';
import MessageModal from './MessageModal';

export class DatabaseCard extends Component {
  state = {
    name: '',
    fqdn: '',
    port: undefined,
    adminUsername: '',
    adminPassword: '',
    displayMessageModal: false,
    messageModalText: '',
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

  handleCloseMessageModal = () => {
    this.setState(() => ({ displayMessageModal: false }));
  };

  handleResetPassword = async () => {
    const siteId = this.props.site.id;
    const { error } = await postAPI(
      `/support/sites/${siteId}/database/resetPassword`,
      this.props.authToken
    );
    if (error) {
      this.setState(() => ({
        displayMessageModal: true,
        messageModalText: 'There was a problem resetting the password'
      }));
    } else {
      this.setState(() => ({
        displayMessageModal: true,
        messageModalText: 'Database password reset'
      }));
    }
  };

  componentDidMount() {
    this.getDatabaseInfo();
  };

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
                    <button className="button" onClick={this.handleResetPassword}>Reset Password</button>
                    <button className="button">Kill Connections</button>
                  </div>
                  <MessageModal
                    modalIsOpen={this.state.displayMessageModal}
                    handleCloseModal={this.handleCloseMessageModal}
                    message={this.state.messageModalText}
                  />
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