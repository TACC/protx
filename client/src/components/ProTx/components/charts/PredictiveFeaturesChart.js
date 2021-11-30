import React from 'react';
import PropTypes from 'prop-types';
import PredictiveFeaturesTable from './PredictiveFeaturesTable';
import PredictiveFeaturesPlot from './PredictiveFeaturesPlot';
import ChartInstructions from './ChartInstructions';
import './PredictiveFeaturesChart.css';

function PredictiveFeaturesChart({
  mapType,
  geography,
  observedFeature,
  year,
  selectedGeographicFeature,
  data,
  showInstructions
}) {
  const showPlot = false; // Hide the plot while its still a work-in-progress.

  if (selectedGeographicFeature) {
    return (
      <div className="predictive-features-chart">
        <PredictiveFeaturesTable
          selectedGeographicFeature={selectedGeographicFeature}
        />
        {showPlot && (
          <PredictiveFeaturesPlot
            mapType={mapType}
            geography={geography}
            observedFeature={observedFeature}
            year={year}
            selectedGeographicFeature={selectedGeographicFeature}
            data={data}
          />
        )}
      </div>
    );
  }

  return (
    <div className="predictive-features-chart">
      <PredictiveFeaturesTable />
      {showInstructions && <ChartInstructions currentReportType="predictive" />}
    </div>
  );
}

PredictiveFeaturesChart.propTypes = {
  mapType: PropTypes.string.isRequired,
  geography: PropTypes.string.isRequired,
  observedFeature: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  selectedGeographicFeature: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired,
  showInstructions: PropTypes.bool
};

PredictiveFeaturesChart.defaultProps = {
  showInstructions: false
};

export default PredictiveFeaturesChart;
