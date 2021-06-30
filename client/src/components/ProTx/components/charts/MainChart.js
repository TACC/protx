import React from 'react';
import PropTypes from 'prop-types';
import ConfigurableChart from './ConfigurableChart';
import './MainChart.css';

function MainChart({
  mapType,
  geography,
  maltreatmentTypes,
  observedFeature,
  year,
  selectedGeographicFeature,
  data
}) {
  const selectedFeatureInfo = selectedGeographicFeature;

  if (selectedFeatureInfo) {
    return (
      <div className="main-chart">
        <ConfigurableChart
          className="chart-diagram"
          mapType={mapType}
          geography={geography}
          maltreatmentTypes={maltreatmentTypes}
          observedFeature={observedFeature}
          year={year}
          selectedGeographicFeature={selectedGeographicFeature}
          data={data}
        />
      </div>
    );
  }
  return (
    <div className="main-chart">
      <div className="chart-message">
        <div className="chart-message-content">
          Please select an area on the map
        </div>
      </div>
    </div>
  );
}

MainChart.propTypes = {
  mapType: PropTypes.string.isRequired,
  geography: PropTypes.string.isRequired,
  maltreatmentTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  observedFeature: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  selectedGeographicFeature: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired
};

export default MainChart;
