import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import MaltreatmentTypesPlot from './MaltreatmentTypesPlot';
import ChartInstructions from './ChartInstructions';
import './MaltreatmentChart.css';

function MaltreatmentChart({
  mapType,
  geography,
  maltreatmentTypes,
  year,
  showRate,
  selectedGeographicFeature,
  data,
  showInstructions
}) {
  if (selectedGeographicFeature && maltreatmentTypes.length !== 0) {
    return (
      <div className="maltreatment-chart">
        <MaltreatmentTypesPlot
          mapType={mapType}
          geography={geography}
          maltreatmentTypes={maltreatmentTypes}
          year={year}
          showRate={showRate}
          selectedGeographicFeature={selectedGeographicFeature}
          data={data}
        />
        {/* {!protxMaltreatmentDistribution.loading && ( */}
        <ChartInstructions currentReportType="hidden" />
        {/* )} */}
      </div>
    );
  }
  return (
    <div className="maltreatment-chart">
      {showInstructions && (
        <ChartInstructions currentReportType="maltreatment" />
      )}
    </div>
  );
}

MaltreatmentChart.propTypes = {
  mapType: PropTypes.string.isRequired,
  geography: PropTypes.string.isRequired,
  maltreatmentTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  year: PropTypes.string.isRequired,
  showRate: PropTypes.bool.isRequired,
  selectedGeographicFeature: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired,
  showInstructions: PropTypes.bool
};

MaltreatmentChart.defaultProps = {
  showInstructions: false
};

export default MaltreatmentChart;
