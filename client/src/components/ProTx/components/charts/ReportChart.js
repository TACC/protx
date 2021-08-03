import React from 'react';
import PropTypes from 'prop-types';
import PredictiveFeaturesTable from './PredictiveFeaturesTable';
import PredictiveFeaturesPlot from './PredictiveFeaturesPlot';
import ChartInstructions from './ChartInstructions';
import './ReportChart.css';

/**
 * TODO: Complete the PredictiveFeaturesPlot.
 * TODO: Uncomment the disabled code.
 */

function ReportChart({
  mapType,
  geography,
  maltreatmentTypes,
  observedFeature,
  year,
  selectedGeographicFeature,
  data
}) {
  const reportDropdownInstructions = [
    'Map is restricted to Demographic Features.',
    'Map is restricted to the County Area.',
    'Select a Demographic Feature.',
    'TimeFrame is restricted to most recent census data (2019).'
  ];
  const reportMapInstructions = ['Select a Geographic Region.'];
  const reportShowDescription = false;
  const reportDescription = 'Description needed.';

  if (selectedGeographicFeature) {
    return (
      <div className="report-chart">
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
          // debugState
        />
      </div>
    );
  }
  return (
    <div className="report-chart">
      <PredictiveFeaturesTable />
      <ChartInstructions
        dropdownInstructions={reportDropdownInstructions}
        mapInstructions={reportMapInstructions}
        showDescription={reportShowDescription}
        description={reportDescription}
      />
    </div>
  );
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
