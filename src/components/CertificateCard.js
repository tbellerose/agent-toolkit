import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { getAPI } from '../utils/api';

export class CertificateCard extends Component {
  state = {
    domain: '',
    expireDate: null,
    status: '',
    error: '',
    ready: false
  };

  getCertificateInfo = async () => {
    const { authToken, site } = this.props;
    const response = await getAPI(`/sites/${site.id}/certificates`, authToken);
    const { domain, expireDate, status, error } = response[0];
    this.setState(() => ({
      domain,
      expireDate,
      status,
      error,
      ready: true
    }));
  };

  componentDidMount() {
    this.getCertificateInfo();
  }

  render() {
    const { domain, expireDate, status, error, ready } = this.state;
    return (
      <div className='card'>
        {error ? (
          <div className='card__content'>{error}</div>
        ) : (
          <div>
            {ready && (
              <div>
                <h3 className='card__title'>Certificate Info</h3>
                <div className='card__content'>
                  <p>Domain: {domain}</p>
                  <p>
                    Status:{' '}
                    {status === 'ISSUED' ? <span className='green'>{status}</span> : <span className='red'>{status}</span>}
                  </p>
                  <p>Exp. Date: {moment(expireDate).format('MM Do, YYYY')}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

CertificateCard.propTypes = {
  authToken: PropTypes.string
};

const mapStateToProps = state => ({
  authToken: state.auth.token
});

export default connect(mapStateToProps)(CertificateCard);
