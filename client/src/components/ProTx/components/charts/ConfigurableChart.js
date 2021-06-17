import React from 'react';
import Plot from 'react-plotly.js';
// import PropTypes from 'prop-types';
import './ConfigurableChart.css';
import { CONFIGURATION_00 } from './chartConfig.00';
import { CONFIGURATION_01 } from './chartConfig.01';
import { CONFIGURATION_02 } from './chartConfig.02';

// const chartInputs = CONFIGURATION_00;
const chartInputs = CONFIGURATION_01;
// const chartInputs = CONFIGURATION_02;

// import {
//   getMetaData,
//   getMaltreatmentAggregatedValue,
//   getObservedFeatureValue
// } from '../util';

// Replace test data with actual data from selection.
// const ofv = getObservedFeatureValue();
// Order objects in reverse of how you want them to populate the category key.

function ConfigurableChart() {
  const state = {
    data: chartInputs.CHART_DATA,
    layout: chartInputs.CHART_LAYOUT,
    config: chartInputs.CHART_CONFIG
  };

  return (
    <div className="stacked-bar-chart">
      <div className="chart-layout">
        <div className="chart-header">
          <div className="chart-info">
            <div className="chart-info-item">
              <div className="chart-info-title">
                {chartInputs.CHART_INFO.chartLabels[0].labelTitle}
              </div>
              <div className="chart-info-value">
                {chartInputs.CHART_INFO.chartLabels[0].labelValue}
              </div>
            </div>
            <div className="chart-info-item">
              <div className="chart-info-title">
                {chartInputs.CHART_INFO.chartLabels[1].labelTitle}
              </div>
              <div className="chart-info-value">
                {chartInputs.CHART_INFO.chartLabels[1].labelValue}
              </div>
            </div>
            <div className="chart-info-item">
              <div className="chart-info-title">
                {chartInputs.CHART_INFO.chartLabels[2].labelTitle}
              </div>
              <div className="chart-info-value">
                {chartInputs.CHART_INFO.chartLabels[2].labelValue}
              </div>
            </div>
            <div className="chart-info-item">
              <div className="chart-info-title">
                {chartInputs.CHART_INFO.chartLabels[3].labelTitle}
              </div>
              <div className="chart-info-value">
                {chartInputs.CHART_INFO.chartLabels[3].labelValue}
              </div>
            </div>
          </div>
        </div>
        <div className="chart-body">
          <div className="chart-body-subtitle">
            {chartInputs.CHART_INFO.chartSubtitle}
          </div>
          <div className="chart-body-plot">
            <Plot
              data={state.data}
              layout={state.layout}
              config={state.config}
            />
          </div>
        </div>
        <div className="chart-footer">
          <div className="chart-links">
            <p className="chart-link-item">
              Show
              <a href={chartInputs.CHART_INFO.chartLinks[0].linkRef} target="">
                {chartInputs.CHART_INFO.chartLinks[0].linkLabel}
              </a>
            </p>
            <p className="chart-link-item">
              Show
              <a href={chartInputs.CHART_INFO.chartLinks[1].linkRef} target="">
                {chartInputs.CHART_INFO.chartLinks[1].linkLabel}
              </a>
            </p>
            <p className="chart-link-item">
              Show
              <a href={chartInputs.CHART_INFO.chartLinks[2].linkRef} target="">
                {chartInputs.CHART_INFO.chartLinks[2].linkLabel}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfigurableChart;
