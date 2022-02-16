import React from 'react';
import PropTypes from 'prop-types';
import {
  getFipsIdName,
  capitalizeString,
  getObservedFeaturesLabel
} from '../shared/dataUtils';
import PredictiveFeaturesTable from './PredictiveFeaturesTable';
import './AnalyticsDetails.css';

function AnalyticsDetails({
  geography,
  observedFeature,
  selectedGeographicFeature,
  data
}) {
  // Demographics Chart Information.
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
      <div className="predictive-features-plot-info">
        <div className="observed-features-plot-info-region">
          <div className="predictive-features-plot-selected-region">
            <span className="predictive-features-plot-selected-region-label">
              FIPS: {selectedGeographicFeature}
            </span>
            <span className="predictive-features-plot-selected-region-value">
              {selectedGeographicFeatureName} {geographyType}
            </span>
          </div>
        </div>
      </div>
      <div className="predictive-features-plot-selected">
        <div className="predictive-features-plot-selected-feature">
          <span className="predictive-features-plot-selected-feature-label">
            Selected Feature:
          </span>
          <span className="predictive-features-plot-selected-feature-value">
            {observedFeaturesLabel}
          </span>
        </div>
      </div>
      <div className="predictive-features-plot-info-summary">
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
