import React from 'react';
import './MainChart.module.scss';
import ScatterBarChart from './ScatterBarChart';

function MainChart() {
  return (
    <div className="main-chart">
      <ScatterBarChart className="chart-diagram" />
    </div>
  );
}

export default MainChart;
