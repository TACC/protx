import React from 'react';
import './MainChart.css';
import ChartHeader from './ChartHeader';
import ChartDiagram1CBC from './ChartDiagram1CBC';
import ChartDiagram2CBC from './ChartDiagram2CBC';
// import ChartDiagram3CBC from './ChartDiagram3CBC';
// import ChartDiagram1FC from './ChartDiagram1FC';
// import ChartDiagram2FC from './ChartDiagram2FC';
// import ChartDiagram3FC from './ChartDiagram3FC';
// import ChartDiagram4CBC from './ChartDiagram4CBC';
// import ChartDiagramFC from './ChartDiagramFC';


function MainChart() {
  return (
    <div className="main-chart">
      <ChartHeader />
      <ChartDiagram1CBC className="chart-diagram" />
      <ChartDiagram2CBC className="chart-diagram" />
      {/* <ChartDiagram3CBC className="chart-diagram" />s */}
      {/* <ChartDiagram4CBC className="chart-diagram" /> */}
      {/* <ChartDiagram1FC className="chart-diagram" /> */}
      {/* <ChartDiagram2FC className="chart-diagram" /> */}
      {/* <ChartDiagram3FC className="chart-diagram" /> */}      
      {/* <ChartDiagramFC /> */}
    </div>
  );
}

export default MainChart;
