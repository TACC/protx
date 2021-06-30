import React from 'react';
import './DashboardHeader.css';

const hostName = 'COOKS PRE-PRODUCTION PORTAL';
const messageString =
  'Geospatial data analytics dashboard displaying incomplete demonstration data.';

function DashboardHeader() {
  return (
    <div className="dashboard-header-root">
      <p>
        <b>{hostName}</b> {messageString}
      </p>
    </div>
  );
}

export default DashboardHeader;
