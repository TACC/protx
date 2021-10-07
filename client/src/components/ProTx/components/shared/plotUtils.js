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
  const newObservedFeaturesPlotData = getObservedFeaturesDataObject();

  // Transform the backend response from the query into the required object structure for the plot.
  const x = newObservedFeaturesPlotData.fig_aes.bar_labels;
  // Need to iterate instead of declare every year...
  const y0 = newObservedFeaturesPlotData.fig_aes.years.[2011].bars;
  const y1 = newObservedFeaturesPlotData.fig_aes.years.[2012].bars;
  const y2 = newObservedFeaturesPlotData.fig_aes.years.[2013].bars;
  const y3 = newObservedFeaturesPlotData.fig_aes.years.[2014].bars;
  const y4 = newObservedFeaturesPlotData.fig_aes.years.[2015].bars;
  const y5 = newObservedFeaturesPlotData.fig_aes.years.[2016].bars;
  const y6 = newObservedFeaturesPlotData.fig_aes.years.[2017].bars;
  const y7 = newObservedFeaturesPlotData.fig_aes.years.[2018].bars;
  const y8 = newObservedFeaturesPlotData.fig_aes.years.[2019].bars;


  // const trace0 = {
  //   x: x,
  //   y: y0,
  //   type: 'histogram',
  //   opacity: 0.5,
  //   marker: {
  //     color: histColors[0]
  //   }
  // };

  // const trace1 = {
  //   x: x,
  //   y: y1,
  //   type: 'histogram',
  //   opacity: 0.6,
  //   marker: {
  //     color: histColors[1]
  //   }
  // };

  // const trace2 = {
  //   x: x,
  //   y: y2,
  //   type: 'histogram',
  //   opacity: 0.6,
  //   marker: {
  //     color: histColors[2]
  //   }
  // };

  // const trace3 = {
  //   x: x,
  //   y: y3,
  //   type: 'histogram',
  //   opacity: 0.6,
  //   marker: {
  //     color: histColors[3]
  //   }
  // };

  // const trace4 = {
  //   x: x,
  //   y: y4,
  //   type: 'histogram',
  //   opacity: 0.6,
  //   marker: {
  //     color: histColors[4]
  //   }
  // };

  // const trace5 = {
  //   x: x,
  //   y: y5,
  //   type: 'histogram',
  //   opacity: 0.6,
  //   marker: {
  //     color: histColors[5]
  //   }
  // };

  // const trace6 = {
  //   x: x,
  //   y: y6,
  //   type: 'histogram',
  //   opacity: 0.6,
  //   marker: {
  //     color: histColors[6]
  //   }
  // };

  // const trace7 = {
  //   x: x,
  //   y: y7,
  //   type: 'histogram',
  //   opacity: 0.6,
  //   marker: {
  //     color:histColors[7]
  //   }
  // };

  // const trace8 = {
  //   x: x,
  //   y: y8,
  //   type: 'histogram',
  //   opacity: 0.6,
  //   marker: {
  //     color: histColors[8]
  //   }
  // };

  // DUMMY DATA.
  const trace1 = {
    x: [1, 2, 3],
    y: [4, 5, 6],
    xaxis: 'x1',
    yaxis: 'y1',
    type: 'scatter'
  };

  const trace2 = {
    x: [20, 30, 40],
    y: [50, 60, 70],
    xaxis: 'x2',
    yaxis: 'y2',
    type: 'scatter'
  };

  const trace3 = {
    x: [300, 400, 500],
    y: [600, 700, 800],
    xaxis: 'x3',
    yaxis: 'y3',
    type: 'scatter'
  };

  const trace4 = {
    x: [20, 30, 40],
    y: [50, 60, 70],
    xaxis: 'x4',
    yaxis: 'y4',
    type: 'scatter'
  };

  const trace5 = {
    x: [1, 2, 3],
    y: [4, 5, 6],
    xaxis: 'x5',
    yaxis: 'y5',
    type: 'scatter'
  };

  const trace6 = {
    x: [20, 30, 40],
    y: [50, 60, 70],
    xaxis: 'x6',
    yaxis: 'y6',
    type: 'scatter'
  };

  const trace7 = {
    x: [300, 400, 500],
    y: [600, 700, 800],
    xaxis: 'x7',
    yaxis: 'y7',
    type: 'scatter'
  };

  const trace8 = {
    x: [20, 30, 40],
    y: [50, 60, 70],
    xaxis: 'x8',
    yaxis: 'y8',
    type: 'scatter'
  };

  const trace9 = {
    x: [0, 15, 30],
    y: [7, 9, 11],
    xaxis: 'x9',
    yaxis: 'y9',
    type: 'scatter'
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
  const showPlotLegend = false;
  const plotXDataLabel = 'X DATA LABEL';
  const plotXDataAxisType = 'linear';
  const plotYDataLabel = 'Y DATA LABEL';
  const plotYDataAxisType = 'category';
  const plotSubplotGrids = { grid: { rows: 3, columns: 3, pattern: 'independent' } };
  // const plotSubplotGrids = { grid: { rows: 1, columns: 9, pattern: 'independent' }};

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
    ...plotSubplotGrids
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
  const plotXDataAxisType = 'category';
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
