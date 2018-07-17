import React, { Component } from 'react';
import checkSites from '../utils/siteCheck';
import { submitToSlack, formatForSlack } from '../utils/slack';

export class EscalationForm extends Component {
  state = {
    siteId: this.props.site.id,
    primaryDomain: this.props.site.domains.primary.name,
    defaultDomain: this.props.site.domains.default.name,
    siteChecks: undefined,
    details: '',
    submitted: false,
    submittedToSlack: false,
    error: ''
  };

  handleSiteChecks = async () => {
    const { primaryDomain, defaultDomain } = this.state;
    let urls = [];
    if (primaryDomain === defaultDomain) {
      urls.push(primaryDomain);
    } else {
      urls.push(primaryDomain, defaultDomain)
    }
    const siteChecks = await checkSites(urls);
    this.setState(() => ({
      siteChecks
    }));
  };

  handleDetailsChange = (e) => {
    const details = e.target.value;
    this.setState(() => ({
      details
    }));
  };

  handleEscalate = async (e) => {
    e.preventDefault();
    this.handleSiteChecks();
    if (!this.state.details) {
      this.setState(() => ({
        error: 'Please provide request details'
      }));
    } else {
      this.setState(() => ({
        submitted: true,
        error: ''
      }));
    }
  };

  handleSlackSubmit = async () => {
    const text = formatForSlack({
      siteId: this.state.siteId,
      primaryDomain: this.state.primaryDomain,
      defaultDomain: this.state.defaultDomain,
      details: this.state.details
    });
    const error = await submitToSlack(text);
    this.setState(() => ({
      submittedToSlack: true,
      error
    }));
  };

  render() {
    const {
      siteId,
      primaryDomain,
      defaultDomain,
      details,
      siteChecks,
      submitted,
      submittedToSlack,
      error
    } = this.state;

    return (
      <div>
        {submitted
          ? (
            <div className="form__output">
              <p>#### MWP 2.0 Assistance Request ####</p>
              <p>Site ID: {siteId}</p>
              <p>Primary Domain: {primaryDomain}</p>
              <p>Default Domain: {defaultDomain}</p>
              <p>Details: {details}</p>
              <br />
              {siteChecks &&
                siteChecks.map((siteCheck, i) => (
                  <p key={i}>{siteCheck}</p>
                ))
              }
              <button
                className="button"
                onClick={this.handleSlackSubmit}
                disabled={submittedToSlack}
              >
                Submit to Slack
              </button>
              {error
                ? <p className="form__error">{error}</p>
                : (
                  <p className="form__error">
                    {submittedToSlack && 'Issue submitted'}
                  </p>
                )
              }
            </div>
          ) : (
            <form className="form">
              <p className="form__error--under">{error}</p>
              <div className="form__group">
                <label className="form__label">Site ID</label>
                <input
                  className="text-input"
                  type="text"
                  value={siteId}
                  readOnly
                />
              </div>
              <div className="form__group">
                <label className="form__label">Primary Domain</label>
                <input
                  className="text-input"
                  type="text"
                  value={primaryDomain}
                  readOnly
                />
              </div>
              <div className="form__group">
                <label className="form__label">Default Domain</label>
                <input
                  className="text-input"
                  type="text"
                  value={defaultDomain}
                  readOnly
                />
              </div>
              <div className="form__group">
                <label className="form__label">Details</label>
                <textarea
                  className="textarea"
                  value={details}
                  onChange={this.handleDetailsChange}
                  placeholder="Description of issue and troubleshooting steps"
                >
                </textarea>
              </div>
              <button className="button" onClick={this.handleEscalate}>Escalate</button>
            </form>
          )
        }
      </div>
    );
  };
};

export default EscalationForm;