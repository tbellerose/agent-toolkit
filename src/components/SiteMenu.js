import React, { Component } from 'react';
import SiteMenuItem from './SiteMenuItem';

export class SiteMenu extends Component {
  state = {
    activeItem: 'general'
  };

  handleItemClick = async (e, { name }) => {
    await this.setState(() => ({ activeItem: name }));
    this.props.handleItemClick(this.state.activeItem);
  };

  render() {
    const { activeItem } = this.state;
    return (
      <nav className="menu">
        <SiteMenuItem
          name='general'
          active={activeItem === 'general'}
          onClick={this.handleItemClick}
        >
          General
        </SiteMenuItem>
        <SiteMenuItem
          name="database"
          active={activeItem === 'database'}
          onClick={this.handleItemClick}
        >
          Database
        </SiteMenuItem>
        <SiteMenuItem
          name="ssh/sftp"
          active={activeItem === 'ssh/sftp'}
          onClick={this.handleItemClick}
        >
          SSH/SFTP
        </SiteMenuItem>
        <SiteMenuItem
          name="certificate"
          active={activeItem === 'certificate'}
          onClick={this.handleItemClick}
        >
          Certificate
        </SiteMenuItem>
        <SiteMenuItem
          name="staging"
          active={activeItem === 'staging'}
          onClick={this.handleItemClick}
        >
          Staging Site
        </SiteMenuItem>
      </nav>
    );
  };
};

export default SiteMenu;