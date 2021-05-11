import React from 'react';
import Plot from 'react-plotly.js';

class ChartDiagram3CBC extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          values: [19, 26, 55],
          labels: ['Residential', 'Non-Residential', 'Utility'],
          type: 'pie'
        }
      ],
      layout: {
        width: '100%',
        height: '100%',
        autosize: true,
        title: 'Pie Chart Example'
      },
      config: {
        responsive: true
      }
    };
  }

  render() {
    return (
      <div className="chart-diagram-3cbc">
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

export default ChartDiagram3CBC;
