import React from 'react';
import './AnalyticsDashboard.css';
import DashboardHeader from './DashboardHeader';
import DashboardDisplay from './DashboardDisplay';

// Need to find a way to set this value based on some external configuration value so it changes based on the hosts settings.
// false for PROD, true for all non-PROD deployments.
const showHeader = true;
const hostName = 'COOKS PRE-PRODUCTION PORTAL';
const messageString =
  'Geospatial data analytics dashboard displaying incomplete demonstration data.';

function AnalyticsDashboard() {
  if (showHeader) {
    return (
      <div className="analytics-dashboard-root-header">
        <DashboardHeader hostName={hostName} messageString={messageString} />
        <DashboardDisplay />
      </div>
    );
  }

  return (
    <div className="analytics-dashboard-root">
      <DashboardDisplay />
    </div>
  );
}

export default AnalyticsDashboard;
