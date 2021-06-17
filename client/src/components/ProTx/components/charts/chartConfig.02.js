export const CHART_CONFIG = {
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

export const CHART_LAYOUT = {
  width: '100%',
  height: '100%',
  barmode: 'stack',
  title: 'Stacked Bar Chart - Horizontal'
};

export const CHART_DATA = [
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
