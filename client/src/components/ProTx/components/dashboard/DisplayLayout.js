import React from 'react';
import './DisplayLayout.css';
import PropTypes from 'prop-types';
import MainMap from '../maps/MainMap';
import MainChart from '../charts/MainChart';

function DisplayLayout({
  mapType,
  geography,
  maltreatmentTypes,
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
          maltreatmentTypes={maltreatmentTypes}
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
  maltreatmentTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  observedFeature: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired
};

export default DisplayLayout;
