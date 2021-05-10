import React from 'react';
import Plot from 'react-plotly.js';
import './ChartDiagram.css';

function ChartDiagram() {
  return (
    <div className="chart-diagram">
      <h2>
        <b>React-Plotly Chart Rendering</b>
      </h2>
      <Plot
        data={[
          {
            x: [1, 2, 3, 4, 5, 6],
            y: [2, 6, 3, 7, 4, 9],
            type: 'scatter',
            mode: 'lines+markers',
            marker: { color: 'red' }
          },
          { type: 'bar', x: [1, 2, 3, 4, 5, 6], y: [2, 6, 3, 7, 4, 9] }
        ]}
        layout={{ width: '200', height: '200', title: 'Test Plot' }}
      />
    </div>
  );
}

export default ChartDiagram;
