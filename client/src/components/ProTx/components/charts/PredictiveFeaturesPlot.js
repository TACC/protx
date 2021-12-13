import React from 'react';
import PropTypes from 'prop-types';
import Plot from 'react-plotly.js';
import { getPredictiveFeaturesDataObject } from '../shared/dataUtils';
import {
  plotConfig,
  getPlotLayout,
  getPlotDataBars
} from '../shared/plotUtils';
import './PredictiveFeaturesPlot.css';

function PredictiveFeaturesPlot({
  mapType,
  geography,
  observedFeature,
  year,
  selectedGeographicFeature,
  data
}) {
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

  const predictiveFeaturesChartLayout = getPredictiveFeaturesChartLayout(
    observedFeature,
    geography,
    selectedGeographicFeature,
    predictiveFeaturesPlotData.predictiveFeaturesPlotState
  );

  return (
    <div className="predictive-features-plot">
      {predictiveFeaturesChartLayout}
    </div>
  );
}

PredictiveFeaturesPlot.propTypes = {
  mapType: PropTypes.string.isRequired,
  geography: PropTypes.string.isRequired,
  observedFeature: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  selectedGeographicFeature: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired
};

export default PredictiveFeaturesPlot;
