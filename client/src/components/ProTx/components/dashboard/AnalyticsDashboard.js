import React from 'react';
import './AnalyticsDashboard.css';
import DashboardHeader from './DashboardHeader';
import DashboardDisplay from './DashboardDisplay';

function AnalyticsDashboard() {
  return (
    <div className="analytics-dashboard-root">
      <DashboardHeader />
      <DashboardDisplay />
    </div>
  );
}

export default AnalyticsDashboard;
