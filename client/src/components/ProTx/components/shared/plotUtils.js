// import plotly from 'react-plotly.js';
// from plotly.subplots import make_subplots  <-- Not in JS version... use Dash?
// import plotly.graph_objects as go;

import { THEME_CB12_MAIN, THEME_HIST_GRADIENT_ALT1 } from '../data/colors';
import { CATEGORY_CODES } from '../data/meta';
import {
  // getFipsIdName,
  getMaltreatmentTypeNames,
  getMaltreatmentSelectedValues,
  getMaltreatmentAggregatedValue,
  getMaltreatmentTypesDataObject,
  // getObservedFeatureValueType,
  // getObservedFeaturesDataObject,
  getPredictiveFeaturesDataObject,
  getObservedFeatureValue
} from './dataUtils';

/**
 * Assign an imported color theme for use in plot generation.
 */
const plotColors = THEME_CB12_MAIN;
const histColors = THEME_HIST_GRADIENT_ALT1;

/**
 * Define array of category codes.
 */
const categoryCodes = CATEGORY_CODES;

/******************************/
/**
 *
 * @param {*} typesDataArray
 * @returns
 */

const plotConfig = {
  doubleClickDelay: 1000,
  responsive: true,
  displayModeBar: false,
  modeBarButtonsToRemove: [],
  displaylogo: false,
  showEditInChartStudio: false
};

/******************************/
/**
 *
 * @param {*} typesDataArray
 * @returns
 */

const getPlotLayout = (
  plotAnnotation,
  plotOrientation,
  plotLegend,
  plotXAxisTitle,
  plotXAxisType,
  plotYAxisTitle,
  plotYAxisType
) => {
  let yAxisAutorange;

  if (plotOrientation === 'v') {
    yAxisAutorange = true;
  }

  if (plotOrientation === 'h') {
    yAxisAutorange = 'reversed';
  }

  const plotLayoutMarginTop = 40;
  const plotLayoutMarginRight = 0;
  const plotLayoutMarginBottom = 40;
  const plotLayoutMarginLeft = 0;
  const plotLayoutmarginPad = 2;

  const newPlotLayout = {
    autosize: true,
    margin: {
      t: plotLayoutMarginTop,
      r: plotLayoutMarginRight,
      b: plotLayoutMarginBottom,
      l: plotLayoutMarginLeft,
      pad: plotLayoutmarginPad
    },
    font: {
      size: 10
    },
    xaxis: {
      automargin: false,
      autorange: true,
      type: plotXAxisType,
      tickangle: 0,
      tick0: 0, // %,# --> 0 | $ --> 1000
      tickformat: null, // %,# --> null | $ --> 'f',
      tickprefix: null, // %,# --> null | $ --> '$'
      ticksuffix: null, // % --> '%' | #,$ --> null
      title: {
        text: plotXAxisTitle,
        standoff: 20,
        font: {
          size: 10
        }
      }
    },
    yaxis: {
      automargin: true,
      autorange: yAxisAutorange,
      type: plotYAxisType,
      tickangle: 0,
      tick0: 0,
      title: {
        text: plotYAxisTitle,
        standoff: 20,
        font: {
          size: 10
        }
      }
    },
    showlegend: plotLegend,
    annotations: [plotAnnotation]
  };

  return newPlotLayout;
};

const getTraceFillColor = (targetPlot, catcode, unique) => {
  let barColorIndex = 12;
  let barColor = histColors[barColorIndex];

  if (targetPlot === 'maltreatment') {
    const indexKey = categoryCodes.indexOf(catcode);
    barColor = plotColors[indexKey];
    return barColor;
  }

  if (targetPlot === 'observed') {
    barColorIndex = 1;
    if (unique) {
      barColorIndex = 10;
    }
  }

  if (targetPlot === 'predictive') {
    barColorIndex = 8;
    if (unique) {
      barColorIndex = 6;
    }
  }

  barColor = histColors[barColorIndex];
  return barColor;
};

/******************************/
/**
 *
 * @param {*} typesDataArray
 * @returns
 */

const getBarTrace = (
  traceY,
  traceX,
  traceName,
  traceFillColor,
  barOrientation
) => {
  let xData;
  let yData;

  if (barOrientation === 'v') {
    xData = traceX;
    yData = traceY;
  }

  if (barOrientation === 'h') {
    xData = traceY;
    yData = traceX;
  }

  return {
    y: [yData],
    x: [xData],
    name: traceName,
    type: 'bar',
    orientation: barOrientation,
    marker: {
      line: {
        color: ['#111111'],
        width: 0.1
      },
      color: [traceFillColor]
    }
  };
};

