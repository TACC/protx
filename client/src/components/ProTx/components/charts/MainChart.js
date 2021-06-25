import React from 'react';
import './MainChart.css';
import PropTypes from 'prop-types';
import ScatterBarChart from './ScatterBarChart';

function MainChart({
  mapType,
  geography,
  maltreatmentTypes,
  observedFeature,
  year,
  selectedGeographicFeature,
  data
}) {
  const selectedFeatureInfo = selectedGeographicFeature || 'NONE';
  return (
    <div className="main-chart">
      <span style={{ color: 'red' }}>
        mapType: {mapType} geography: {} year: {year} selected feature:{' '}
        {selectedFeatureInfo}
      </span>
      <ScatterBarChart className="chart-diagram" />
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
