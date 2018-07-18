import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { getAPI } from '../utils/api';
import { postAPI } from '../utils/api';
import MessageModal from './MessageModal';

export class DatabaseCard extends Component {
  state = {
    database: {
      name: '',
      fqdn: '',
      port: null,
      adminUsername: '',
      adminPassword: '',
      error: ''
    },
    displayMessageModal: false,
    messageModalText: '',
    ready: false
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

  getDatabaseInfo = async () => {
    const siteId = this.props.site.id;
    const database = await getAPI(`/sites/${siteId}/database`, this.props.authToken);
    if (database.error) {
      this.setState(() => ({
        database: {
          error: database.error
        }
      }));
    } else if (!_.isEqual(this.state.database, database)) {
      this.setState(() => ({
        database,
        ready: true
      }));
    }
  };

  componentDidMount() {
    this.getDatabaseInfo();
  }

  componentDidUpdate() {
    this.getDatabaseInfo();
  }

  render() {
    const { name, fqdn, port, adminPassword, adminUsername } = this.state.database;
    return (
      <div className='card'>
        {this.state.error
          ? (
            <div className='card__content'>
              <p>{this.state.error}</p>
            </div>
          ) : (
            <div>
              {this.state.ready &&
                <div>
                  <h3 className='card__title'>Database Info</h3>
                  <div className='card__content'>
                    <p>DB Name: {name}</p>
                    <p>FQDN: {fqdn}</p>
                    <p>Port: {port}</p>
                    <p>Username: {adminUsername}</p>
                    <p>Password: {adminPassword}</p>
                  </div>
                  <div className='card__action'>
                    <button className='button' onClick={ this.handleResetPassword }>Reset Password</button>
                    <button className='button'>Kill Connections</button>
                  </div>
                  <MessageModal
                    modalIsOpen={ this.state.displayMessageModal }
                    handleCloseModal={ this.handleCloseMessageModal }
                    message={ this.state.messageModalText }
                  />
                </div>
              }
            </div>
          )
        }
      </div>
    );
  }
}

DatabaseCard.propTypes = {
  authToken: PropTypes.string,
  site: PropTypes.object
};

const mapStateToProps = (state) => ({
  authToken: state.auth.token
});

export default connect(mapStateToProps)(DatabaseCard);
