import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

export class SiteMenuItem extends Component {
  handleClick = (e) => {
    _.invoke(this.props, 'onClick', e, this.props);
  };

  render() {
    const { active, children } = this.props;
    return (
      <a
        className={ active ? 'menu__item active' : 'menu__item' }
        onClick={ this.handleClick }
      >
        {children}
      </a>
    );
  }
}

SiteMenuItem.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node
};

export default SiteMenuItem;
