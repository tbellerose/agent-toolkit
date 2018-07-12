import React, { Component } from 'react';
import { connect } from 'react-redux';
import config from '../../app.config';
import Header from './Header';
import LoadingPage from './LoadingPage';
import SiteMenu from './SiteMenu';

export class ManageSite extends Component {
  state = {
    site: {},
    activeItem: 'general'
  };

  getSite = async () => {
    const siteId = this.props.match.params.siteId;
    const response = await fetch(`${config.api_uri}/sites/${siteId}`, {
      headers: {
        'Authorization': `sso-jwt ${this.props.authToken}`
      }
    });
    const site = await response.json();
    this.setState(() => ({
      site
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
            ? (
              <div className="split-layout">
                <div className="split-layout__left">
                  <SiteMenu handleItemClick={this.handleItemClick} />
                </div>
                <div className="split-layout__right">
                  {this.state.activeItem}
                </div>
              </div>
            ) : (
              <LoadingPage />
            )
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