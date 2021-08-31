import React from 'react';
import DashboardHeader from './DashboardHeader';
import DashboardDisplay from './DashboardDisplay';
import '../Variables.css';
import './Dashboard.css';

// Need to find a way to set this value based on some external configuration value so it changes based on the hosts settings.
// false for PROD, true for all non-PROD deployments.
const showHeader = true;
const hostName = "COOK·CHILDREN'S·PRE-PRODUCTION·PORTAL";
const messageString =
  'Geospatial data analytics dashboard using incomplete demonstration data.';

function Dashboard() {
  if (showHeader) {
    return (
      <div className="dashboard-root-header">
        <DashboardHeader hostName={hostName} messageString={messageString} />
        <DashboardDisplay />
      </div>
    );
  }

  return (
    <div className="dashboard-root">
      <DashboardDisplay />
    </div>
  );
}

export default Dashboard;
