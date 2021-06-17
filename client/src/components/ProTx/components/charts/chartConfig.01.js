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
  },
  CHART_LAYOUT: {
    width: '100%',
    height: '100%',
    barmode: 'stack',
    title: ' DEMO Single Year Horizontal Stacked Bar Chart'
  },
  CHART_DATA: [
    // Order objects in reverse of how you want them to populate the category key.
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
