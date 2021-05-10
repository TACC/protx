import React from 'react';
import ChartHeader from './ChartHeader';
import ChartDiagram from './ChartDiagram';
import AreaGraph from './ChartDiagram2';
import CircleGraph from './ChartDiagram3';
import './MainChart.css';

function MainChart() {
  return (
    <div className="main-chart">
      <ChartHeader className="chart-header" />
      <ChartDiagram className="chart-diagram" />
      <AreaGraph className="chart-diagram" />
      <CircleGraph className="chart-diagram" />
    </div>
  );
}

export default MainChart;
