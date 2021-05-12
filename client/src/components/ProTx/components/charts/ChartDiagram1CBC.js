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
        // width: '100%',
        // height: '100%',
        autosize: true,
        title: 'Scatterplot w/Bar Chart Example'
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
      <div className="chart-diagram-1cbc">
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

export default ChartDiagram1CBC;
