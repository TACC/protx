import React from 'react';
import PropTypes from 'prop-types';
import './DashboardHeader.css';

function DashboardHeader({ hostName, messageString }) {
  return (
    <div className="dashboard-header-root">
      <p>
        <b>{hostName}</b> {messageString}
      </p>
    </div>
  );
}

DashboardHeader.propTypes = {
  hostName: PropTypes.string.isRequired,
  messageString: PropTypes.string.isRequired
  // eslint-disable-next-line react/forbid-prop-types
};

export default DashboardHeader;
