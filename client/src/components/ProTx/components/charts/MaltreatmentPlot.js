import React from 'react';
import PropTypes from 'prop-types';
import Plot from 'react-plotly.js';
import { useSelector } from 'react-redux';
import { LoadingSpinner } from '_common';
// import {
//   getFipsIdName,
//   capitalizeString,
//   getObservedFeaturesLabel
// } from '../shared/dataUtils';
import MaltreatmentDetails from './MaltreatmentDetails';
import './ObservedFeaturesPlot.css';

function ObservedFeaturesPlot({
  geography,
  observedFeature,
  selectedGeographicFeature,
  data
}) {
  const protxDemographicsDistribution = useSelector(
    state => state.protxDemographicsDistribution
  );

  if (protxDemographicsDistribution.error) {
    return (
      <div className="data-error-message">
        There was a problem loading the data.
      </div>
    );
  }

  if (protxDemographicsDistribution.loading) {
    return (
      <div className="loading-spinner">
        <LoadingSpinner />
      </div>
    );
  }

  // const observedFeaturesLabel = getObservedFeaturesLabel(observedFeature, data);

  // const selectedGeographicFeatureName = getFipsIdName(
  //   selectedGeographicFeature
  // );
  // const geographyType = capitalizeString(geography);

  return (
    <div className="observed-features-plot">
      <div className="observed-features-plot-layout">
        <MaltreatmentDetails
          geography={geography}
          observedFeature={observedFeature}
          selectedGeographicFeature={selectedGeographicFeature}
          data={data}
        />
        <div className="observed-features-plot-chart">
          <Plot
            divId="observed-features-plot"
            className="observed-features-plot"
            data={protxDemographicsDistribution.data.data}
            layout={protxDemographicsDistribution.data.layout}
            useResizeHandler
          />
        </div>
      </div>
    </div>
  );
}

ObservedFeaturesPlot.propTypes = {
  geography: PropTypes.string.isRequired,
  observedFeature: PropTypes.string.isRequired,
  selectedGeographicFeature: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired
};

ObservedFeaturesPlot.defaultProps = {};

export default ObservedFeaturesPlot;
