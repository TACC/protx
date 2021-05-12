import React from 'react';
import './MainChart.css';
import ChartHeader from './ChartHeader';
import ChartDiagram1CBC from './ChartDiagram1CBC';

function MainChart() {
  return (
    <div className="main-chart">
      <ChartHeader />
      <ChartDiagram1CBC className="chart-diagram" />
    </div>
  );
}

export default MainChart;
