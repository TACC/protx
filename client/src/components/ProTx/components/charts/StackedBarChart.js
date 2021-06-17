import React from 'react';
import Plot from 'react-plotly.js';
import './StackedBarChart.css';
// import {
//   // getMetaData,
//   // getMaltreatmentAggregatedValue,
//   getObservedFeatureValue
// } from '../util';

function StackedBarChart() {
  // const ofv = getObservedFeatureValue();

  const state = {
    data: [
      // {
      //   x: [1, 2, 3, 4, 5, 6, 7],
      //   y: [1, 6, 3, 11, 4, 9, 13],
      //   type: 'scatter',
      //   mode: 'lines+markers',
      //   marker: { color: 'red' }
      // },
      // { type: 'bar', x: [1, 2, 3, 4, 5, 6, 7], y: [2, 6, 3, 7, 4, 9, 15] }
      {
        x: [20, 14, 23, 76, 129],
        y: ['giraffes', 'orangutans', 'monkeys'],
        name: 'SF Zoo',
        type: 'bar',
        orientation: 'h'
      },
      {
        x: [12, 18, 29, 64, 173],
        y: ['giraffes', 'orangutans', 'monkeys'],
        name: 'LA Zoo',
        type: 'bar',
        orientation: 'h'
      }
    ],
    layout: {
      width: '100%',
      height: '100%',
      barmode: 'stack',
      title: 'Stacked Bar Chart - Horizontal'
    },
    config: {
      displaylogo: false,
      // showEditInChartStudio: true,
      // plotlyServerURL: 'https://chart-studio.plotly.com',
      // linkText: 'Edit Chart in Plotly Studio',
      responsive: true,
      doubleClickDelay: 1000,
      useResizeHandler: true
    }
  };

  // console.log(ofv);

  return (
    <div className="stacked-bar-chart">
      <div className="chart-layout">
        <div className="chart-header">
          <div className="chart-info">
            <div className="chart-info-item">
              <div className="chart-info-title">Selected Year</div>
              <div className="chart-info-value">2021</div>
            </div>
            <div className="chart-info-item">
              <div className="chart-info-title">Element</div>
              <div className="chart-info-value">Dallas County</div>
            </div>
            <div className="chart-info-item">
              <div className="chart-info-title">County</div>
              <div className="chart-info-value">Dallas</div>
            </div>
            <div className="chart-info-item">
              <div className="chart-info-title">Victims/1,000 Children</div>
              <div className="chart-info-value">41.94</div>
            </div>
          </div>
        </div>
        <div className="chart-body">
          <div className="chart-body-subtitle">Trend Past 5 Years</div>
          <Plot data={state.data} layout={state.layout} config={state.config} />
        </div>
        <div className="chart-footer">
          <div className="chart-links">
            <p>
              <a href="#" target="">
                Link
              </a>{' '}
              to supporting chart data.
            </p>
            <p>
              <a href="#" target="">
                Link
              </a>{' '}
              to supporting chart data.
            </p>
            <p>
              <a href="#" target="">
                Link
              </a>{' '}
              to supporting chart data.
            </p>
            <p>
              <a href="#" target="">
                Link
              </a>{' '}
              to supporting chart data.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StackedBarChart;
