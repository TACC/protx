import React from 'react';
import './DisplayLayout.scss';
import MainMap from './MainMap';
import MainChart from './MainChart';

function DisplayLayout() {
  return (
    <div styleName="display-layout-root">
      {/* <MainChart className="chart-layout" /> */}
      {/* <MainMap className="map-layout" /> */}
      <div styleName="row">
        <div styleName="column">
          <div styleName="chart-layout">
            <MainChart />
          </div>
        </div>
        <div styleName="column">
          <div styleName="map-layout">
            <MainMap />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DisplayLayout;
