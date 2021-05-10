import React from 'react';
import MainMap from './MainMap';
import MainChart from './MainChart';

function Layout() {
  return (
    <>
      {/* <div styleName="chart-root"> */}
        <MainChart />
      {/* </div> */}
      {/* <div styleName="map-root"> */}
        <MainMap />
      {/* </div> */}
    </>
  );
}

export default Layout;
