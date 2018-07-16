import React, { Component } from 'react';

export class EscalationForm extends Component {
  state = {
    siteId: this.props.site.id,
    primaryDomain: this.props.site.domains.primary.name,
    defaultDomain: this.props.site.domains.default.name,
    details: '',
    submitted: false,
    error: ''
  };

  handleDetailsChange = (e) => {
    const details = e.target.value;
    this.setState(() => ({
      details
    }));
  };

  handleEscalate = async (e) => {
    e.preventDefault();
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

  render() {
    const { siteId, primaryDomain, defaultDomain, details, submitted, error } = this.state;
    return (
      <div>
        {this.state.submitted
          ? (
            <div className="form__output">
              <p>#### MWP 2.0 Assistance Request ####</p>
              <p>Site ID: {siteId}</p>
              <p>Primary Domain: {primaryDomain}</p>
              <p>Default Domain: {defaultDomain}</p>
              <p>Details: {details}</p>
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