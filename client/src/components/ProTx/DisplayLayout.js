import React from 'react';
import './DisplayLayout.css';
import MainMap from './MainMap';
import MainChart from './MainChart';

function DisplayLayout() {
  return (
    <div className="display-layout-root">
      {/* <MainChart className="chart-layout" /> */}
      {/* <MainMap className="map-layout" /> */}
      <div className="row">
        <div className="column">
          <div className="blue-column">
            <MainChart className="chart-layout" />
          </div>
        </div>
        <div className="column">
          <div className="green-column">
            <MainMap className="map-layout" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DisplayLayout;
