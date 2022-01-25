import React from 'react';
import PropTypes from 'prop-types';
import Plot from 'react-plotly.js';
import {
  getPredictiveFeaturesDataObject,
  getFipsIdName,
  capitalizeString,
  getObservedFeaturesLabel
  // getMaltreatmentLabel,
} from '../shared/dataUtils';

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

  const geographyType = capitalizeString(geography);
  const selectedGeographicFeatureName = getFipsIdName(
    selectedGeographicFeature
  );
  const observedFeaturesLabel = getObservedFeaturesLabel(observedFeature, data);

  const predictiveFeaturesPlotData = prepPredictiveFeaturesPlotData();

  return (
    <div className="predictive-features-plot">
      <div className="predictive-features-plot-layout">
        <div className="predictive-features-plot-info">
          <div className="predictive-features-plot-selected-region">
            <span className="predictive-features-plot-selected-region-label">
              FIPS: {selectedGeographicFeature}
            </span>
            <span className="predictive-features-plot-selected-region-value">
              {selectedGeographicFeatureName} {geographyType}
            </span>
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
        <div className="predictive-features-plot-chart">
          <Plot
            divId="predictive-features-plot"
            className="predictive-features-plot"
            data={predictiveFeaturesPlotData.predictiveFeaturesPlotState.data}
            layout={
              predictiveFeaturesPlotData.predictiveFeaturesPlotState.layout
            }
            config={
              predictiveFeaturesPlotData.predictiveFeaturesPlotState.config
            }
            useResizeHandler
          />
        </div>
      </div>
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

PredictiveFeaturesPlot.defaultProps = {};

export default PredictiveFeaturesPlot;
