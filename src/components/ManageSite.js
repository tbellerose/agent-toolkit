import React, { Component } from 'react';
import { connect } from 'react-redux';
import callAPI from '../utils/api';
import Header from './Header';
import LoadingPage from './LoadingPage';
import SiteMenu from './SiteMenu';
import GeneralCard from './GeneralCard';
import DatabaseCard from './DatabaseCard';
import ConnectionCard from './ConnectionCard';

export class ManageSite extends Component {
  state = {
    site: null,
    activeItem: 'general',
    error: ''
  };

  getSite = async () => {
    const siteId = this.props.match.params.siteId;
    const site = await callAPI(`/sites/${siteId}`, this.props.authToken);
    this.setState(() => ({
      site,
      error: site.error
    }));
  };

  handleItemClick = (activeItem) => {
    this.setState(() => ({
      activeItem
    }));
  };

  componentDidMount() {
    this.getSite();
  };

  render() {
    return (
      <div>
        <Header />
        <div className="content-container">
          {this.state.site
            ? <div className="split-layout">
              <div className="split-layout__left">
                <SiteMenu handleItemClick={this.handleItemClick} />
              </div>
              <div className="split-layout__right">
                {!!this.state.error
                  ? <div className="card">{this.state.error}</div>
                  : (() => {
                    switch (this.state.activeItem) {
                      case 'general':
                        return <GeneralCard site={this.state.site} />;
                      case 'database':
                        return <DatabaseCard site={this.state.site} />;
                      case 'ssh/sftp':
                        return <ConnectionCard site={this.state.site} />;
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
  };
};

const mapStateToProps = (state) => ({
  authToken: state.auth.token
});

export default connect(mapStateToProps)(ManageSite);