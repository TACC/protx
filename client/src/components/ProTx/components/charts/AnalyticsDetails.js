import React from 'react';
import PropTypes from 'prop-types';
import {
  getFipsIdName,
  capitalizeString,
  getObservedFeaturesLabel
} from '../shared/dataUtils';
import PredictiveFeaturesTable from './PredictiveFeaturesTable';
import './PlotDetails.css';

function AnalyticsDetails({
  geography,
  observedFeature,
  selectedGeographicFeature,
  data
}) {
  const observedFeaturesLabel = getObservedFeaturesLabel(observedFeature, data);
  const selectedGeographicFeatureName = getFipsIdName(
    selectedGeographicFeature
  );
  const geographyType = capitalizeString(geography);

  return (
    <>
      <PredictiveFeaturesTable
        selectedGeographicFeature={selectedGeographicFeature}
      />
      <div className="plot-details">
        <div className="plot-details-section">
          <div className="plot-details-section-selected">
            <span className="plot-details-section-selected-label">
              FIPS: {selectedGeographicFeature}
            </span>
            <span className="plot-details-section-selected-value">
              {selectedGeographicFeatureName} {geographyType}
            </span>
          </div>
        </div>
        <div className="plot-details-section">
          <div className="plot-details-section-selected">
            <span className="plot-details-section-selected-label">
              Selected Feature:
            </span>
            <span className="plot-details-section-selected-value">
              {observedFeaturesLabel}
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

AnalyticsDetails.propTypes = {
  geography: PropTypes.string.isRequired,
  observedFeature: PropTypes.string.isRequired,
  selectedGeographicFeature: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired
};

export default AnalyticsDetails;
