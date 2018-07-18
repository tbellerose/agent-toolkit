import React, { Component } from 'react';
import _ from 'lodash';
import generator from 'generate-password';
import { connect } from 'react-redux';
import { getAPI, postAPI, patchAPI, deleteAPI } from '../utils/api';
import MessageModal from './MessageModal';

export class ConnectionCard extends Component {
  state = {
    connectionInfo: {
      hostname: '',
      port: undefined,
      status: '',
      users: [],
      error: '',
    },
    password: '',
    displayMessageModal: false,
    messageModalText: '',
    ready: false
  };

  handleCreateUser = async () => {
    const siteId = this.props.site.id;
    const password = generator.generate({
      length: 12,
      numbers: true,
      symbols: true,
      uppercase: true,
      excludeSimilarCharacters: true,
      strict: true
    });
    const user = await postAPI(
      `/support/sites/${siteId}/ssh/users`,
      this.props.authToken,
      JSON.stringify({ password })
    );
    if (user.error) {
      this.setState(() => ({
        displayMessageModal: true,
        messageModalText: 'There was a problem creating the user'
      }));
    } else {
      this.setState(() => ({ password }));
    }
  };

  handleUpdateUser = async () => {
    const siteId = this.props.site.id;
    const username = this.state.connectionInfo.users[0].username;
    const password = generator.generate({
      length: 12,
      numbers: true,
      symbols: true,
      uppercase: true,
      excludeSimilarCharacters: true,
      strict: true
    });
    const user = await patchAPI(
      `/support/sites/${siteId}/ssh/users/${username}`,
      this.props.authToken,
      JSON.stringify({ password })
    );
    if (user.error) {
      this.setState(() => ({
        displayMessageModal: true,
        messageModalText: 'There was a problem recreating the user'
      }));
    } else {
      this.setState(() => ({ password }));
    }
  };

  handleRemoveUser = async () => {
    const siteId = this.props.site.id;
    const username = this.state.connectionInfo.users[0].username;
    const remove = await deleteAPI(
      `/support/sites/${siteId}/ssh/users/${username}`,
      this.props.authToken
    );
    if (remove.error) {
      this.setState(() => ({
        displayMessageModal: true,
        messageModalText: 'There was a problem removing the user'
      }));
    } else {
      this.setState(() => ({
        displayMessageModal: true,
        messageModalText: 'Support user removed'
      }));
    }
  };

  handleCloseMessageModal = () => {
    this.setState(() => ({ displayMessageModal: false }));
  }

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

  componentDidUpdate() {
    this.getConnectionInfo();
  }

  render() {
    const { hostname, port, status, users, error } = this.state.connectionInfo;
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
                    <p>Status: {status === 'active'
                      ? <span className="green">{status}</span>
                      : <span className="red">{status}</span>
                    }
                    </p>
                    <p>Support User: {users.length > 0
                      ? users[0].username
                      : <span className="red">Inactive</span>
                    }
                    </p>
                    {this.state.password &&
                      <p>Support Password: {this.state.password}</p>
                    }
                  </div>
                  <div className="card__action">
                    <button
                      className="button"
                      onClick={users.length > 0
                        ? this.handleUpdateUser
                        : this.handleCreateUser}
                    >
                      {users.length > 0
                        ? "Update User"
                        : "Create User"
                      }
                    </button>
                    {users.length > 0 &&
                      <button
                        className="button"
                        onClick={this.handleRemoveUser}
                      >
                        Remove User
                      </button>
                    }
                    <button className="button">Reset Permissions</button>
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

export default connect(mapStateToProps)(ConnectionCard);