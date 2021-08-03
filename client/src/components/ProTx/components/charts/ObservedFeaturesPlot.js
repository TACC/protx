import React from 'react';
import PropTypes from 'prop-types';
import Plot from 'react-plotly.js';
import {
  plotConfig,
  getPlotDataVertBars,
  getPlotLayout,
  getObservedFeaturesLabel
} from '../util';
import DebugPlot from './DebugPlot';
import './ObservedFeaturesPlot.css';

// Set this to true to inspect the component data in a tabular view.
const debugState = false;

function ObservedFeaturesPlot({
  mapType,
  geography,
  maltreatmentTypes,
  observedFeature,
  year,
  selectedGeographicFeature,
  data
}) {
  const observedFeaturesDataObject = [];
  const plotLayout = getPlotLayout('Observed Features');
  const plotData = getPlotDataVertBars(observedFeaturesDataObject);

  const plotState = {
    data: plotData,
    layout: plotLayout,
    config: plotConfig
  };

  // Define Element Rendering Methods.

  const getObservedFeaturesChartLayout = (
    mapTypeObservedFeatures,
    observedFeatureObservedFeatures,
    geographyObservedFeatures,
    selectedGeographicFeatureObservedFeatures,
    plotStateObservedFeatures
  ) => {
    const observedFeaturesLabel = getObservedFeaturesLabel(
      observedFeatureObservedFeatures
    );

    return (
      <div className="observed-features-plot-layout">
        <div className="observed-features-plot-header">
          <div className="observed-features-plot-info">
            <div className="observed-features-plot-placeholder-text">
              This map is displaying{' '}
              <span className="observed-feature-selection-label">
                {observedFeaturesLabel}
              </span>{' '}
              by{' '}
              <span className="observed-feature-selection-label">
                {geographyObservedFeatures}
              </span>
              .
              <br />
              The selected {geographyObservedFeatures} is{' '}
              <span className="observed-feature-selection-label">
                {selectedGeographicFeatureObservedFeatures}
              </span>
              .
            </div>
          </div>
        </div>
        <div className="observed-features-plot-chart-body">
          <div className="observed-features-plot-chart-body-plot">
            <Plot
              data={plotStateObservedFeatures.data}
              layout={plotStateObservedFeatures.layout}
              config={plotStateObservedFeatures.config}
              useResizeHandler
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </div>
      </div>
    );
  };

  const observedFeaturesChartLayout = getObservedFeaturesChartLayout(
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
    <div className="observed-features-plot">{observedFeaturesChartLayout}</div>
  );
}

ObservedFeaturesPlot.propTypes = {
  mapType: PropTypes.string.isRequired,
  geography: PropTypes.string.isRequired,
  maltreatmentTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  observedFeature: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  selectedGeographicFeature: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired
};

export default ObservedFeaturesPlot;
