import React from 'react';
import './AnalyticsDashboard.css';
import DashboardHeader from './DashboardHeader';
import DashboardDisplay from './DashboardDisplay';

// Impacts the Styling in DisplayLayout.css on the min-height value on lines 9 & 11. Need to make this a passed in prop so the displayLayout component can adapt.
// Add ability to pass in the header message string as well.
// false for PROD, true for all non-PROD deployments.
const showHeader = true;

function AnalyticsDashboard() {
  if (showHeader) {
    return (
      <div className="analytics-dashboard-root">
        <DashboardHeader />
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
