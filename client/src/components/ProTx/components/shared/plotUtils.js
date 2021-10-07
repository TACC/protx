import { THEME_CB12_MAIN, THEME_CB12_ALT0 } from '../data/colors';
import { CATEGORY_CODES } from '../data/meta';
import {
  getFipsIdName,
  getMaltreatmentTypeNames,
  getMaltreatmentSelectedValues,
  getMaltreatmentAggregatedValue,
  getMaltreatmentTypesDataObject,
  getObservedFeatureValueType,
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
  year
) => {
  const geoid = selectedGeographicFeature;
  const maltreatmentTypesList = getMaltreatmentTypeNames(maltreatmentTypes);

  const maltreatmentTypesDataValues = getMaltreatmentSelectedValues(
    data,
    geography,
    year,
    geoid,
    maltreatmentTypes
  );

  const maltreatmentTypesDataAggregate = getMaltreatmentAggregatedValue(
    data,
    geography,
    year,
    geoid,
    maltreatmentTypes
  );

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

/**
 * TODO: Handle different data types (zipcode, urban areas, CBSAs, census tracts) more elegantly.
 *
 * @param {*} selectedGeographicFeature
 * @param {*} observedFeature
 * @param {*} data
 * @param {*} geography
 * @param {*} year
 * @returns
 */

const getObservedFeaturesPlotData = (
  selectedGeographicFeature,
  observedFeature,
  data,
  geography,
  year,
  showRate
) => {
  const observedFeaturesDataObject = [];
  const observedFeaturesData = data.observedFeatures;
  const plotXDataLabel = getObservedFeatureValueType(observedFeature);

  let observedFeatureValue;
  let plotXDataAxisType;
  let plotYDataLabel;

  if (geography === 'cbsa') {
    plotXDataAxisType = 'log';
    plotYDataLabel = 'Core Base Statistical Areas';
  }

  if (geography === 'tract') {
    plotXDataAxisType = 'log';
    plotYDataLabel = 'Census Tracts';
  }

  if (geography === 'county') {
    plotXDataAxisType = 'log';
    plotYDataLabel = 'Counties';
  }

  if (geography === 'dfps_region') {
    plotXDataAxisType = 'linear';
    plotYDataLabel = 'DFPS Regions';
  }

  if (geography === 'urban_area') {
    plotXDataAxisType = 'log';
    plotYDataLabel = 'Urban Areas';
  }

  if (geography === 'zcta') {
    plotXDataAxisType = 'log';
    plotYDataLabel = 'Zip Codes';
  }

  if (
    geography in observedFeaturesData &&
    year in observedFeaturesData[geography] &&
    observedFeature in observedFeaturesData[geography][year]
  ) {
    const features = observedFeaturesData[geography][year][observedFeature];
    Object.keys(features).forEach(feature => {
      const currentFeature = { code: feature, name: feature };

      const valueType = showRate ? 'percent' : 'count';
      currentFeature.value = features[feature][valueType];
      currentFeature.highlight = false;

      if (selectedGeographicFeature === feature) {
        currentFeature.highlight = true;
        observedFeatureValue = currentFeature.value;
      }

      if (geography === 'county') {
        const featureFipsIdName = getFipsIdName(feature);
        currentFeature.code = featureFipsIdName;
        currentFeature.name = featureFipsIdName;
      }

      observedFeaturesDataObject.push(currentFeature);
    });
  }

  const plotTitle = 'Observed Features';
  const plotOrientation = 'h';
  const showPlotLegend = false;
  const plotYDataAxisType = 'category';
  const plotXDataLabelAssembled = `${plotXDataLabel}  (${plotXDataAxisType} scale)`;

  const plotLayout = getPlotLayout(
    plotTitle,
    plotOrientation,
    showPlotLegend,
    plotXDataLabelAssembled,
    plotXDataAxisType,
    plotYDataLabel,
    plotYDataAxisType
  );

  const plotData = getPlotDataBars(
    'observed',
    observedFeaturesDataObject,
    plotOrientation
  );

  const plotState = {
    data: plotData,
    layout: plotLayout,
    config: plotConfig
  };

  const observedFeaturesPlotData = {
    observedFeaturesPlotState: plotState,
    observedFeatureTargetValue: observedFeatureValue
  };

  return observedFeaturesPlotData;
};

/**
 *
 * @param {*} typesDataArray
 * @returns
 */
const getObservedFeaturesPlotReduxData = () => {
  const observedFeaturesPlotReduxData = getObservedFeaturesDataObject();

  /**
   * TODO: Recreate the timeseries_histogram implementation from the Jupyter notyebook here.
   * TODO: Define the data, layout and config objects for the new plot.
   */

  const newObservedFeaturesPlotData = {};
  newObservedFeaturesPlotData.data = {};
  newObservedFeaturesPlotData.layout = {};
  newObservedFeaturesPlotData.config = {};

  newObservedFeaturesPlotData.data = observedFeaturesPlotReduxData;

  return newObservedFeaturesPlotData;
};

/**
 *
 * @param {*} typesDataArray
 * @returns
 */
const getPredictiveFeaturesPlotData = () => {
  const predictiveFeaturesDataObject = getPredictiveFeaturesDataObject();
  const plotXDataLabel = '';
  const plotYDataLabel = 'Total Number of Cases in Selected County';
  const plotOrientation = 'v';

  const plotLayout = getPlotLayout(
    'Predictive Features',
    plotOrientation,
    true,
    plotXDataLabel,
    plotYDataLabel
  );

  const plotData = getPlotDataBars(
    'predictive',
    predictiveFeaturesDataObject,
    plotOrientation
  );

  const plotState = {
    data: plotData,
    layout: plotLayout,
    config: plotConfig
  };

  const predictiveFeaturesPlotData = {
    predictiveFeaturesPlotState: plotState
  };

  return predictiveFeaturesPlotData;
};

export {
  getMaltreatmentPlotData,
  getObservedFeaturesPlotData,
  getObservedFeaturesPlotReduxData,
  getPredictiveFeaturesPlotData
};
