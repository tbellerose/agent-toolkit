import React, { Component } from 'react';
import { connect } from 'react-redux';
import SiteListItem from './SiteListItem';

export const SiteList = (props) => (
  <div className="site-list">
    {props.sites.length > 0
      ? (
        props.sites.map((site) => (
          <SiteListItem key={site.id} {...site} />
        ))
      ) : (
        <div className="list-item--center">No Sites</div>
      )
    }
  </div>
);

const mapStateToProps = (state) => ({
  sites: state.sites
});

export default connect(mapStateToProps)(SiteList);