/******************************/
/**
 *
 * @param {*} typesDataArray
 * @returns
 */

const getPlotDataBars = (targetPlotType, typesDataArray, plotOrientation) => {
  const newPlotData = [];

  for (let i = 0; i < typesDataArray.length; i += 1) {
    const yData = typesDataArray[i].value;
    const xData = typesDataArray[i].code;
    const tName = typesDataArray[i].name;
    const isHighlighted = typesDataArray[i].highlight;

    const traceFillColor = getTraceFillColor(
      targetPlotType,
      xData,
      isHighlighted
    );

    const type = getBarTrace(
      yData,
      xData,
      tName,
      traceFillColor,
      plotOrientation
    );

    newPlotData.push(type);
  }

  return newPlotData;
};

/******************************/
/**
 *
 * @param {*} typesDataArray
 * @returns
 */

const getMaltreatmentPlotData = (
  selectedGeographicFeature,
  maltreatmentTypes,
  data,
  geography,
  year,
  showRate
) => {
  const geoid = selectedGeographicFeature;
  const maltreatmentTypesList = getMaltreatmentTypeNames(
    maltreatmentTypes,
    data
  );

  const maltreatmentTypesDataValues = getMaltreatmentSelectedValues(
    data,
    geography,
    year,
    showRate,
    geoid,
    maltreatmentTypes
  );

  const maltreatmentTypesDataAggregate = getMaltreatmentAggregatedValue(
    data,
    geography,
    year,
    showRate,
    geoid,
    maltreatmentTypes
  ).toFixed(0);

  const maltreatmentTypesDataObject = getMaltreatmentTypesDataObject(
    maltreatmentTypes,
    maltreatmentTypesList,
    maltreatmentTypesDataValues
  );

  const plotTitle = 'Maltreatment Types';
  const plotOrientation = 'v';
  const showPlotLegend = false;
  const plotXDataLabel = 'Maltreatment Type';
  const plotXDataAxisType = 'category';
  const plotYDataLabel = 'Total Number of Cases in Selected County';
  const plotYDataAxisType = 'linear';

  const plotLayout = getPlotLayout(
    plotTitle,
    plotOrientation,
    showPlotLegend,
    plotXDataLabel,
    plotXDataAxisType,
    plotYDataLabel,
    plotYDataAxisType
  );

  const plotData = getPlotDataBars(
    'maltreatment',
    maltreatmentTypesDataObject,
    plotOrientation
  );

  const plotState = {
    data: plotData,
    layout: plotLayout,
    config: plotConfig
  };

  const maltreatmentPlotData = {
    malTypesAggregate: maltreatmentTypesDataAggregate,
    malTypesList: maltreatmentTypesList,
    malPlotState: plotState
  };

  return maltreatmentPlotData;
};

/******************************/
/**
 * TODO: Recreate the timeseries_histogram implementation from the Jupyter notyebook here.
 * TODO: Define the data, layout and config objects for the new plot.
 *
 * @param {*} typesDataArray
 * @returns
 */

