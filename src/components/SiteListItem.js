import React from 'react';
import { Link } from 'react-router-dom';

export const SiteListItem = ({ id, domains, ipAddress, status, sshStatus, children }) => (
  <Link className="list-item" to={`/manage/${id}`}>
    <div>
      <h3 className="list-item__title">{domains.primary.name}</h3>
      <img
        className="list-item__thumbnail"
        src={`https://api.letsvalidate.com/v1/thumbs?url=${domains.primary.name}?nocache=1`}
        alt="Website Thumbnail"
      />
    </div>
    <div>
      <p>Site ID: {id}</p>
      <p>Default Domain: {domains.default.name}</p>
      <p>IP Address: {ipAddress}</p>
    </div>
    <div>
      <p>Status:
        <span className={status === "Active" ? "green" : "red"}> {status}</span>
      </p>
      <p>SSH Status:
        <span className={sshStatus === "Active" ? "green" : "red"}> {sshStatus}</span>
      </p>
      <p>
        Staging Site:
        {
          children.active > 0
            ? <span className="green">Active</span>
            : <span className="red">Inactive</span>
        }
      </p>
    </div>
  </Link>
);

export default SiteListItem;