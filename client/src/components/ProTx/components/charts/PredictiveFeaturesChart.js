import React from 'react';
import PropTypes from 'prop-types';
import PredictiveFeaturesTable from './PredictiveFeaturesTable';
import PredictiveFeaturesPlot from './PredictiveFeaturesPlot';
import ChartInstructions from './ChartInstructions';
import './PredictiveFeaturesChart.css';

function PredictiveFeaturesChart({
  geography,
  observedFeature,
  year,
  selectedGeographicFeature,
  data,
  showInstructions
}) {
  const predictiveFeaturesDropdownInstructions = [
    'Map is restricted to the County Area.',
    'Demographic is restrcited to the top seven predictive features.',
    'Year is restricted to 2019 (the most recent census data).'
  ];
  const predictiveFeaturesMapInstructions = ['Select a Geographic Region.'];
  const predictiveFeaturesShowDescription = false;
  const predictiveFeaturesDescription = 'Description needed.';

  if (selectedGeographicFeature) {
    return (
      <div className="predictive-features-chart">
        <PredictiveFeaturesTable
          selectedGeographicFeature={selectedGeographicFeature}
        />
        <PredictiveFeaturesPlot
          geography={geography}
          observedFeature={observedFeature}
          year={year}
          selectedGeographicFeature={selectedGeographicFeature}
          data={data}
        />
      </div>
    );
  }

  return (
    <div className="predictive-features-chart">
      <PredictiveFeaturesTable />
      {showInstructions && (
        <ChartInstructions
          dropdownInstructions={predictiveFeaturesDropdownInstructions}
          mapInstructions={predictiveFeaturesMapInstructions}
          showDescription={predictiveFeaturesShowDescription}
          description={predictiveFeaturesDescription}
        />
      )}
    </div>
  );
}

PredictiveFeaturesChart.propTypes = {
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
