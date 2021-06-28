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
  // const selectedFeatureInfo = selectedGeographicFeature || 'NONE';
  const selectedFeatureInfo = selectedGeographicFeature;
  if (selectedFeatureInfo) {
    return (
      <div className="main-chart">
        {/*
        <!--
        <p>
          <ul>
            <li>mapType: {mapType}</li>
            <li>geography: {geography}</li>
            <li>maltreatment types: {maltreatmentTypes}</li>
            <li>observedFeature={observedFeature}</li>
            <li>year: {year}</li>
            <li>
              selected feature:
              {selectedGeographicFeature}
            </li>
            <li>selected feature info: {selectedFeatureInfo}</li>
          </ul>
        </p>
        -->
        */}
        <ConfigurableChart className="chart-diagram" />
      </div>
    );
  }
  return (
    <div className="main-chart">
      <p className="chart-message">
        <h2>Please select a county on the map.</h2>
      </p>
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
