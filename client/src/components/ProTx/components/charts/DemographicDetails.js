import React from 'react';
import PropTypes from 'prop-types';
import {
  getFipsIdName,
  capitalizeString,
  getObservedFeaturesLabel
} from '../shared/dataUtils';
import './DemographicDetails.css';

function DemographicDetails({
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
      <div className="observed-features-plot-info">
        <div className="observed-features-plot-info-region">
          <div className="observed-features-plot-selected-region">
            <span className="observed-features-plot-selected-region-label">
              FIPS: {selectedGeographicFeature}
            </span>
            <span className="observed-features-plot-selected-region-value">
              {selectedGeographicFeatureName} {geographyType}
            </span>
          </div>
        </div>
      </div>
      <div className="observed-features-plot-selected">
        <div className="observed-features-plot-selected-feature">
          <span className="observed-features-plot-selected-feature-label">
            Selected Feature:
          </span>
          <span className="observed-features-plot-selected-feature-value">
            {observedFeaturesLabel}
          </span>
        </div>
      </div>
      <div className="observed-features-plot-info-summary">
        Note: All graphs are showing data for calendar years 2011-2019, not
        fiscal or academic years.
      </div>
    </>
  );
}

DemographicDetails.propTypes = {
  geography: PropTypes.string.isRequired,
  observedFeature: PropTypes.string.isRequired,
  selectedGeographicFeature: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired
};

export default DemographicDetails;