const getObservedFeaturesPlotData = (
  selectedGeographicFeature,
  observedFeature,
  data,
  geography,
  year,
  showRate,
  dataHistogram
) => {
  const newObservedFeaturesPlotData = dataHistogram;

  /**
   * TODO: Fix focal_value: the value for each year for the selected geographic feature (currently null).
   */

  // eslint-disable-next-line no-restricted-syntax
  for (const [iYear, yearData] of Object.entries(dataHistogram.years)) {
    yearData.focal_value = getObservedFeatureValue(
      data,
      geography,
      iYear,
      selectedGeographicFeature,
      observedFeature,
      showRate
    );
  }
  // console.log(dataHistogram);

  const plotDataXRange = newObservedFeaturesPlotData.fig_aes.xrange;
  // const plotDataYRange = newObservedFeaturesPlotData.fig_aes.yrange;
  const plotDataGeotype = newObservedFeaturesPlotData.fig_aes.geotype;

  let plotDataLabelXUnits = '';
  if (plotDataGeotype === 'county') {
    plotDataLabelXUnits = 'Number of Counties';
  }
  if (plotDataGeotype === 'tract') {
    plotDataLabelXUnits = 'Number of Census Tracts';
  }

  const plotDataLabelYUnits = newObservedFeaturesPlotData.fig_aes.label_units;
  const plotDataBarLabels = newObservedFeaturesPlotData.fig_aes.bar_labels;
  // const plotDataBarCenters = newObservedFeaturesPlotData.fig_aes.bar_centers;
  const PlotDataYears = newObservedFeaturesPlotData.years;
  // console.log(PlotDataYears);

  const plotTitle = 'Demographics';
  const plotOrientation = 'v';
  const showPlotLegend = true;
  const plotXDataLabel = ''; // plotDataLabelXUnits
  let plotYDataLabel = plotDataLabelYUnits;

  let plotXDataAxisType = 'linear';
  const plotYDataAxisType = 'category';

  if (geography === 'cbsa') {
    plotXDataAxisType = 'log';
    plotYDataLabel = 'Core Base Statistical Areas';
  }

  const traceMarkerTypes = ['scatter', 'bar', 'histogram', 'marker'];
  const traceType = traceMarkerTypes[1];
  const markerOpacity = 0.8;
  const minSubplot = plotDataXRange[0];
  const maxSubplot = plotDataXRange[1];
  const subplotRange = [minSubplot, maxSubplot];

  const gridLayouts = [
    [1, 9],
    [3, 3]
  ];
  const selectedGridLayout = 1;
  const subplotRows = gridLayouts[selectedGridLayout][0];
  const subPlotCols = gridLayouts[selectedGridLayout][1];

  const plotSubplotGrids = {
    grid: { rows: subplotRows, columns: subPlotCols, pattern: 'independent' }
  };

  const subplotBarLayout = {
    barmode: 'group',
    bargap: 0.02,
    bargroupgap: 0
  };

  const layoutColors = {
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)'
  };

  const basePlotLayout = getPlotLayout(
    plotTitle,
    plotOrientation,
    showPlotLegend,
    plotXDataLabel,
    plotXDataAxisType,
    plotYDataLabel,
    plotYDataAxisType
  );

  const baseTrace = {
    name: 'trace name',
    y: plotDataBarLabels,
    x: PlotDataYears[2011].bars,
    xaxis: 'x',
    yaxis: 'y',
    type: traceType,
    orientation: 'h',
    opacity: markerOpacity,
    marker: {
      color: histColors[0]
    }
  };

  const trace1Conf = {
    name: 2011,
    x: PlotDataYears[2011].bars,
    xaxis: 'x1',
    yaxis: 'y1',
    marker: {
      color: histColors[0]
    }
  };

  const trace2Conf = {
    name: '2012',
    x: PlotDataYears[2012].bars,
    xaxis: 'x2',
    yaxis: 'y2',
    marker: {
      color: histColors[1]
    }
  };

  const trace3Conf = {
    name: '2013',
    x: PlotDataYears[2013].bars,
    xaxis: 'x3',
    yaxis: 'y3',
    marker: {
      color: histColors[2]
    }
  };

  const trace4Conf = {
    name: '2014',
    x: PlotDataYears[2014].bars,
    xaxis: 'x4',
    yaxis: 'y4',
    marker: {
      color: histColors[3]
    }
  };

  const trace5Conf = {
    name: '2015',
    x: PlotDataYears[2015].bars,
    xaxis: 'x5',
    yaxis: 'y5',
    marker: {
      color: histColors[4]
    }
  };

  const trace6Conf = {
    name: '2016',
    x: PlotDataYears[2016].bars,
    xaxis: 'x6',
    yaxis: 'y6',
    marker: {
      color: histColors[5]
    }
  };

  const trace7Conf = {
    name: '2017',
    x: PlotDataYears[2017].bars,
    xaxis: 'x7',
    yaxis: 'y7',
    marker: {
      color: histColors[6]
    }
  };

  const trace8Conf = {
    name: '2018',
    x: PlotDataYears[2018].bars,
    xaxis: 'x8',
    yaxis: 'y8',
    marker: {
      color: histColors[7]
    }
  };

  const trace9Conf = {
    name: '2019',
    x: PlotDataYears[2019].bars,
    xaxis: 'x9',
    yaxis: 'y9',
    marker: {
      color: histColors[8]
    }
  };

  const trace1 = {
    ...baseTrace,
    ...trace1Conf
  };

  const trace2 = {
    ...baseTrace,
    ...trace2Conf
  };

  const trace3 = {
    ...baseTrace,
    ...trace3Conf
  };

  const trace4 = {
    ...baseTrace,
    ...trace4Conf
  };

  const trace5 = {
    ...baseTrace,
    ...trace5Conf
  };

  const trace6 = {
    ...baseTrace,
    ...trace6Conf
  };

  const trace7 = {
    ...baseTrace,
    ...trace7Conf
  };

  const trace8 = {
    ...baseTrace,
    ...trace8Conf
  };

  const trace9 = {
    ...baseTrace,
    ...trace9Conf
  };

  const traceDomainRangeMappingBase = {
    xaxis1: {
      range: subplotRange,
      rangeselector: {
        bordercolor: 'rgb(0, 0, 0)',
        borderwidth: 1
      }
    },
    yaxis1: { anchor: 'x1' },
    xaxis2: {
      range: subplotRange
    },
    yaxis2: { anchor: 'x1' },
    xaxis3: {
      range: subplotRange
    },
    yaxis3: { anchor: 'x1' },
    xaxis4: {
      range: subplotRange
    },
    yaxis4: { anchor: 'x1' },
    xaxis5: {
      range: subplotRange
    },
    yaxis5: { anchor: 'x1' },
    xaxis6: {
      range: subplotRange
    },
    yaxis6: { anchor: 'x1' },
    xaxis7: {
      range: subplotRange
    },
    yaxis7: { anchor: 'x1' },
    xaxis8: {
      range: subplotRange
    },
    yaxis8: { anchor: 'x1' },
    xaxis9: {
      range: subplotRange
    },
    yaxis9: { anchor: 'x1' }
  };

  const gridLayout0Title = {
    xaxis5: {
      title: plotDataLabelXUnits // Label "centers" on subplots in 1x9 grid.
    }
  };

  const gridLayout1Title = {
    xaxis8: {
      title: plotDataLabelXUnits // Label "centers" on subplots in 3x3 grid.
    }
  };

  let traceDomainRangeMapping;

  if (selectedGridLayout === 0) {
    traceDomainRangeMapping = {
      ...traceDomainRangeMappingBase,
      ...gridLayout0Title
    };
  }

  if (selectedGridLayout === 1) {
    traceDomainRangeMapping = {
      ...traceDomainRangeMappingBase,
      ...gridLayout1Title
    };
  }

  /**
   * TODO: Add mean, median, focal_value markers to subplot trace.
   */

  const meanTraceType = traceMarkerTypes[0];

  const baseMeanTraceStyle = {
    opacity: 0.7
  };

  const baseMeanTrace = {
    x: [minSubplot, maxSubplot],
    type: meanTraceType,
    xaxis: {
      anchor: 'x',
      title: '',
      ticks: '',
      autotick: true,
      autorange: true,
      showticklabels: false,
      visible: false,
      zeroline: false,
      showline: false,
      showgrid: false
    },
    yaxis: {
      anchor: 'y',
      title: '',
      ticks: '',
      autotick: true,
      autorange: true,
      showticklabels: false,
      visible: false,
      zeroline: false,
      showline: false,
      showgrid: false
    }
  };

  const trace1MeanConfY = PlotDataYears[2011].mean.toFixed();
  const trace2MeanConfY = PlotDataYears[2012].mean.toFixed();
  // const trace3MeanConfY = PlotDataYears[2013].mean.toFixed();
  // const trace4MeanConfY = PlotDataYears[2014].mean.toFixed();
  // const trace5MeanConfY = PlotDataYears[2015].mean.toFixed();
  // const trace6MeanConfY = PlotDataYears[2016].mean.toFixed();
  // const trace7MeanConfY = PlotDataYears[2017].mean.toFixed();
  // const trace8MeanConfY = PlotDataYears[2018].mean.toFixed();
  // const trace9MeanConfY = PlotDataYears[2019].mean.toFixed();

  const trace1MeanConf = {
    name: '2011 Mean',
    y: [trace1MeanConfY, trace1MeanConfY],
    xaxis: {
      anchor: 'xaxis1'
    },
    yaxis: {
      anchor: 'y1'
    }
  };

  const trace2MeanConf = {
    name: '2012 Mean',
    y: [trace2MeanConfY, trace2MeanConfY],
    xaxis: {
      anchor: 'xaxis2'
    },
    yaxis: {
      anchor: 'yaxis2'
    }
  };

  // const trace3MeanConf = {
  //   name: '2013 Mean',
  //   y: [trace3MeanConfY, trace3MeanConfY],
  // };

  // const trace4MeanConf = {
  //   name: '2014 Mean',
  //   y: [trace4MeanConfY, trace4MeanConfY]
  // };

  // const trace5MeanConf = {
  //   name: '2015 Mean',
  //   y: [trace5MeanConfY, trace5MeanConfY]
  // };

  // const trace6MeanConf = {
  //   name: '2016 Mean',
  //   y: [trace6MeanConfY, trace6MeanConfY]
  // };

  // const trace7MeanConf = {
  //   name: '2017 Mean',
  //   y: [trace7MeanConfY, trace7MeanConfY]
  // };

  // const trace8MeanConf = {
  //   name: '2018 Mean',
  //   y: [trace8MeanConfY, trace8MeanConfY]
  // };

  // const trace9MeanConf = {
  //   name: '2019 Mean',
  //   y: [trace9MeanConfY, trace9MeanConfY]
  // };

  const trace1Mean = {
    ...baseMeanTrace,
    ...baseMeanTraceStyle,
    ...trace1MeanConf
  };

  const trace2Mean = {
    ...baseMeanTrace,
    ...baseMeanTraceStyle,
    ...trace2MeanConf
  };

  // const trace3Mean = {
  //   ...baseMeanTrace,
  //   ...baseMeanTraceStyle,
  //   ...trace3MeanConf
  // };

  // const trace4Mean = {
  //   ...baseMeanTrace,
  //   ...baseMeanTraceStyle,
  //   ...trace4MeanConf
  // };

  // const trace5Mean = {
  //   ...baseMeanTrace,
  //   ...baseMeanTraceStyle,
  //   ...trace5MeanConf
  // };

  // const trace6Mean = {
  //   ...baseMeanTrace,
  //   ...baseMeanTraceStyle,
  //   ...trace6MeanConf
  // };

  // const trace7Mean = {
  //   ...baseMeanTrace,
  //   ...baseMeanTraceStyle,
  //   ...trace7MeanConf
  // };

  // const trace8Mean = {
  //   ...baseMeanTrace,
  //   ...baseMeanTraceStyle,
  //   ...trace8MeanConf
  // };

  // const trace9Mean = {
  //   ...baseMeanTrace,
  //   ...baseMeanTraceStyle,
  //   ...trace9MeanConf
  // };

  const observedFeaturesDataObject = [
    trace1,
    trace1Mean,
    trace2,
    trace2Mean,
    trace3,
    // trace3Mean,
    trace4,
    // trace4Mean,
    trace5,
    // trace5Mean,
    trace6,
    // trace6Mean,
    trace7,
    // trace7Mean,
    trace8,
    // trace8Mean,
    trace9
    // trace9Mean
  ];

  const plotLayout = {
    ...basePlotLayout,
    ...plotSubplotGrids,
    ...subplotBarLayout,
    ...traceDomainRangeMapping,
    ...layoutColors
  };

  const plotData = observedFeaturesDataObject;

  const plotState = {
    data: plotData,
    layout: plotLayout,
    config: plotConfig,
    raw: newObservedFeaturesPlotData
  };

  const observedFeaturesPlotData = {
    observedFeaturesPlotState: plotState
  };

  console.log(observedFeaturesPlotData);
  return observedFeaturesPlotData;
};

