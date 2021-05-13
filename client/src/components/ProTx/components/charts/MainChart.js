import React from 'react';
import './MainChart.css';
import ChartHeader from './ChartHeader';
import ScatterBarChart from './ScatterBarChart';

function MainChart() {
  return (
    <div className="main-chart">
      <ChartHeader />
      <ScatterBarChart className="chart-diagram" />
    </div>
  );
}

export default MainChart;
