import React from 'react';
import './DashboardNavigation.css';

function DashboardNavigation() {
  return (
    <div className="dashboard-nav-root">
      <button type="button" className="btn-default dashboard-nav-btn">
        Single Map
      </button>
      <button type="button" className="btn-default dashboard-nav-btn" disabled>
        Dual Map
      </button>
    </div>
  );
}

export default DashboardNavigation;
