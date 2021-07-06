import React from 'react';
import PropTypes from 'prop-types';
import PredictiveFeaturesTable from './PredictiveFeaturesTable';
import ConfigurableChart from './ConfigurableChart';
import './ReportChart.css';

function ReportChart({
  mapType,
  geography,
  maltreatmentTypes,
  observedFeature,
  year,
  selectedGeographicFeature,
  data
}) {
  if (mapType === 'maltreatment') {
    if (selectedGeographicFeature) {
      return (
        <div className="report-chart">
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
      <div className="report-chart">
        <PredictiveFeaturesTable />
        <hr />
        <div className="report-chart-message">
          <h2>Usage Instructions</h2>
          <h3>In the Dropdown Selection Menu (top):</h3>
          <ul>
            <li className="analysis-chart-message-note">
              Map is restricted to Demographic Features.
            </li>
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

ReportChart.propTypes = {
  mapType: PropTypes.string.isRequired,
  geography: PropTypes.string.isRequired,
  maltreatmentTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  observedFeature: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  selectedGeographicFeature: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired
};

export default ReportChart;
