import React from 'react';
import './DashboardDisplay.css';
import DisplaySelectors from './DisplaySelectors';
import DisplayLayout from './DisplayLayout';

function DashboardDisplay() {
  return (
    <div className="dashboard-display-root">
      <DisplaySelectors />
      <DisplayLayout />
    </div>
  );
}

export default DashboardDisplay;
