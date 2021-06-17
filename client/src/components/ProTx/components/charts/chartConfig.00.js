export const CONFIGURATION_00 = {
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
    title: ' DEMO Basic Example Chart', // more about "layout.title": #layout-title
    xaxis: {
      // all "layout.xaxis" attributes: #layout-xaxis
      title: 'time' // more about "layout.xaxis.title": #layout-xaxis-title
    },
    annotations: [
      // all "annotation" attributes: #layout-annotations
      {
        text: 'simple annotation', // #layout-annotations-text
        x: 0, // #layout-annotations-x
        xref: 'paper', // #layout-annotations-xref
        y: 0, // #layout-annotations-y
        yref: 'paper' // #layout-annotations-yref
      }
    ]
  },
  CHART_DATA: [
    // Order objects in reverse of how you want them to populate the category key.
    {
      type: 'scatter', // all "scatter" attributes: https://plotly.com/javascript/reference/#scatter
      x: [1, 2, 3], // more about "x": #scatter-x
      y: [3, 1, 6], // #scatter-y
      marker: {
        // marker is an object, valid marker keys: #scatter-marker
        color: 'rgb(16, 32, 77)' // more about "marker.color": #scatter-marker-color
      }
    },
    {
      type: 'bar', // all "bar" chart attributes: #bar
      x: [1, 2, 3], // more about "x": #bar-x
      y: [3, 1, 6], // #bar-y
      name: 'bar chart example' // #bar-name
    }
  ]
};
