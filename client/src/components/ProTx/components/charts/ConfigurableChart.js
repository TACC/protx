import React from 'react';
// import PropTypes from 'prop-types';
import Plot from 'react-plotly.js';
import './ConfigurableChart.css';
import { default as CONFIGURATION } from './configs/chart.07';

const chartInputs = CONFIGURATION;

function ConfigurableChart() {
  const state = {
    data: chartInputs.CHART_DATA,
    layout: chartInputs.CHART_LAYOUT,
    config: chartInputs.CHART_CONFIG
  };

  return (
    <div className="configurable-chart">
      <div className="chart-layout">
        <div className="chart-header">
          <div className="chart-info">
            {/* Need to iterate over these values instead */}
            <div className="chart-info-item">
              <div className="chart-info-title">
                {chartInputs.CHART_INFO.chartLabels[0].labelTitle}
              </div>
              <div className="chart-info-value">
                {chartInputs.CHART_INFO.chartLabels[0].labelValue}
              </div>
            </div>
            {/* <div className="chart-info-item">
              <div className="chart-info-title">
                {chartInputs.CHART_INFO.chartLabels[1].labelTitle}
              </div>
              <div className="chart-info-value">
                {chartInputs.CHART_INFO.chartLabels[1].labelValue}
              </div>
            </div> */}
            {/* <div className="chart-info-item">
              <div className="chart-info-title">
                {chartInputs.CHART_INFO.chartLabels[2].labelTitle}
              </div>
              <div className="chart-info-value">
                {chartInputs.CHART_INFO.chartLabels[2].labelValue}
              </div>
            </div> */}
            {/* <div className="chart-info-item">
              <div className="chart-info-title">
                {chartInputs.CHART_INFO.chartLabels[3].labelTitle}
              </div>
              <div className="chart-info-value">
                {chartInputs.CHART_INFO.chartLabels[3].labelValue}
              </div>
            </div> */}
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
              useResizeHandler
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </div>
        <div className="chart-footer">
          <div className="chart-links">
            {/* Need to iterate over these values instead */}
            <p className="chart-link-item">
              Show
              <a href={chartInputs.CHART_INFO.chartLinks[0].linkRef} target="">
                {chartInputs.CHART_INFO.chartLinks[0].linkLabel}
              </a>
            </p>
            {/* <p className="chart-link-item">
              Show
              <a href={chartInputs.CHART_INFO.chartLinks[1].linkRef} target="">
                {chartInputs.CHART_INFO.chartLinks[1].linkLabel}
              </a>
            </p> */}
            {/* <p className="chart-link-item">
              Show
              <a href={chartInputs.CHART_INFO.chartLinks[2].linkRef} target="">
                {chartInputs.CHART_INFO.chartLinks[2].linkLabel}
              </a>
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
}

ConfigurableChart.propTypes = {
  // mapType: PropTypes.string.isRequired,
  // geography: PropTypes.string.isRequired,
  // maltreatmentTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  // observedFeature: PropTypes.string.isRequired,
  // year: PropTypes.string.isRequired,
  // selectedGeographicFeature: PropTypes.string.isRequired,
  // // eslint-disable-next-line react/forbid-prop-types
  // data: PropTypes.object.isRequired
};

export default ConfigurableChart;
