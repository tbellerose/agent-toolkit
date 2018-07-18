import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAPI } from '../utils/api';
import GeneralCard from './GeneralCard';
import DatabaseCard from './DatabaseCard';
import ConnectionCard from './ConnectionCard';

export class StagingSite extends Component {
  state = {
    stagingSite: {},
    error: '',
    ready: false
  };

  getStagingSite = async () => {
    const { authToken, site } = this.props;
    if (site.children.active > 0) {
      const stagingSiteId = site.children.sites[0].id;
      const stagingSite = await getAPI(`/sites/${stagingSiteId}`, authToken);
      this.setState(() => ({
        stagingSite,
        error: stagingSite.error,
        ready: true
      }));
    } else {
      this.setState(() => ({
        error: 'No active staging site',
        ready: true
      }));
    }
  };

  componentDidMount() {
    this.getStagingSite();
  }

  render() {
    const { stagingSite, error, ready } = this.state;
    return (
      <div>
        {error
          ? (
            <div className='card'>
              <div className='card__content'>
                {error}
              </div>
            </div>
          ) : (
            <div>
              {ready &&
                <div>
                  <GeneralCard site={ stagingSite } />
                  <DatabaseCard site={ stagingSite } />
                  <ConnectionCard site={ stagingSite } />
                </div>
              }
            </div>
          )
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  authToken: state.auth.token
});

export default connect(mapStateToProps)(StagingSite);
