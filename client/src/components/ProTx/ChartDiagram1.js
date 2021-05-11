import React from 'react';
import Plot from 'react-plotly.js';

class BarScatterGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
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
        layout={{ width: 400, height: 300, title: 'Graph Example' }}
      />
    );
  }
}

export default BarScatterGraph;
