import React, { Component } from 'react';
import { connect } from 'react-redux';
import EscalationModal from './EscalationModal';
import MessageModal from './MessageModal';
import checkSite from '../utils/siteCheck';
import { deleteAPI, postAPI } from '../utils/api';

export class GeneralCard extends Component {
  state = {
    displayEscalationModal: false,
    displayMessageModal: false,
    messageModalText: '',
    siteChecks: undefined,
  };

  handleEscalation = () => {
    this.setState(() => ({ displayEscalationModal: true }));
  };

  handleCloseEscalationModal = () => {
    this.setState(() => ({ displayEscalationModal: false }));
  };

  handleCloseMessageModal = () => {
    this.setState(() => ({ displayMessageModal: false }));
  };

  handleRedeployPods = async () => {
    const siteId = this.props.site.id;
    const { error } = await postAPI(
      `/support/sites/${siteId}/redeploy`,
      this.props.authToken
    );
    if (error) {
      this.setState(() => ({
        displayMessageModal: true,
        messageModalText: 'There was a problem redeploying the pods'
      }));
    } else {
      this.setState(() => ({
        displayMessageModal: true,
        messageModalText: `Redeploy successfully initiated`
      }));
    }
  };

  handleFlushCache = async () => {
    const { name: primaryDomain } = this.props.site.domains.primary;
    const { error } = await deleteAPI(
      `/sites/${this.props.site.id}/cache`,
      this.props.authToken
    );
    if (error) {
      console.log(error);
      this.setState(() => ({
        displayMessageModal: true,
        messageModalText: `There was a problem flushing the cache for ${primaryDomain}`
      }));
    } else {
      this.setState(() => ({
        displayMessageModal: true,
        messageModalText: `Cache for ${primaryDomain} successfully flushed`
      }));
    }
  };

  handleSiteChecks = async () => {
    const { name: primaryDomain } = this.props.site.domains.primary;
    const { name: defaultDomain } = this.props.site.domains.default;
    let urls = [];
    if (primaryDomain === defaultDomain) {
      urls.push(primaryDomain);
    } else {
      urls.push(primaryDomain, defaultDomain);
    }
    const siteChecks = await checkSite(urls);
    this.setState(() => ({
      siteChecks
    }));
  };

  render() {
    const { site } = this.props;
    return (
      <div className="card">
        <h3 className="card__title">Site Info</h3>
        <div className="card__content">
          <p>Site ID: {site.id}</p>
          <p>Primary Domain: {site.domains.primary.name}</p>
          <p>Default Domain: {site.domains.default.name}</p>
          <p>IP Address: {site.ipAddress}</p>
          <p>Status:
            {
              site.status === 'Active'
                ? <span className="green"> {site.status}</span>
                : <span className="red"> {site.status}</span>
            }
          </p>
          <p>WP Version: {site.version.wordPress}</p>
          <p>PHP Version: {site.version.php}</p>
          <p>Cluster: {site.clusterId}</p>
          {this.state.siteChecks &&
            this.state.siteChecks.map((siteCheck, i) => (
              <p key={i}>{siteCheck}</p>
            ))
          }
        </div>
        <div className="card__action">
          <button className="button" onClick={this.handleRedeployPods}>Redeploy Pods</button>
          <button className="button" onClick={this.handleFlushCache}>Flush Cache</button>
          <button className="button" onClick={this.handleSiteChecks}>Site Checks</button>
          <button className="button" onClick={this.handleEscalation}>Escalate</button>
        </div>
        <EscalationModal
          modalIsOpen={this.state.displayEscalationModal}
          handleCloseModal={this.handleCloseEscalationModal}
          site={site}
        />
        <MessageModal
          modalIsOpen={this.state.displayMessageModal}
          handleCloseModal={this.handleCloseMessageModal}
          message={this.state.messageModalText}
        />
      </div>
    );
  };
};

const mapStateToProps = (state) => ({
  authToken: state.auth.token
});

export default connect(mapStateToProps)(GeneralCard);