/******************************/
/**
 *
 * @param {*} typesDataArray
 * @returns
 */

const getPredictiveFeaturesPlotData = () => {
  const newPredictiveFeaturesDataObject = getPredictiveFeaturesDataObject();

  // Transform the response from the query into the required object structure for the plot.
  const predictiveFeaturesDataObject = [];

  const axisCategories = [
    'category',
    'linear',
    'log',
    'date',
    'multicategory',
    '-'
  ];

  const plotTitle = 'Predictive Features';
  const plotOrientation = 'v';
  const showPlotLegend = true;
  const plotXDataLabel = 'X DATA LABEL';
  const plotXDataAxisType = axisCategories[1];
  const plotYDataLabel = 'Y DATA LABEL';
  const plotYDataAxisType = axisCategories[1];

  const plotLayout = getPlotLayout(
    plotTitle,
    plotOrientation,
    showPlotLegend,
    plotXDataLabel,
    plotXDataAxisType,
    plotYDataLabel,
    plotYDataAxisType
  );

  const plotData = getPlotDataBars(
    'predictive',
    predictiveFeaturesDataObject,
    plotOrientation
  );

  const plotState = {
    data: plotData,
    layout: plotLayout,
    config: plotConfig,
    raw: newPredictiveFeaturesDataObject
  };

  const predictiveFeaturesPlotData = {
    predictiveFeaturesPlotState: plotState
  };

  return predictiveFeaturesPlotData;
};

export {
  getMaltreatmentPlotData,
  getObservedFeaturesPlotData,
  getPredictiveFeaturesPlotData
};
