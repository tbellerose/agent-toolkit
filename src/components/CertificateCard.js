import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { getAPI } from '../utils/api';

export class CertificateCard extends Component {
  state = {
    domain: '',
    expireDate: undefined,
    status: '',
    error: ''
  };

  getCertificateInfo = async () => {
    const { authToken, site } = this.props;
    const { domain, expireDate, status, error } = await getAPI(
      `/sites/${site.id}/certificates`,
      authToken
    );
    this.setState(() => ({
      domain,
      expireDate,
      status,
      error
    }));
  };

  componentDidMount() {
    this.getCertificateInfo();
  };

  render() {
    return (
      <div className="card">
        {!!this.state.error
          ? <div className="card__content">{this.state.error}</div>
          : (
            <div>
              <h3 className="card__title">Certificate Info</h3>
              <div className="card__content">
                <p>Domain: {this.state.domain}</p>
                <p>Status: {this.state.status === "Active"
                  ? <span className="green">{this.state.status}</span>
                  : <span className="red">{this.state.status}</span>
                }
                </p>
                <p>Exp. Date: {moment(this.state.expireDate).format('MM Do, YYYY')}</p>
              </div>
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

export default connect(mapStateToProps)(CertificateCard);