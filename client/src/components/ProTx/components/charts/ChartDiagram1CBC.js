import React from 'react';
import Plot from 'react-plotly.js';

class ChartDiagram1CBC extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          x: [1, 2, 3, 4, 5, 6, 7],
          y: [1, 6, 3, 11, 4, 9, 13],
          type: 'scatter',
          mode: 'lines+markers',
          marker: { color: 'red' }
        },
        { type: 'bar', x: [1, 2, 3, 4, 5, 6, 7], y: [2, 6, 3, 7, 4, 9, 15] }
      ],
      layout: {
        width: '100%',
        height: '100%',
        autosize: true,
        title: 'Scatterplot w/Bar Chart Example'
      },
      config: {
        responsive: true
      }
    };
  }

  render() {
    return (
      <div className="chart-diagram-1cbc">
        <Plot
          data={this.state.data}
          layout={this.state.layout}
          config={this.state.config}
        />
      </div>
    );
  }
}

export default ChartDiagram1CBC;
