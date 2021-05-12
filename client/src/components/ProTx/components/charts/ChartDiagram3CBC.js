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
        // width: '100%',
        // height: '100%',
        // autosize: true,
        title: 'Pie Chart Example'
      },
      config: {
        // scrollZoom: true,
        // staticPlot: true,
        // displayModeBar: false,
        displaylogo: false,
        modeBarButtonsToRemove: [
          // 'toImage'
        ],
        modeBarButtonsToAdd: [
          // {
          //   name: 'color toggler',
          //   icon: icon1,
          //   click: function(gd) {
          //     var newColor = colors[Math.floor(3 * Math.random())]
          //     Plotly.restyle(gd, 'line.color', newColor)
          //   }
          // },
          // {
          //   name: 'button1',
          //   icon: Plotly.Icons.pencil,
          //   direction: 'up',
          //   click: function(gd) {alert('button1')
          //   }
          // }
        ],
        // showLink: true,
        showEditInChartStudio: true,
        plotlyServerURL: 'https://chart-studio.plotly.com',
        linkText: 'Edit Chart in Plotly Studio',
        responsive: true,
        doubleClickDelay: 1000,
        useResizeHandler: true
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
