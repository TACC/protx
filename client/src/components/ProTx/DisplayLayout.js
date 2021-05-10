import React from 'react';
import './DisplayLayout.css';
import MainMap from './MainMap';
import MainChart from './MainChart';

function DisplayLayout() {
  return (
    <div className="display-layout-root">
      <div className="display-layout-row">
        <div className="display-layout-column">
          <div className="chart-layout">
            <MainChart />
          </div>
        </div>
        <div className="display-layout-column">
          <div className="map-layout">
            <MainMap />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DisplayLayout;
