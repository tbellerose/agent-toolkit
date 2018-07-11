import React, { Component } from 'react';
import { connect } from 'react-redux';
import config from '../../app.config';
import Header from './Header';
import LoadingPage from './LoadingPage';

export class ManageSite extends Component {
  state = {
    site: {}
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
              <div>
                <h2>Primary Site</h2>
                <h2>Staging Site</h2>
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