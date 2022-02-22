import React from 'react';
import PropTypes from 'prop-types';
import {
  getFipsIdName,
  capitalizeString,
  getMaltreatmentLabel
} from '../shared/dataUtils';
import './PlotDetails.css';

function MaltreatmentDetails({
  geography,
  selectedGeographicFeature,
  maltreatmentTypes,
  maltreatmentPlotAggregate,
  maltreatmentTypesList,
  showRate
}) {
  const fipsIdValue = getFipsIdName(selectedGeographicFeature);
  const maltreatmentLabel = getMaltreatmentLabel(maltreatmentTypes, showRate);
  const geographyLabel = capitalizeString(geography);

  return (
    <>
      <div className="plot-details">
        <div className="plot-details-section">
          <div className="plot-details-section-selected">
            <span className="plot-details-section-selected-label">
              FIPS: {selectedGeographicFeature}
            </span>
            <span className="plot-details-section-selected-value">
              {fipsIdValue} {geographyLabel}
            </span>
          </div>
        </div>
        <div className="plot-details-section">
          <div className="plot-details-section-selected">
            <span className="plot-details-section-selected-label">
              {maltreatmentLabel}
            </span>
            <span className="plot-details-section-selected-value">
              {maltreatmentPlotAggregate}
            </span>
          </div>
        </div>
        <div className="plot-details-section">
          <div className="plot-details-section-selected">
            <span className="plot-details-section-selected-label">
              Current Aggregation:{'  '}
            </span>
            <span className="plot-details-section-selected-value-list">
              {maltreatmentTypesList.map(type => (
                <span className="details-list-item" key={type}>
                  {type}
                </span>
              ))}
            </span>
          </div>
        </div>
      </div>
      <div className="plot-details-summary">
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
  showRate: PropTypes.bool.isRequired
};

export default MaltreatmentDetails;
