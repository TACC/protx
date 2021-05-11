import React from 'react';
import Plot from 'react-plotly.js';

class ChartDiagram2CBC extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          x: [1, 2, 3, 4],
          y: [0, 2, 3, 5],
          fill: 'tozeroy',
          type: 'scatter',
          name: 'Vendor'
        },
        {
          x: [1, 2, 3, 4],
          y: [3, 5, 1, 7],
          fill: 'tonexty',
          type: 'scatter',
          name: 'Provider'
        }
      ],
      layout: {
        width: '100%',
        height: '100%',
        autosize: true,
        title: 'Area Chart Example'
      },
      config: {
        responsive: true
      }
    };
  }

  render() {
    return (
      <div className="chart-diagram-2cbc">
        <Plot
          data={this.state.data}
          layout={this.state.layout}
          config={this.state.config}
          onInitialized={figure => this.setState(figure)}
          onUpdate={figure => this.setState(figure)}
        />
      </div>
    );
  }
}

export default ChartDiagram2CBC;
