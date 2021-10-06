import React from 'react';
import PropTypes from 'prop-types';
import ObservedFeaturesPlot from './ObservedFeaturesPlot';
import ChartInstructions from './ChartInstructions';
import './ObservedFeaturesChart.css';

function ObservedFeaturesChart({
  mapType,
  geography,
  observedFeature,
  year,
  selectedGeographicFeature,
  data,
  showInstructions,
  showRate
}) {
  const observedFeaturesDropdownInstructions = [
    'Select an Area.',
    'Select a Demographic Feature.',
    'TimeFrame is restricted to the last census count from 2019.'
  ];
  const observedFeaturesMapInstructions = ['Select a Geographic Region.'];
  const observedFeaturesShowDescription = true;
  const observedFeaturesDescription =
    'Demographic feature percents/counts for individual geographic regions with the selected observable feature during the selected timeframe.';

  if (selectedGeographicFeature && observedFeature) {
    return (
      <div className="observed-features-report">
        <ObservedFeaturesPlot
          mapType={mapType}
          geography={geography}
          observedFeature={observedFeature}
          year={year}
          selectedGeographicFeature={selectedGeographicFeature}
          data={data}
          showRate={showRate}
        />
      </div>
    );
  }
  return (
    <div className="observed-features-report">
      {showInstructions && (
        <ChartInstructions
          dropdownInstructions={observedFeaturesDropdownInstructions}
          mapInstructions={observedFeaturesMapInstructions}
          showDescription={observedFeaturesShowDescription}
          description={observedFeaturesDescription}
        />
      )}
    </div>
  );
}

ObservedFeaturesChart.propTypes = {
  mapType: PropTypes.string.isRequired,
  geography: PropTypes.string.isRequired,
  observedFeature: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  selectedGeographicFeature: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired,
  showRate: PropTypes.bool.isRequired,
  showInstructions: PropTypes.bool
};

ObservedFeaturesChart.defaultProps = {
  showInstructions: false
};

export default ObservedFeaturesChart;
