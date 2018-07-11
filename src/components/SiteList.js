import React, { Component } from 'react';
import { connect } from 'react-redux';

export const SiteList = (props) => (
  <div className="site-list">
    {props.sites.length > 0 ? (
      props.sites.map((site) => (
        <p key={site.id} className="list-item">{site.id}</p>
      ))
    ) : (
        <p className="list-item--center">No Sites</p>
      )
    }
  </div>
);

const mapStateToProps = (state) => ({
  sites: state.sites
});

export default connect(mapStateToProps)(SiteList);