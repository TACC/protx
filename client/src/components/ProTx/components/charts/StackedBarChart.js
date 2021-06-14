import React from 'react';
import Plot from 'react-plotly.js';
import './StackedBarChart.css';

function StackedBarChart() {
  const state = {
    data: [
      {
        x: [1, 2, 3, 4, 5, 6, 7],
        y: [1, 6, 3, 11, 4, 9, 13],
        type: 'scatter',
        mode: 'lines+markers',
        marker: { color: 'red' }
      },
      { type: 'bar', x: [1, 2, 3, 4, 5, 6, 7], y: [2, 6, 3, 7, 4, 9, 15] }
    ],
    layout: {
      width: '100%',
      height: '100%',
      title: 'Scatterplot w/Bar Chart Example'
    },
    config: {
      displaylogo: false,
      showEditInChartStudio: true,
      plotlyServerURL: 'https://chart-studio.plotly.com',
      linkText: 'Edit Chart in Plotly Studio',
      responsive: true,
      doubleClickDelay: 1000,
      useResizeHandler: true
    }
  };

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
            <p><a href="#" target="">Link</a> to supporting chart data.</p>
            <p><a href="#" target="">Link</a> to supporting chart data.</p>
            <p><a href="#" target="">Link</a> to supporting chart data.</p>
            <p><a href="#" target="">Link</a> to supporting chart data.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StackedBarChart;



/*
// Plotly Stacked Bar.

var trace1 = {
  x: ['giraffes', 'orangutans', 'monkeys'],
  y: [20, 14, 23],
  name: 'SF Zoo',
  type: 'bar'
};

var trace2 = {
  x: ['giraffes', 'orangutans', 'monkeys'],
  y: [12, 18, 29],
  name: 'LA Zoo',
  type: 'bar'
};

var data = [trace1, trace2];

var layout = { barmode: 'stack' };

Plotly.newPlot('myDiv', data, layout);
*/