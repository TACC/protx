import React from 'react';
import './DisplayLayout.css';
import MainMap from './MainMap';
import MainChart from './MainChart';

function DisplayLayout() {
  return (
    <div className="display-layout-root">
      <div className="chart-layout">
        <MainChart />
      </div>
      <div className="map-layout">
        <MainMap />
      </div>
    </div>
  );
}

export default DisplayLayout;
