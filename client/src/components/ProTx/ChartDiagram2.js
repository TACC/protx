import React from "react";
import Plot from "react-plotly.js";

class AreaGraph extends React.Component {
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
        }],
      layout: {
        height: 400,
        width: 400,
        title: "Area chart"
      }
    };
  }
  render() {
    return (
      <div style={{ width: "100%", height: "auto" }}>
        <Plot
          data={this.state.data}
          layout={this.state.layout}
          onInitialized={(figure) => this.setState(figure)}
          onUpdate={(figure) => this.setState(figure)}
        />
      </div>
    );
  }
}

export default AreaGraph;