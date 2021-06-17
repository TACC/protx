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
    showEditInChartStudio: false,
    plotlyServerURL: 'https://chart-studio.plotly.com',
    linkText: 'Edit Chart in Plotly Studio'
  },
  CHART_LAYOUT: {
    // more about "layout.title": #layout-title
    title: ' DEMO Basic Example Chart',
    width: '100%',
    height: '100%',
    barmode: 'stack',
    margin: { t: 0, r: 0, b: 0, l: 20, pad: 10 },
    // all "layout.xaxis" attributes: #layout-xaxis
    xaxis: {
      automargin: true,
      tickangle: 0,
      // more about "layout.xaxis.title": #layout-xaxis-title
      title: {
        text: 'Time',
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
    annotations: [
      // all "annotation" attributes: #layout-annotations
      {
        // #layout-annotations-text
        text: 'simple annotation',
        // #layout-annotations-x
        x: 0,
        // #layout-annotations-xref
        xref: 'paper',
        // #layout-annotations-y
        y: 0,
        // #layout-annotations-yref
        yref: 'paper'
      }
    ]
  },
  CHART_DATA: [
    {
      // all "scatter" attributes: https://plotly.com/javascript/reference/#scatter
      type: 'scatter',
      // more about "x": #scatter-x
      x: [1, 2, 3],
      // #scatter-y
      y: [3, 1, 6],
      // marker is an object, valid marker keys: #scatter-marker
      marker: {
        // more about "marker.color": #scatter-marker-color
        color: 'rgb(16, 32, 77)' 
      }
    },
    {
      // all "bar" chart attributes: #bar
      type: 'bar',
      // more about "x": #bar-x
      x: [1, 2, 3],
      // #bar-y
      y: [3, 1, 6],
      // #bar-name
      name: 'bar chart example'
    }
  ]
};
