import React from 'react';
import PropTypes from 'prop-types';
// import Plot from 'react-plotly.js';
// import { OBSERVED_FEATURES, MALTREATMENT } from '../meta';
// import {
//   getObservedFeatureValue,
//   getMaltreatmentAggregatedValue,
//   getMaltreatmentSelectedValues
// } from '../util';
import DebugPlot from './DebugPlot';
import './PredictiveFeaturesPlot.css';

// Set this to true to inspect the component data in a tabular view.
// This will hide the chart rendering.
const debugState = false;

function PredictiveFeaturesPlot({
  mapType,
  geography,
  maltreatmentTypes,
  observedFeature,
  year,
  selectedGeographicFeature,
  data
}) {
  // Define Element Rendering Methods.

  const getPredictiveFeaturesChartLayout = (
    mapTypePredictiveFeatures,
    observedFeaturePredictiveFeatures,
    geographyPredictiveFeatures,
    selectedGeographicFeaturePredictiveFeatures
    // plotStatePredictiveFeatures
  ) => {
    return (
      <div className="predictive-features-plot-layout">
        <div className="predictive-features-plot-header">
          <div className="predictive-features-plot-info">
            <div className="predictive-features-plot-placeholder-text">
              The predictiveFeaturesPlot for the selected feature{' '}
              {observedFeaturePredictiveFeatures} in the{' '}
              {geographyPredictiveFeatures} of{' '}
              {selectedGeographicFeaturePredictiveFeatures} goes here.
            </div>
          </div>
          <div className="predictive-features-plot-info">
            <div className="predictive-features-plot-placeholder-text predictive-features-plot-placeholder-emphasis">
              The plot for #predictive-features is in development.
            </div>
          </div>
        </div>
        <div className="predictive-features-plot-chart-body">
          <div className="predictive-features-plot-chart-body-plot">
            {/* <Plot
              data={plotStatePredictiveFeatures.data}
              layout={plotStatePredictiveFeatures.layout}
              config={plotStatePredictiveFeatures.config}
              useResizeHandler
              style={{ width: '100%', height: '100%' }}
            /> */}
          </div>
        </div>
      </div>
    );
  };

  // Generate Elements Using Element Rendering Methods.

  const predictiveFeaturesChartLayout = getPredictiveFeaturesChartLayout(
    mapType,
    observedFeature,
    geography,
    selectedGeographicFeature
    // plotState
  );

  // Render Component.

  if (debugState) {
    // return <div className="configurable-chart">{debugInfo}</div>;
    return (
      <DebugPlot
        className="plot-debug"
        mapType={mapType}
        geography={geography}
        maltreatmentTypes={maltreatmentTypes}
        observedFeature={observedFeature}
        year={year}
        selectedGeographicFeature={selectedGeographicFeature}
        data={data}
      />
    );
  }

  return (
    // <div>PredictiveFeaturesPlot from ConfigurableChart refactor.</div>
    <div className="predictive-features-plot">
      {predictiveFeaturesChartLayout}
    </div>
  );
}

PredictiveFeaturesPlot.propTypes = {
  mapType: PropTypes.string.isRequired,
  geography: PropTypes.string.isRequired,
  maltreatmentTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  observedFeature: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  selectedGeographicFeature: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired
};

export default PredictiveFeaturesPlot;
