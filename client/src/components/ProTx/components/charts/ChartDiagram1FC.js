import React from 'react';
import Plot from 'react-plotly.js';
import './ChartDiagrams.css';

function ChartDiagram1FC() {
  return (
    <div className="chart-diagram-1fc">
      <Plot
        data={[
          {
            x: [1, 2, 3, 4, 5, 6, 7],
            y: [1, 6, 3, 11, 4, 9, 13],
            type: 'scatter',
            mode: 'lines+markers',
            marker: { color: 'red' }
          },
          { type: 'bar', x: [1, 2, 3, 4, 5, 6, 7], y: [2, 6, 3, 7, 4, 9, 15] }
        ]}
        layout={{
          // width: '100%',
          // height: '100%',
          // autosize: true,
          title: 'Test Plot'
        }}
        config={{ responsive: true }}
      />
    </div>
  );
}

export default ChartDiagram1FC;
