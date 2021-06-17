export const CONFIGURATION_02 = {
  CHART_INFO: {
    chartLabels: [
      {
        labelTitle: 'Selected Year',
        labelValue: 'DEMO'
      },
      {
        labelTitle: 'Element',
        labelValue: 'Demo'
      },
      {
        labelTitle: 'County',
        labelValue: 'Demo'
      },
      {
        labelTitle: 'Victims/1,000 Children',
        labelValue: '00.00'
      }
    ],
    chartSubtitle: 'Trend Over Last 10 Years',
    chartLinks: [
      {
        linkType: 'SocialTapestryInformation',
        linkRef: '#',
        linkLabel: 'social tapestry information'
      },
      {
        linkType: 'BestPredictorsForArea',
        linkRef: '#',
        linkLabel: 'best predictors for this area'
      },
      {
        linkType: 'AvailableResourcesForArea',
        linkRef: '#',
        linkLabel: 'available resources in this area'
      }
    ]
  },
  CHART_CONFIG: {
    doubleClickDelay: 1000,
    responsive: true,
    useResizeHandler: true,
    displayModeBar: false,
    modeBarButtonsToRemove: [],
    displaylogo: false,
    showEditInChartStudio: false,
    plotlyServerURL: 'https://chart-studio.plotly.com',
    linkText: 'Edit Chart in Plotly Studio'
  },
  CHART_LAYOUT: {
    title: ' DEMO Multi-Year Horizontal Stacked Bar Chart',
    width: '100%',
    height: '100%',
    barmode: 'stack',
    margin: { t: 0, r: 0, b: 0, l: 20, pad: 10 },
    xaxis: {
      automargin: true,
      tickangle: 0,
      title: {
        text: 'Total',
        standoff: 30
      }
    },
    yaxis: {
      automargin: true,
      tickangle: 0,
      title: {
        text: 'Years',
        standoff: 30
      }
    },
    annotations: []
  },
  CHART_DATA: [
    {
      x: [50, 100, 75, 25, 100, 30, 70, 60, 20, 90],
      y: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019],
      name: 'Maltreatment Type D',
      type: 'bar',
      orientation: 'h',
      marker: {
        line: {
          color: ['#111111'],
          width: 1
        },
        color: [
          '#03071E',
          '#03071E',
          '#03071E',
          '#03071E',
          '#03071E',
          '#03071E',
          '#03071E',
          '#03071E',
          '#03071E',
          '#03071E'
        ]
      }
    },
    {
      x: [10, 90, 25, 45, 50, 60, 30, 20, 40, 80],
      y: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019],
      name: 'Maltreatment Type C',
      type: 'bar',
      orientation: 'h',
      marker: {
        line: {
          color: ['#111111'],
          width: 1
        },
        color: [
          '#6A040F',
          '#6A040F',
          '#6A040F',
          '#6A040F',
          '#6A040F',
          '#6A040F',
          '#6A040F',
          '#6A040F',
          '#6A040F',
          '#6A040F'
        ]
      }
    },
    {
      x: [70, 10, 45, 50, 10, 20, 45, 15, 80, 20],
      y: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019],
      name: 'Maltreatment Type B',
      type: 'bar',
      orientation: 'h',
      marker: {
        line: {
          color: ['#111111'],
          width: 1
        },
        color: [
          '#E85D04',
          '#E85D04',
          '#E85D04',
          '#E85D04',
          '#E85D04',
          '#E85D04',
          '#E85D04',
          '#E85D04',
          '#E85D04',
          '#E85D04'
        ]
      }
    },
    {
      x: [5, 10, 7, 2, 10, 3, 7, 6, 2, 9],
      y: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019],
      name: 'Maltreatment Type A',
      type: 'bar',
      orientation: 'h',
      marker: {
        line: {
          color: ['#111111'],
          width: 1
        },
        color: [
          '#FFBA08',
          '#FFBA08',
          '#FFBA08',
          '#FFBA08',
          '#FFBA08',
          '#FFBA08',
          '#FFBA08',
          '#FFBA08',
          '#FFBA08',
          '#FFBA08'
        ]
      }
    }
  ]
};
