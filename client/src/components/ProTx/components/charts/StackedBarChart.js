import React from 'react';
import Plot from 'react-plotly.js';
import './StackedBarChart.css';
// import {
//   getMetaData,
//   getMaltreatmentAggregatedValue,
//   getObservedFeatureValue
// } from '../util';

function StackedBarChart() {
  // const ofv = getObservedFeatureValue();

  const chartConfig = {
    doubleClickDelay: 1000,
    responsive: true,
    useResizeHandler: true,
    displayModeBar: false,
    modeBarButtonsToRemove: [
      /* An array of interface buttons to remove, e.g. 'toImage'.
      Docs: https://plotly.com/javascript/configuration-options/#remove-modebar-buttons
      */
    ],
    displaylogo: false,
    showEditInChartStudio: false
    // enable these values of you set showEditInChartStudio to true.
    // plotlyServerURL: 'https://chart-studio.plotly.com',
    // linkText: 'Edit Chart in Plotly Studio'
  };

  const chartLayout = {
    width: '100%',
    height: '100%',
    barmode: 'stack',
    title: 'Stacked Bar Chart - Horizontal'
  };

  const chartData = [
    // Order objects in reverse of how you want them to populate the category key.
    {
      x: [50, 100, 75, 25, 100, 30, 70, 60, 20, 90],
      y: [
        '2010',
        '2011',
        '2012',
        '2013',
        '2014',
        '2015',
        '2016',
        '2017',
        '2018',
        '2019'
      ],
      name: 'Maltreatment Type D',
      type: 'bar',
      orientation: 'h'
    },
    {
      x: [10, 90, 25, 45, 50, 60, 30, 20, 40, 80],
      y: [
        '2010',
        '2011',
        '2012',
        '2013',
        '2014',
        '2015',
        '2016',
        '2017',
        '2018',
        '2019'
      ],
      name: 'Maltreatment Type C',
      type: 'bar',
      orientation: 'h'
    },
    {
      x: [70, 10, 45, 50, 10, 20, 45, 15, 80, 20],
      y: [
        '2010',
        '2011',
        '2012',
        '2013',
        '2014',
        '2015',
        '2016',
        '2017',
        '2018',
        '2019'
      ],
      name: 'Maltreatment Type B',
      type: 'bar',
      orientation: 'h'
    },
    {
      x: [5, 10, 7, 2, 10, 3, 7, 6, 2, 9],
      y: [
        '2010',
        '2011',
        '2012',
        '2013',
        '2014',
        '2015',
        '2016',
        '2017',
        '2018',
        '2019'
      ],
      name: 'Maltreatment Type A',
      type: 'bar',
      orientation: 'h'
    }
  ];

  const state = {
    data: chartData,
    layout: chartLayout,
    config: chartConfig
  };

  // console.log(ofv);
  // console.log(ofv);
  // console.log(ofv);
  // console.log(ofv);
  // console.log(ofv);
  // console.log(ofv);

  return (
    <div className="stacked-bar-chart">
      <div className="chart-layout">
        <div className="chart-header">
          <div className="chart-info">
            <div className="chart-info-item">
              <div className="chart-info-title">Selected Year</div>
              <div className="chart-info-value">DEMO</div>
            </div>
            <div className="chart-info-item">
              <div className="chart-info-title">Element</div>
              <div className="chart-info-value">Demo County</div>
            </div>
            <div className="chart-info-item">
              <div className="chart-info-title">County</div>
              <div className="chart-info-value">Demo</div>
            </div>
            <div className="chart-info-item">
              <div className="chart-info-title">Victims/1,000 Children</div>
              <div className="chart-info-value">##.##</div>
            </div>
          </div>
        </div>
        <div className="chart-body">
          {/* <div className="chart-body-subtitle">Trend Past 10 Years</div> */}
          <Plot data={state.data} layout={state.layout} config={state.config} />
        </div>
        <div className="chart-footer">
          <div className="chart-links">
            <p className="chart-link-item">
              Show
              <a href="#" target="">
                social tapestry information
              </a>
            </p>
            <p className="chart-link-item">
              Show
              <a href="#" target="">
                best predictors for this area
              </a>
            </p>
            <p className="chart-link-item">
              Show
              <a href="#" target="">
                available resources in this area
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StackedBarChart;
