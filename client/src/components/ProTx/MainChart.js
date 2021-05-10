import React from 'react';
import ChartHeader from './ChartHeader';
import ChartDiagram from './ChartDiagram';
import './MainChart.css';

function MainChart() {
  return (
    <div className="main-chart">
      <ChartHeader className="chart-header" />
      <ChartDiagram className="chart-diagram" />
    </div>
  );
}

export default MainChart;
