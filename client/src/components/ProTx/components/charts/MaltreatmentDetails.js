import React from 'react';
import PropTypes from 'prop-types';
import {
  getFipsIdName,
  capitalizeString,
  getMaltreatmentLabel
} from '../shared/dataUtils';
import './MaltreatmentDetails.css';

function MaltreatmentDetails({
  geography,
  selectedGeographicFeature,
  maltreatmentTypes,
  maltreatmentPlotAggregate,
  maltreatmentTypesList,
  showRate
}) {
  // Maltreatment Chart Information.
  const fipsIdValue = getFipsIdName(selectedGeographicFeature);
  const maltreatmentLabel = getMaltreatmentLabel(maltreatmentTypes, showRate);
  const geographyLabel = capitalizeString(geography);

  return (
    <>
      <div className="maltreatment-types-plot-info">
        <div className="maltreatment-types-plot-info-region">
          <div className="maltreatment-types-plot-selected-region">
            <span className="maltreatment-types-plot-selected-region-label">
              FIPS: {selectedGeographicFeature}
            </span>
            <span className="maltreatment-types-plot-selected-region-value">
              {fipsIdValue} {geographyLabel}
            </span>
          </div>
        </div>
      </div>
      <div className="maltreatment-types-plot-aggregated-count">
        <span className="maltreatment-types-plot-aggregated-count-label">
          {maltreatmentLabel}
        </span>
        <span className="maltreatment-types-plot-aggregated-count-value">
          {maltreatmentPlotAggregate}
        </span>
        <div className="maltreatment-types-plot-aggregated-selection-list">
          <span className="maltreatment-types-plot-aggregated-selection-list-label">
            Current Aggregation:{'  '}
          </span>
          {maltreatmentTypesList.map(type => (
            <span
              className="maltreatment-types-plot-selected-type-summary"
              key={type}
            >
              {type}
            </span>
          ))}
        </div>
      </div>
      <div className="maltreatment-types-plot-info-summary">
        Note: All graphs are showing data for calendar years 2011-2019, not
        fiscal or academic years.
      </div>
    </>
  );
}

MaltreatmentDetails.propTypes = {
  geography: PropTypes.string.isRequired,
  selectedGeographicFeature: PropTypes.string.isRequired,
  maltreatmentTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  maltreatmentPlotAggregate: PropTypes.string.isRequired,
  maltreatmentTypesList: PropTypes.arrayOf(PropTypes.string).isRequired,
  showRate: PropTypes.string.isRequired
};

export default MaltreatmentDetails;
