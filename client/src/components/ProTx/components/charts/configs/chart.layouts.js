// all "layout" attributes: https://plotly.com/javascript/reference/layout

export const LAYOUT_DEMO = {
  title: ' DEMO Example Chart',
  width: '100%',
  height: '100%',
  barmode: 'stack',
  margin: { t: 40, r: 0, b: 0, l: 0, pad: 10 },
  xaxis: {
    automargin: true,
    tickangle: 0,
    title: {
      text: 'X-axis Label',
      standoff: 20
    }
  },
  yaxis: {
    automargin: true,
    tickangle: 0,
    title: {
      text: 'Y-axis Label',
      standoff: 20
    }
  },
  annotations: [
    {
      x: 0.3,
      xref: 'paper',
      xanchor: 'auto',
      xshift: 0,
      y: 0.5,
      yref: 'paper',
      yanchor: 'auto',
      yshift: 0,
      ax: -10,
      ay: -100,
      axref: 'pixel',
      ayref: 'pixel',
      width: 280,
      height: 24,
      clicktoshow: 'onoff',
      xclick: 0,
      yclick: 0,
      text: 'example annotation text w/arrow',
      textangle: -10,
      align: 'center',
      valign: 'middle',
      font: {
        family: 'san serif',
        size: 16,
        color: '#ffffff'
      },
      opacity: 1,
      bgcolor: '#121212',
      bordercolor: '#006699',
      borderpad: 2,
      borderwidth: 4,
      showarrow: true,
      arrowcolor: '#006699',
      arrowhead: 3,
      startarrowhead: 0,
      arrowside: '',
      arrowsize: 2,
      startarrowsize: 3,
      arrowwidth: 5,
      standoff: 0,
      startstandoff: 0,
      hovertext: 'hover text on annotation text',
      hoverlabel: {
        bgcolor: '#771177',
        bordercolor: '#66cc00',
        font: {
          family: 'cursive',
          size: 18,
          color: '#ffffff'
        }
      },
      name: 'my_annotation',
      captureevents: false
      // templateitemname: 'template'
    }
  ]
};

export const LAYOUT_01 = {
  title: 'Horizontal Single Stacked Bar Chart',
  width: '100%',
  height: '100%',
  barmode: 'stack',
  margin: { t: 40, r: 0, b: 0, l: 0, pad: 10 },
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
};

export const LAYOUT_02 = {
  title: 'Horizontal Multiples Stacked Bar Chart',
  width: '100%',
  height: '100%',
  barmode: 'stack',
  margin: { t: 40, r: 0, b: 0, l: 0, pad: 10 },
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
};

export const LAYOUT_03 = {
  title: 'Horizontal Multiples Grouped Bar Chart',
  width: '100%',
  height: '100%',
  // barmode: 'stack',
  margin: { t: 40, r: 0, b: 0, l: 0, pad: 10 },
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
};

export const LAYOUT_04 = {
  title: 'Vertical Single Stacked Bar Chart',
  width: '100%',
  height: '100%',
  barmode: 'stack',
  margin: { t: 40, r: 0, b: 0, l: 0, pad: 10 },
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
};

export const LAYOUT_05 = {
  title: 'Vertical Multiples Stacked Bar Chart',
  width: '100%',
  height: '100%',
  barmode: 'stack',
  margin: { t: 40, r: 0, b: 0, l: 0, pad: 10 },
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
};

export const LAYOUT_06 = {
  title: 'Vertical Multiples Grouped Bar Chart',
  width: '100%',
  height: '100%',
  // barmode: 'stack',
  margin: { t: 40, r: 0, b: 0, l: 0, pad: 10 },
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
};

export const LAYOUT_07 = {
  title: 'Vertical Histogram Chart',
  // width: '100%',
  // height: '100%',
  autosize: true,
  // barmode: 'stack',
  margin: { t: 40, r: 0, b: 0, l: 0, pad: 10 },
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
};
