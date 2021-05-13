import React from 'react';
import Plot from 'react-plotly.js';
import './ScatterBarChart.css';

function ScatterBarChart() {
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
    <div className="scatter-bar-chart">
      <div className="chart-header">
        <div className="chart-info">
          <h2>
            <b>Chart Information</b>
          </h2>
          <p>Information relevant to the data selection.</p>
        </div>
        <hr />
      </div>
      <Plot data={state.data} layout={state.layout} config={state.config} />
    </div>
  );
}

export default ScatterBarChart;
