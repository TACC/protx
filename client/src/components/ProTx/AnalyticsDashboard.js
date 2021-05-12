import React from 'react';
import './AnalyticsDashboard.css';
import DashboardHeader from './DashboardHeader';
// import DashboardNavigation from './DashboardNavigation';
import DashboardDisplay from './DashboardDisplay';

function AnalyticsDashboard() {
  return (
    <div className="analytics-dashboard-root">
      {/* <DashboardHeader /> */}
      {/* <DashboardNavigation /> */}
      <DashboardDisplay />
    </div>
  );
}

export default AnalyticsDashboard;
