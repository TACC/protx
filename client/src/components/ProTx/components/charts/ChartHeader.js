import React from 'react';
import './ChartHeader.css';

function ChartHeader() {
  return (
    <div className="chart-header">
      <h2>
        <b>Chart Information</b>
      </h2>
      <p>
        Information relevant to the data selection populating the chart and map.
      </p>
      {/* <p>The Plotly chart implementation is being developed to meet the following criteria:</p>
      <ul>
        <li>Adaptive Layout Responsiveness</li>
        <li>Using React Functional Components Over Class-based Components</li>
        <li>Multiple Chart Types:
          <ul>
            <li>Scatter-Bar</li>
            <li>Area</li>
            <li>Circle</li>
            <li>TBD</li>
          </ul>
        </li>
      </ul> */}
      <p>
        Application: <b>Python 3 running Django + ReactJS</b>
      </p>
      <p>
        Charting: <b>Plotly</b> <i>(react-plotlyjs & plotly.js)</i>
      </p>
      <p>
        Mapping: <b>Leaflet</b>
      </p>
      <hr />
    </div>
  );
}

export default ChartHeader;
