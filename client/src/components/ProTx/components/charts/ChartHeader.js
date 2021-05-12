import React from 'react';
import './ChartHeader.css';

function ChartHeader() {
  return (
    <div className="chart-header">
      <div className="chart-info">
        <h2>
          <b>Chart Information</b>
        </h2>
        <p>Geospatial data analytics dashboard using incomplete demonstration data.</p>
      </div>
      <hr />
      {/* <div className="dev-status">
        <h2>
          <b>Application Information</b>
        </h2>
        <p>
          Application: <b>Python 3 running Django + ReactJS</b>
        </p>
        <p>
          Charting: <b>Plotly</b> <i>(react-plotlyjs & plotly.js)</i>
        </p>
        <p>
          Mapping: <b>Leaflet</b>
        </p>
      </div> */}
    </div>
  );
}

export default ChartHeader;
