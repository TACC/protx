import React from 'react';
import PropTypes from 'prop-types';
import MaltreatmentTypesPlot from './MaltreatmentTypesPlot';
import ChartInstructions from './ChartInstructions';
import './MaltreatmentChart.css';

function MaltreatmentChart({
  mapType,
  geography,
  maltreatmentTypes,
  year,
  selectedGeographicFeature,
  data,
  showInstructions
}) {
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

  if (selectedGeographicFeature && maltreatmentTypes.length !== 0) {
    return (
      <div className="maltreatment-report">
        <MaltreatmentTypesPlot
          mapType={mapType}
          geography={geography}
          maltreatmentTypes={maltreatmentTypes}
          year={year}
          selectedGeographicFeature={selectedGeographicFeature}
          data={data}
        />
      </div>
    );
  }
  return (
    <div className="maltreatment-report">
      {showInstructions && (
        <ChartInstructions
          dropdownInstructions={maltreatmentDropdownInstructions}
          mapInstructions={maltreatmentMapInstructions}
          showDescription={maltreatmentShowDescription}
          description={maltreatmentDescription}
        />
      )}
    </div>
  );
}

MaltreatmentChart.propTypes = {
  mapType: PropTypes.string.isRequired,
  geography: PropTypes.string.isRequired,
  maltreatmentTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  year: PropTypes.string.isRequired,
  selectedGeographicFeature: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired,
  showInstructions: PropTypes.bool
};

MaltreatmentChart.defaultProps = {
  showInstructions: false
};

export default MaltreatmentChart;
