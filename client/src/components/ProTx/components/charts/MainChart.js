import React from 'react';
import './MainChart.css';
import ConfigurableChart from './ConfigurableChart';

function MainChart() {
  return (
    <div className="main-chart">
      <ConfigurableChart className="chart-diagram" />
    </div>
  );
}

export default MainChart;
