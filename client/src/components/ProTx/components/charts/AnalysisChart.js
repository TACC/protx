import React from 'react';
import PropTypes from 'prop-types';
import ConfigurableChart from './ConfigurableChart';
import './AnalysisChart.css';

function AnalysisChart({
  mapType,
  geography,
  maltreatmentTypes,
  observedFeature,
  year,
  selectedGeographicFeature,
  data
}) {
  if (mapType === 'maltreatment' && maltreatmentTypes.length !== 0) {
    if (selectedGeographicFeature) {
      return (
        <div className="analysis-chart">
          <ConfigurableChart
            className="maltreatment-plot"
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
      <div className="analysis-chart">
        <div className="analysis-chart-message">
          <h2>Instructions</h2>
          <h3>In the Dropdown Selection Menu (top):</h3>
          <ul>
            <li className="analysis-chart-message-note">
              Data is restricted to the county area.
            </li>
            <li>Select one or more Maltreatment Types.</li>
            <li>Select a Year.</li>
          </ul>
          <h3>On the Map (left):</h3>
          <ul>
            <li>Select a Geographic Region.</li>
          </ul>
          {/* <h4>Purpose</h4> */}
          {/* <p>
            Maltreatment counts for individual geographic regions with specifc
            maltreatment types during the selected year.
          </p> */}
        </div>
      </div>
    );
  }

  if (mapType === 'observedFeatures' && observedFeature) {
    if (selectedGeographicFeature) {
      return (
        <div className="analysis-chart">
          <div className="analysis-chart-message">
            The {mapType} plot (#demographic-features) for {observedFeature} in
            the {geography} of {selectedGeographicFeature} goes here.
          </div>
        </div>
      );
    }
    return (
      <div className="analysis-chart">
        <div className="analysis-chart-message">
          <h2>Instructions</h2>
          <h3>In the Dropdown Selection Menu (top):</h3>
          <ul>
            <li>Select an Area.</li>
            <li>Select a Demographic Feature.</li>
            <li className="analysis-chart-message-note">
              TimeFrame is restricted to the last census count from 2019.
            </li>
          </ul>
          <h3>On the Map (left):</h3>
          <ul>
            <li>Select a Geographic Region.</li>
          </ul>
          {/* <h4>Purpose</h4> */}
          {/* <p>
            Demographic feature counts for individual geographic regions with
            specific observable features during selected timeframes.
          </p> */}
        </div>
      </div>
    );
  }
}

AnalysisChart.propTypes = {
  mapType: PropTypes.string.isRequired,
  geography: PropTypes.string.isRequired,
  maltreatmentTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  observedFeature: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  selectedGeographicFeature: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired
};

export default AnalysisChart;
