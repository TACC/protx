import React from 'react';
import './DisplayLayout.css';
import PropTypes from 'prop-types';
import MainMap from './MainMap';
import MainChart from './MainChart';

function DisplayLayout({
  mapType,
  geography,
  maltreatmentType,
  observedFeature,
  year,
  data
}) {
  return (
    <div className="display-layout-root">
      <div className="chart-layout">
        <MainChart />
      </div>
      <div className="map-layout">
        <MainMap
          mapType={mapType}
          geography={geography}
          maltreatmentType={maltreatmentType}
          observedFeature={observedFeature}
          year={year}
          data={data}
        />
      </div>
    </div>
  );
}

DisplayLayout.propTypes = {
  mapType: PropTypes.string.isRequired,
  geography: PropTypes.string.isRequired,
  maltreatmentType: PropTypes.string.isRequired,
  observedFeature: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired
};

export default DisplayLayout;
