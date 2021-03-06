import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { getAPI } from '../utils/api';
import Header from './Header';
import LoadingPage from './LoadingPage';
import SiteMenu from './SiteMenu';
import GeneralCard from './GeneralCard';
import DatabaseCard from './DatabaseCard';
import ConnectionCard from './ConnectionCard';
import CertificateCard from './CertificateCard';
import StagingSite from './StagingSite';

export class ManageSite extends Component {
  state = {
    site: null,
    activeItem: 'general',
    error: ''
  };

  handleItemClick = (activeItem) => {
    this.setState(() => ({
      activeItem
    }));
  };

  getSite = async () => {
    const siteId = this.props.match.params.siteId;
    const site = await getAPI(`/sites/${siteId}`, this.props.authToken);
    if (!_.isEqual(this.state.site, site)) {
      this.setState(() => ({
        site,
        error: site.error
      }));
    }
  };

  componentDidMount() {
    this.getSite();
  }

  componentDidUpdate() {
    this.getSite();
  }

  render() {
    return (
      <div>
        <Header />
        <div className='content-container'>
          {this.state.site
            ? <div className='split-layout'>
              <div className='split-layout__left'>
                <SiteMenu handleItemClick={ this.handleItemClick } />
              </div>
              <div className='split-layout__right'>
                {this.state.error
                  ? <div className='card'>{this.state.error}</div>
                  : (() => {
                    switch (this.state.activeItem) {
                      case 'general':
                        return <GeneralCard site={ this.state.site } />;
                      case 'database':
                        return <DatabaseCard site={ this.state.site } />;
                      case 'ssh/sftp':
                        return <ConnectionCard site={ this.state.site } />;
                      case 'certificate':
                        return <CertificateCard site={ this.state.site } />;
                      case 'staging':
                        return <StagingSite site={ this.state.site } />;
                      default:
                        return null;
                    }
                  })()
                }
              </div>
            </div>
            : <LoadingPage />
          }
        </div>
      </div>
    );
  }
}

ManageSite.propTypes = {
  match: PropTypes.object,
  authToken: PropTypes.string
};

const mapStateToProps = (state) => ({
  authToken: state.auth.token
});

export default connect(mapStateToProps)(ManageSite);
