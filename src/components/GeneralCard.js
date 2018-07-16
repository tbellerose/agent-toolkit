import React, { Component } from 'react';
import EscalationModal from './EscalationModal';
import checkSite from '../utils/siteCheck';
import siteCheck from '../utils/siteCheck';

export class GeneralCard extends Component {
  state = {
    modalIsOpen: false,
    siteChecks: undefined
  };

  handleEscalation = () => {
    this.setState(() => ({ modalIsOpen: true }));
  };

  handleCloseModal = () => {
    this.setState(() => ({ modalIsOpen: false }));
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

  componentDidMount() {
    this.handleSiteChecks();
  }

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
                ? <span className="green">{site.status}</span>
                : <span className="red">{site.status}</span>
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
          <button className="button">Redeploy Pods</button>
          <button className="button">Flush Cache</button>
          <button className="button" onClick={this.handleEscalation}>Escalate</button>
        </div>
        <EscalationModal
          modalIsOpen={this.state.modalIsOpen}
          handleCloseModal={this.handleCloseModal}
          site={site}
        />
      </div>
    );
  };
};

export default GeneralCard;