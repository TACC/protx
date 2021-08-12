import React from 'react';
import PropTypes from 'prop-types';
import MaltreatmentTypesPlot from './MaltreatmentTypesPlot';
import ObservedFeaturesPlot from './ObservedFeaturesPlot';
import ChartInstructions from './ChartInstructions';
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
  // console.log(mapType);
  // console.log(geography);
  // console.log(maltreatmentTypes);
  // console.log(observedFeature);
  // console.log(year);
  // console.log(selectedGeographicFeature);
  // console.log(data);

  const maltreatmentDropdownInstructions = [
    'Using Map Type Maltreatment',
    'Data is restricted to the county area',
    'Select one or more Maltreatment Types',
    'Select a Year'
  ];
  const maltreatmentMapInstructions = ['Select a Geographic Region'];
  const maltreatmentShowDescription = true;
  const maltreatmentDescription =
    'Maltreatment counts for individual geographic regions with specifc maltreatment types during the selected year.';

  const observedFeaturesDropdownInstructions = [
    'Select an Area.',
    'Select a Demographic Feature.',
    'TimeFrame is restricted to the last census count from 2019.'
  ];
  const observedFeaturesMapInstructions = ['Select a Geographic Region.'];
  const observedFeaturesShowDescription = true;
  const observedFeaturesDescription =
    'Demographic feature counts for individual geographic regions with specific observable features during selected timeframes.';

  if (mapType === 'maltreatment') {
    if (selectedGeographicFeature && maltreatmentTypes.length !== 0) {
      return (
        <div className="analysis-chart">
          <MaltreatmentTypesPlot
            mapType={mapType}
            geography={geography}
            maltreatmentTypes={maltreatmentTypes}
            year={year}
            selectedGeographicFeature={selectedGeographicFeature}
            data={data}
            debugState
          />
        </div>
      );
    }
    return (
      <div className="analysis-chart">
        <ChartInstructions
          dropdownInstructions={maltreatmentDropdownInstructions}
          mapInstructions={maltreatmentMapInstructions}
          showDescription={maltreatmentShowDescription}
          description={maltreatmentDescription}
        />
      </div>
    );
  }

  if (mapType === 'observedFeatures') {
    if (selectedGeographicFeature && observedFeature) {
      return (
        <div className="analysis-chart">
          <ObservedFeaturesPlot
            mapType={mapType}
            geography={geography}
            maltreatmentTypes={maltreatmentTypes}
            observedFeature={observedFeature}
            year={year}
            selectedGeographicFeature={selectedGeographicFeature}
            data={data}
            // debugState
          />
        </div>
      );
    }
    return (
      <div className="analysis-chart">
        <ChartInstructions
          dropdownInstructions={observedFeaturesDropdownInstructions}
          mapInstructions={observedFeaturesMapInstructions}
          showDescription={observedFeaturesShowDescription}
          description={observedFeaturesDescription}
        />
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
