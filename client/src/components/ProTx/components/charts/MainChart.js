import React from 'react';
import './MainChart.css';
// import ScatterBarChart from './ScatterBarChart';
// import StackedBarChart from './StackedBarChart';
import ConfigurableChart from './ConfigurableChart';

function MainChart() {
  return (
    <div className="main-chart">
      {/* <StackedBarChart className="chart-diagram" /> */}
      <ConfigurableChart className="chart-diagram" />
    </div>
  );
}

export default MainChart;
