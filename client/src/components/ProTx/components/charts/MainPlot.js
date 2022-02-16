import React from 'react';
import PropTypes from 'prop-types';
import Plot from 'react-plotly.js';
import { useSelector } from 'react-redux';
import { LoadingSpinner } from '_common';
import './MainPlot.css';

function MainPlot({
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

  return (
    <div className="observed-features-plot-chart">
      <Plot
        divId="observed-features-plot"
        className="observed-features-plot"
        data={protxDemographicsDistribution.data.data}
        layout={protxDemographicsDistribution.data.layout}
        useResizeHandler
      />
    </div>
  );
}

MainPlot.propTypes = {
  geography: PropTypes.string.isRequired,
  observedFeature: PropTypes.string.isRequired,
  selectedGeographicFeature: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired
};

MainPlot.defaultProps = {};

export default MainPlot;
