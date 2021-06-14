import React from 'react';
import './MainChart.css';
// import ScatterBarChart from './ScatterBarChart';
import StackedBarChart from './StackedBarChart';

function MainChart() {
  return (
    <div className="main-chart">
      <StackedBarChart className="chart-diagram" />
    </div>
  );
}

export default MainChart;
