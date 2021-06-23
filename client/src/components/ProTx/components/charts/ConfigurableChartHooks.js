import React from 'react';
// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import Plot from 'react-plotly.js';
// import PropTypes from 'prop-types';
import './ConfigurableChart.css';

/**
 * Configuration Files for ConfigurableChart
 *
 * Configuration files live under configs/chartConfig.##.js.
 *
 * Notes:
 * - chart info content is located in: configs/chart.info.js
 * - chart configurations are located in: configs/chart.configs.js
 * - chart layoutsares located in: configs/chart.layouts.js
 * - trace data is located in: configs/trace.data.js.
 *
 * Each configuration provides a specific configuration of:
 * - the charts text content.
 * - the charts configuration.
 * - the charts layout.
 * - mock data for testing the component.
 *
 * Available Configurations
 *
 * Demo & Template:
 * - chart.00.js - basic demo chart from the react-plotly documentation with detailed comments.
 *
 * Bar Charts:
 *
 * - chart.01.js - horizontal single stacked bar chart.
 * - chart.02.js - horizontal multiples stacked bar chart.
 * - chart.03.js - horizontal multiples grouped bar chart.
 * - chart.04.js - vertical single stacked bar chart.
 * - chart.05.js - vertical multiples stacked bar chart.
 * - chart.06.js - vertical multiples grouped bar chart.
 *
 * Histograms:
 *
 * - chart.07.js - vertical histogram chart.
 *
 */

import { default as CONFIGURATION } from './configs/chart.07';

const chartInputs = CONFIGURATION;

// const CHARTSTATE = {
//     data: CONFIGURATION.CHART_DATA,
//     layout: CONFIGURATION.CHART_LAYOUT,
//     config: CONFIGURATION.CHART_CONFIG
//   };

// ChartItem Component (for dev).
// function ChartItem({ chartItem }) {
//   return (
//     <div className="chart-item">
//       <div className="chart-info-title">{chartItem.labelTitle}</div>
//       <div className="chart-info-value">{chartItem.labelValue}</div>
//     </div>
//   );
// }

function ConfigurableChart() {
  const state = {
    data: chartInputs.CHART_DATA,
    layout: chartInputs.CHART_LAYOUT,
    config: chartInputs.CHART_CONFIG
  };

  // const state = CHARTSTATE;

  // const [chartItems] = useState(chartInputs.CHART_DATA);

  return (
    <div className="stacked-bar-chart">
      <div className="chart-layout">
        <div className="chart-header">
          <div className="chart-info">
            {/* Approach 1  */}
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
            {/* Approach 2  */}
            {/*
            <div className="chart-info-item">
              <div className="chart-info-title">
                {state.CHART_INFO.chartLabels[0].labelTitle}
              </div>
              <div className="chart-info-value">
                {state.CHART_INFO.chartLabels[0].labelValue}
              </div>
            </div>
            <div className="chart-info-item">
              <div className="chart-info-title">
                {state.CHART_INFO.chartLabels[1].labelTitle}
              </div>
              <div className="chart-info-value">
                {state.CHART_INFO.chartLabels[1].labelValue}
              </div>
            </div>
            <div className="chart-info-item">
              <div className="chart-info-title">
                {state.CHART_INFO.chartLabels[2].labelTitle}
              </div>
              <div className="chart-info-value">
                {state.CHART_INFO.chartLabels[2].labelValue}
              </div>
            </div>
            <div className="chart-info-item">
              <div className="chart-info-title">
                {state.CHART_INFO.chartLabels[3].labelTitle}
              </div>
              <div className="chart-info-value">
                {state.CHART_INFO.chartLabels[3].labelValue}
              </div>
            </div> */}
            {/* Approach 3  */}
            {/*
            {chartItems.map((chartItem) => (
              <ChartItem key={index} index={index} chartItem={chartItem} />
            ))} */}
          </div>
          <hr />
          <div className="chart-info-subtitle">
            {chartInputs.CHART_INFO.chartSubtitle}
          </div>
        </div>
        <div className="chart-body">
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
