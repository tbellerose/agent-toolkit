import React, { Component } from 'react';
import EscalationModal from './EscalationModal';

export class GeneralCard extends Component {
  state = {
    modalIsOpen: false
  };

  handleEscalation = () => {
    this.setState(() => ({ modalIsOpen: true }));
  };

  handleCloseModal = () => {
    this.setState(() => ({ modalIsOpen: false }));
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
                ? <span className="green">{site.status}</span>
                : <span className="red">{site.status}</span>
            }
          </p>
          <p>WP Version: {site.version.wordPress}</p>
          <p>PHP Version: {site.version.php}</p>
          <p>Cluster: {site.clusterId}</p>
        </div>
        <div className="card__action">
          <button className="button">Redeploy Pods</button>
          <button className="button">Flush Cache</button>
          <button className="button">Site Checks</button>
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