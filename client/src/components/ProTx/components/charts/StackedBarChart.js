import React from 'react';
import Plot from 'react-plotly.js';
import './StackedBarChart.css';
import { CHART_CONFIG, CHART_LAYOUT, CHART_DATA } from './chartConfig.01';

// import {
//   getMetaData,
//   getMaltreatmentAggregatedValue,
//   getObservedFeatureValue
// } from '../util';

// Replace test data with actual data from selection.
// const ofv = getObservedFeatureValue();
// Order objects in reverse of how you want them to populate the category key.

function StackedBarChart() {
  const state = {
    data: CHART_DATA,
    layout: CHART_LAYOUT,
    config: CHART_CONFIG
  };

  return (
    <div className="stacked-bar-chart">
      <div className="chart-layout">
        <div className="chart-header">
          <div className="chart-info">
            <div className="chart-info-item">
              <div className="chart-info-title">Selected Year</div>
              <div className="chart-info-value">DEMO</div>
            </div>
            <div className="chart-info-item">
              <div className="chart-info-title">Element</div>
              <div className="chart-info-value">Demo County</div>
            </div>
            <div className="chart-info-item">
              <div className="chart-info-title">County</div>
              <div className="chart-info-value">Demo</div>
            </div>
            <div className="chart-info-item">
              <div className="chart-info-title">Victims/1,000 Children</div>
              <div className="chart-info-value">##.##</div>
            </div>
          </div>
        </div>
        <div className="chart-body">
          {/* <div className="chart-body-subtitle">Trend Past 10 Years</div> */}
          <Plot data={state.data} layout={state.layout} config={state.config} />
        </div>
        <div className="chart-footer">
          <div className="chart-links">
            <p className="chart-link-item">
              Show
              <a href="#" target="">
                social tapestry information
              </a>
            </p>
            <p className="chart-link-item">
              Show
              <a href="#" target="">
                best predictors for this area
              </a>
            </p>
            <p className="chart-link-item">
              Show
              <a href="#" target="">
                available resources in this area
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StackedBarChart;
