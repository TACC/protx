import React from 'react';
import PropTypes from 'prop-types';
import PredictiveFeaturesTable from './PredictiveFeaturesTable';
import PredictiveFeaturesPlot from './PredictiveFeaturesPlot';
import ChartInstructions from './ChartInstructions';
import './PredictiveFeaturesChart.css';

function PredictiveFeaturesChart({
  mapType,
  geography,
  maltreatmentTypes,
  observedFeature,
  year,
  selectedGeographicFeature,
  data,
  showInstructions
}) {
  const predictiveFeaturesDropdownInstructions = [
    'Map is restricted to Demographic Features.',
    'Map is restricted to the County Area.',
    'Select a Demographic Feature.',
    'TimeFrame is restricted to most recent census data (2019).'
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
  mapType: PropTypes.string.isRequired,
  geography: PropTypes.string.isRequired,
  maltreatmentTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
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
