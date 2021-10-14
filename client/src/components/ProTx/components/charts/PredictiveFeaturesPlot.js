import React from 'react';
import PropTypes from 'prop-types';
import Plot from 'react-plotly.js';
import {
  getFipsIdName,
  getPredictiveFeaturesDataObject
} from '../shared/dataUtils';
import {
  plotConfig,
  getPlotLayout,
  getPlotDataBars
} from '../shared/plotUtils';
import DebugPlot from './DebugPlot';
import './PredictiveFeaturesPlot.css';

function PredictiveFeaturesPlot({
  geography,
  observedFeature,
  year,
  selectedGeographicFeature,
  data,
  debug
}) {
  const PLOT_TYPE = 'predictiveFeatures';

  const getPredictiveFeaturesChartLayout = (
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
              divId="predictive-features-plot"
              className="predictive-features-plot"
              data={plotStatePredictiveFeatures.data}
              layout={plotStatePredictiveFeatures.layout}
              config={plotStatePredictiveFeatures.config}
              useResizeHandler
            />
          </div>
        </div>
      </div>
    );
  };

  const prepPredictiveFeaturesPlotData = () => {
    const newPredictiveFeaturesDataObject = getPredictiveFeaturesDataObject();

    // Transform the response from the query into the required object structure for the plot.
    const predictiveFeaturesDataObject = [];

    const axisCategories = [
      'category',
      'linear',
      'log',
      'date',
      'multicategory',
      '-'
    ];

    const plotTitle = 'Predictive Features';
    const plotOrientation = 'v';
    const showPlotLegend = true;
    const plotXDataLabel = 'X DATA LABEL';
    const plotXDataAxisType = axisCategories[1];
    const plotYDataLabel = 'Y DATA LABEL';
    const plotYDataAxisType = axisCategories[1];

    const plotLayout = getPlotLayout(
      plotTitle,
      plotOrientation,
      showPlotLegend,
      plotXDataLabel,
      plotXDataAxisType,
      plotYDataLabel,
      plotYDataAxisType
    );

    const plotData = getPlotDataBars(
      'predictive',
      predictiveFeaturesDataObject,
      plotOrientation
    );

    const plotState = {
      data: plotData,
      layout: plotLayout,
      config: plotConfig,
      raw: newPredictiveFeaturesDataObject
    };

    const predictiveFeaturesPlotData = {
      predictiveFeaturesPlotState: plotState
    };

    return predictiveFeaturesPlotData;
  };

  const predictiveFeaturesPlotData = prepPredictiveFeaturesPlotData();
  const fipsIdValue = getFipsIdName(selectedGeographicFeature);
  const geoId = `${selectedGeographicFeature}:${fipsIdValue}`;

  const predictiveFeaturesChartLayout = getPredictiveFeaturesChartLayout(
    observedFeature,
    geography,
    selectedGeographicFeature,
    predictiveFeaturesPlotData.predictiveFeaturesPlotState
  );

  if (debug) {
    return (
      <DebugPlot
        className="plot-debug"
        mapType="predictiveFeatures"
        geography={geography}
        observedFeature={observedFeature}
        year={year}
        selectedGeographicFeature={selectedGeographicFeature}
        fipsIdValue={fipsIdValue}
        geoId={geoId}
        plotType={PLOT_TYPE}
        plotData={predictiveFeaturesPlotData}
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
  geography: PropTypes.string.isRequired,
  observedFeature: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  selectedGeographicFeature: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired,
  /** Render component data in debug mode. */
  debug: PropTypes.bool
};

PredictiveFeaturesPlot.defaultProps = {
  debug: false
};

export default PredictiveFeaturesPlot;
