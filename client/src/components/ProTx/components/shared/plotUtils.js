import { THEME_CB12_MAIN, THEME_CB12_ALT0 } from '../data/colors';
import { CATEGORY_CODES } from '../data/meta';
import {
  // getFipsIdName,
  getMaltreatmentTypeNames,
  getMaltreatmentSelectedValues,
  getMaltreatmentAggregatedValue,
  getMaltreatmentTypesDataObject,
  // getObservedFeatureValueType,
  getObservedFeaturesDataObject,
  getPredictiveFeaturesDataObject
} from './dataUtils';

/**
 * Assign an imported color theme for use in plot generation.
 */
const plotColors = THEME_CB12_MAIN;
const histColors = THEME_CB12_ALT0;

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

  const newPlotLayout = {
    autosize: true,
    margin: { t: 40, r: 0, b: 0, l: 0, pad: 10 },
    font: {
      size: 10
    },
    xaxis: {
      automargin: true,
      autorange: true,
      type: plotXAxisType,
      tickangle: 0,
      tick0: 0, // %,# --> 0 | $ --> 1000
      dtick: 1, // % --> 'L5' | # --> 1 | $ --> 0.1
      tickformat: null, // %,# --> null | $ --> 'f',
      tickprefix: null, // %,# --> null | $ --> '$'
      ticksuffix: null, // % --> '%' | #,$ --> null
      title: {
        text: plotXAxisTitle,
        standoff: 12,
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
      title: {
        text: plotYAxisTitle,
        standoff: 16,
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
  const maltreatmentTypesList = getMaltreatmentTypeNames(maltreatmentTypes);

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

const getObservedFeaturesPlotData = () => {
  // Transform the backend response from the query into the required object structure for the plot.
  const newObservedFeaturesPlotData = getObservedFeaturesDataObject();
  // const plotDataYRange = newObservedFeaturesPlotData.fig_aes.yrange;
  // const plotDataXRange = newObservedFeaturesPlotData.fig_aes.xrange;
  // const plotDataGeotype = newObservedFeaturesPlotData.fig_aes.geotype;
  const plotDataLabelYUnits = newObservedFeaturesPlotData.fig_aes.label_units;
  const plotDataLabelXUnits = 'Number of Counties';
  const plotDataBarLabels = newObservedFeaturesPlotData.fig_aes.bar_labels;
  // const plotDataBarCenters = newObservedFeaturesPlotData.fig_aes.bar_centers;
  const PlotDataYears = newObservedFeaturesPlotData.fig_aes.years;

  const traceMarkerTypes = ['scatter', 'bar', 'histogram', 'marker'];
  const traceType = traceMarkerTypes[2];
  const markerOpacity = 0.6;

  const trace1 = {
    name: '2011',
    y: plotDataBarLabels,
    x: PlotDataYears.[2011].bars,
    xaxis: 'x1',
    yaxis: 'y1',
    type: traceType,
    orientation: 'h',
    opacity: markerOpacity,
    marker: {
      color: histColors[0]
    }
  };

  const trace2 = {
    name: '2012',
    y: plotDataBarLabels,
    x: PlotDataYears.[2012].bars,
    xaxis: 'x2',
    yaxis: 'y2',
    type:  traceType,
    orientation: 'h',
    opacity: markerOpacity,
    marker: {
      color: histColors[1]
    }
  };

  const trace3 = {
    name: '2013',
    y: plotDataBarLabels,
    x: PlotDataYears.[2013].bars,
    xaxis: 'x3',
    yaxis: 'y3',
    type:  traceType,
    orientation: 'h',
    opacity: markerOpacity,
    marker: {
      color: histColors[2]
    }
  };

  const trace4 = {
    name: '2014',
    y: plotDataBarLabels,
    x: PlotDataYears.[2014].bars,
    xaxis: 'x4',
    yaxis: 'y4',
    type:  traceType,
    orientation: 'h',
    opacity: markerOpacity,
    marker: {
      color: histColors[3]
    }
  };

  const trace5 = {
    name: '2015',
    y: plotDataBarLabels,
    x: PlotDataYears.[2015].bars,
    xaxis: 'x5',
    yaxis: 'y5',
    type:  traceType,
    orientation: 'h',
    opacity: markerOpacity,
    marker: {
      color: histColors[4]
    }
  };

  const trace6 = {
    name: '2016',
    y: plotDataBarLabels,
    x: PlotDataYears.[2016].bars,
    xaxis: 'x6',
    yaxis: 'y6',
    type:  traceType,
    orientation: 'h',
    opacity: markerOpacity,
    marker: {
      color: histColors[5]
    }
  };

  const trace7 = {
    name: '2017',
    y: plotDataBarLabels,
    x: PlotDataYears.[2017].bars,
    xaxis: 'x7',
    yaxis: 'y7',
    type:  traceType,
    orientation: 'h',
    opacity: markerOpacity,
    marker: {
      color: histColors[6]
    }
  };

  const trace8 = {
    name: '2018',
    y: plotDataBarLabels,
    x: PlotDataYears.[2018].bars,
    xaxis: 'x8',
    yaxis: 'y8',
    type:  traceType,
    orientation: 'h',
    opacity: markerOpacity,
    marker: {
      color: histColors[7]
    }
  };

  const trace9 = {
    name: '2019',
    y: plotDataBarLabels,
    x: PlotDataYears.[2019].bars,
    xaxis: 'x9',
    yaxis: 'y9',
    type:  traceType,
    orientation: 'h',
    opacity: markerOpacity,
    marker: {
      color: histColors[8]
    }
  };


  const observedFeaturesDataObject = [
    trace1,
    trace2,
    trace3,
    trace4,
    trace5,
    trace6,
    trace7,
    trace8,
    trace9
  ];

  const plotTitle = 'Demographics';
  const plotOrientation = 'v';
  const showPlotLegend = true;
  const plotXDataLabel = plotDataLabelXUnits;
  const plotXDataAxisType = 'linear';
  const plotYDataLabel = plotDataLabelYUnits;
  const plotYDataAxisType = 'category';

  // const plotSubplotGrids = { grid: { rows: 3, columns: 3, pattern: 'independent' } };
  const plotSubplotGrids = { grid: { rows: 1, columns: 9, pattern: 'independent' } };

  const traceDomainRangeMapping = {
    // xaxis1: { domain: [0, 0.1]},
    yaxis1: { anchor: 'x1'},
    // xaxis2: { domain: [0.11, 0.21] },
    yaxis2: { anchor: 'x1'},
    // xaxis3: { domain: [0.22, 0.32] },
    yaxis3: { anchor: 'x1'},
    // xaxis4: { domain: [0.33, 0.43] },
    yaxis4: { anchor: 'x1'},
    // xaxis5: { domain: [0.44, 0.54] },
    yaxis5: { anchor: 'x1'},
    // xaxis6: { domain: [0.55, 0.65] },
    yaxis6: { anchor: 'x1'},
    // xaxis7: { domain: [0.66, 0.76] },
    yaxis7: { anchor: 'x1'},
    // xaxis8: { domain: [0.77, 0.87] },
    yaxis8: { anchor: 'x1'},
    // xaxis9: { domain: [0.88, 0.98] },
    yaxis9: { anchor: 'x1'},
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

  const plotLayout = {
    ...basePlotLayout,
    ...plotSubplotGrids,
    ...traceDomainRangeMapping,
    ...layoutColors
  };

  // const plotData = getPlotDataBars(
  //   'observed',
  //   observedFeaturesDataObject,
  //   plotOrientation
  // );

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

  const plotTitle = 'Predictive Features';
  const plotOrientation = 'v';
  const showPlotLegend = true;
  const plotXDataLabel = 'X DATA LABEL';
  const plotXDataAxisType = 'linear'; // 'category', 'linear'
  const plotYDataLabel = 'Y DATA LABEL';
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
