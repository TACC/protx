import React from 'react';
import Plotly from 'plotly.js';
import createPlotlyComponent from 'react-plotly.js/factory';

const PlotlyComponent = createPlotlyComponent(Plotly);

class ChartDiagram4CBC extends React.Component {
  render() {
    return (
      <PlotlyComponent
        data={[
          {
            x: [1, 2, 3, 4, 5, 6, 10, 30, 20],
            y: [2, 6, 3, 2, 3, 10, 111, 111, 211],
            type: 'scatter',
            mode: 'lines+markers',
            marker: { color: 'red' }
          },
          {
            x: [1, 2, 3, 4, 5, 6, 10, 30, 20],
            y: [10, 30, 30, 20, 30, -10, 211, 21, 11],
            type: 'scatter',
            mode: 'markers',
            marker: { color: 'blue' }
          },
          { x: [1, 2, 3], y: [20, 50, 30], type: 'bar' },
          { x: [10, 11, 15], y: [40, 60, 200], type: 'bar' }
        ]}
        layout={{ width: '100%', height: 500, title: 'ComposedChart' }}
        config={{ displaylogo: false }}
      />
    );
  }
}

export default ChartDiagram4CBC;
