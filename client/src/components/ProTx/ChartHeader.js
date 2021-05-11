import React from 'react';
import './ChartHeader.css';

function ChartHeader() {
  return (
    <div className="chart-header">
      <h2>
        <b>Chart Information</b>
      </h2>
      <p>Details about the chart being displayed.</p>
      <hr />
      <h2>
        <b>React-Plotly Chart Rendering</b>
      </h2>
    </div>
  );
}

export default ChartHeader;
