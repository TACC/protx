import React from 'react';
import PropTypes from 'prop-types';
import Plot from 'react-plotly.js';
import {
  getPredictiveFeaturesDataObject,
  plotConfig,
  getPlotDataVertBars,
  getPlotLayout
} from '../util';
import DebugPlot from './DebugPlot';
import './PredictiveFeaturesPlot.css';

/**
 * TODOS FOR ALL PLOT COMPONENTS.
 *
 * TODO: Refactor colorScales assignment out into utils.
 *   - Will be used by other components.
 * TODO: Investigate moving plot configuration generation code into  utils.
 *   - Used across multiple components, refactor into library.
 */

// Passing the debugState property will render component data in debug mode.

function PredictiveFeaturesPlot({
  mapType,
  geography,
  maltreatmentTypes,
  observedFeature,
  year,
  selectedGeographicFeature,
  data,
  debugState
}) {
  const predictiveFeaturesDataObject = getPredictiveFeaturesDataObject();
  const plotLayout = getPlotLayout('Predictive Features');
  const plotData = getPlotDataVertBars(predictiveFeaturesDataObject);

  const plotState = {
    data: plotData,
    layout: plotLayout,
    config: plotConfig
  };

  const getPredictiveFeaturesChartLayout = (
    mapTypePredictiveFeatures,
    predictiveFeaturePredictiveFeatures,
    geographyPredictiveFeatures,
    selectedGeographicFeaturePredictiveFeatures,
    plotStatePredictiveFeatures
  ) => {
    return (
      <div className="predictive-features-plot-layout">
        <div className="predictive-features-plot-header">
          <div className="predictive-features-plot-info">
            <div className="predictive-features-plot-placeholder-text">
              TARGET: predictiveFeaturesPlot for the selected feature{' '}
              {predictiveFeaturePredictiveFeatures} in the{' '}
              {geographyPredictiveFeatures} of{' '}
              {selectedGeographicFeaturePredictiveFeatures}.
            </div>
          </div>
        </div>
        <div className="predictive-features-plot-chart-body">
          <div className="predictive-features-plot-chart-body-plot">
            <Plot
              data={plotStatePredictiveFeatures.data}
              layout={plotStatePredictiveFeatures.layout}
              config={plotStatePredictiveFeatures.config}
              useResizeHandler
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </div>
      </div>
    );
  };

  const predictiveFeaturesChartLayout = getPredictiveFeaturesChartLayout(
    mapType,
    observedFeature,
    geography,
    selectedGeographicFeature,
    plotState
  );

  if (debugState) {
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
  data: PropTypes.object.isRequired,
  debugState: PropTypes.bool.isRequired
};

export default PredictiveFeaturesPlot;
