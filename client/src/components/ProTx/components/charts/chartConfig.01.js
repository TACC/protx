export const CONFIGURATION_01 = {
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
    chartSubtitle: 'Aggregate For A Single Years',
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
    title: ' DEMO Single Year Horizontal Stacked Bar Chart',
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
      x: [25],
      y: ['YEAR'],
      name: 'Maltreatment Type D',
      type: 'bar',
      orientation: 'h',
      marker: {
        line: {
          color: ['#111111'],
          width: 1
        },
        color: ['#03071E']
      }
    },
    {
      x: [30],
      y: ['YEAR'],
      name: 'Maltreatment Type C',
      type: 'bar',
      orientation: 'h',
      marker: {
        line: {
          color: ['#111111'],
          width: 1
        },
        color: ['#6A040F']
      }
    },
    {
      x: [70],
      y: ['YEAR'],
      name: 'Maltreatment Type B',
      type: 'bar',
      orientation: 'h',
      marker: {
        line: {
          color: ['#111111'],
          width: 1
        },
        color: ['#E85D04']
      }
    },
    {
      x: [5],
      y: ['YEAR'],
      name: 'Maltreatment Type A',
      type: 'bar',
      orientation: 'h',
      marker: {
        line: {
          color: ['#111111'],
          width: 1
        },
        color: ['#FFBA08']
      }
    }
  ]
};
