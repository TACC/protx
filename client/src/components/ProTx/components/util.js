import { getColor } from './maps/intervalColorScale';
import { OBSERVED_FEATURES, MALTREATMENT } from './meta';

/**
 * Get meta data for observed features
 * @param {Object} data
 * @param {String} geography
 * @param {Number} year
 * @param {String} observedFeature
 * @returns {Object} meta data (min, max)
 */
function getObservedFeaturesMetaData(data, geography, year, observedFeature) {
  const hasValues =
    geography in data.observedFeaturesMeta &&
    observedFeature in data.observedFeaturesMeta[geography];
  return hasValues
    ? data.observedFeaturesMeta[geography][observedFeature]
    : null;
}

/**
 * Get meta data for maltreatment data
 * @param {Object} data
 * @param {String} geography
 * @param {Number} year
 * @param Array<{String}> maltreatmentTypes
 * @returns {Object} meta data (min, max)
 */
export function getMaltreatmentMetaData(
  data,
  geography,
  year,
  maltreatmentTypes
) {
  // maltreatment data is derived from data as
  // it is based on the list of selected maltreatment types
  if (maltreatmentTypes.length === 0) {
    return null;
  }

  const hasYearAndGeography =
    geography in data.maltreatment && year in data.maltreatment[geography];

  let meta = null;
  const aggregrateValues = {};

  if (hasYearAndGeography) {
    const yearDataSet = data.maltreatment[geography][year];
    maltreatmentTypes.forEach(malType => {
      if (malType in yearDataSet) {
        Object.entries(yearDataSet[malType]).forEach(([geoid, countInfo]) => {
          const value = countInfo.MALTREATMENT_COUNT;
          if (geoid in aggregrateValues) {
            aggregrateValues[geoid] += value;
          } else {
            aggregrateValues[geoid] = value;
          }
        });
      }
    });

    const values = Object.values(aggregrateValues).map(x => +x);
    if (values.length) {
      meta = { min: Math.min(...values), max: Math.max(...values) };
    }
  }
  return meta;
}

/**
 * Get meta data for maltreatment data
 * @param {Object} data
 * @param {String} map type
 * @param {String} geography
 * @param {Number} year
 * @param {String} observedFeature
 * @param Array<{String}> maltreatmentTypes
 * @returns {Object} meta data (min, max)
 */
export function getMetaData(
  data,
  mapType,
  geography,
  year,
  observedFeature,
  maltreatmentTypes
) {
  const meta =
    mapType === 'observedFeatures'
      ? getObservedFeaturesMetaData(data, geography, year, observedFeature)
      : getMaltreatmentMetaData(data, geography, year, maltreatmentTypes);
  return meta;
}

/**
 * Get value of an observed (demographic) feature  data for maltreatment data
 * @param {Object} data
 * @param {String} geography
 * @param {Number} year
 * @param {Number} geoid
 * @param {String} observedFeature
 * @returns {Number} value (null if no value exists)
 */
export function getObservedFeatureValue(
  data,
  geography,
  year,
  geoid,
  observedFeature
) {
  const dataSet = data.observedFeatures[geography];
  const hasElement = geoid in dataSet;
  const hasElementAndProperty = hasElement && observedFeature in dataSet[geoid];
  const featureValue = hasElementAndProperty
    ? dataSet[geoid][observedFeature]
    : null;
  return featureValue;
}

/**
 * Get aggreagated value of maltreatment counts for a feature
 * @param {Object} data
 * @param {String} geography
 * @param {Number} year
 * @param {Number} geoid
 * @param Array<{String}> maltreatmentTypes
 * @returns {Number} value (null if no value exists)
 */
export function getMaltreatmentAggregatedValue(
  data,
  geography,
  year,
  geoid,
  maltreatmentTypes
) {
  const hasYearAndGeography =
    geography in data.maltreatment && year in data.maltreatment[geography];
  let value = 0;
  if (hasYearAndGeography) {
    maltreatmentTypes.forEach(malType => {
      if (
        malType in data.maltreatment[geography][year] &&
        geoid in data.maltreatment[geography][year][malType]
      ) {
        value +=
          data.maltreatment[geography][year][malType][geoid].MALTREATMENT_COUNT;
      }
    });
  }
  return value;
}

/**
 * Get array of values for the selected maltreatment types for a feature
 * @param {Object} data
 * @param {String} geography
 * @param {Number} year
 * @param {Number} geoid
 * @param Array<{String}> maltreatmentTypes
 * @returns Array<{Number}> of values
 */
export function getMaltreatmentSelectedValues(
  data,
  geography,
  year,
  geoid,
  maltreatmentTypes
) {
  const hasYearAndGeography =
    geography in data.maltreatment && year in data.maltreatment[geography];
  const valuesArray = [];
  if (hasYearAndGeography) {
    maltreatmentTypes.forEach(malType => {
      let value = 0; // Revisit this supposition about missing data values later with Kelly.
      if (
        malType in data.maltreatment[geography][year] &&
        geoid in data.maltreatment[geography][year][malType]
      ) {
        value =
          data.maltreatment[geography][year][malType][geoid].MALTREATMENT_COUNT;
      }
      valuesArray.push(value);
    });
  }
  return valuesArray;
}

/**
 * Get style for feature
 *
 * If no value exists, then we return a transparent feature style if no value exists)
 *
 * @param {String} map type
 * @param {Object} data
 * @param {Object} metaData
 * @param {String} geography
 * @param {Number} year
 * @param {Number} geoid
 * @param {String} observedFeature
 * @param Array<{String}> maltreatmentTypes
 * @returns {fillColor: string, fillOpacity: number, fill: boolean, stroke: boolean} style
 */
export function getFeatureStyle(
  mapType,
  data,
  metaData,
  geography,
  year,
  geoid,
  observedFeature,
  maltreatmentTypes
) {
  let fillColor;
  if (mapType === 'observedFeatures') {
    const featureValue = getObservedFeatureValue(
      data,
      geography,
      year,
      geoid,
      observedFeature
    );
    if (featureValue && metaData) {
      fillColor = getColor(featureValue, metaData.min, metaData.max);
    }
  } else {
    const featureValue = getMaltreatmentAggregatedValue(
      data,
      geography,
      year,
      geoid,
      maltreatmentTypes
    );
    if (featureValue !== 0 && metaData) {
      fillColor = getColor(featureValue, metaData.min, metaData.max);
    }
  }
  if (fillColor) {
    return {
      fillColor,
      fill: true,
      stroke: false,
      fillOpacity: 0.5
    };
  }
  // if no color/data, we return a completely transparent style in order
  // to allow for feature selection.
  return {
    fillColor: 'black',
    fill: true,
    stroke: false,
    fillOpacity: 0.0
  };
}

/* Variables & Methods used across all Plot types. */

export const plotCategoryColors = [
  '#4363d8',
  '#911eb4',
  '#bcf60c',
  '#fabebe',
  '#808000',
  '#000075',
  '#808080',
  '#ffe119',
  '#e6beff',
  '#3cb44b',
  '#aaffc3',
  '#ffd8b1',
  '#ffffff',
  '#46f0f0',
  '#f032e6',
  '#008080',
  '#000000',
  '#e6194b',
  '#9a6324',
  '#fffac8',
  '#f58231',
  '#800000'
];

// Plotting Helper Methods.

/**
 *
 * @param {*} typesDataArray
 * @returns
 */
export const getBarVertTrace = (traceY, traceX, traceName, traceFillColor) => {
  return {
    y: [traceY],
    x: [traceX],
    name: traceName,
    type: 'bar',
    orientation: 'v',
    marker: {
      line: {
        color: ['#111111'],
        width: 1
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
export const getPlotDataVertBars = typesDataArray => {
  const newPlotData = [];
  for (let i = 0; i < typesDataArray.length; i += 1) {
    const yData = typesDataArray[i].value;
    const xData = typesDataArray[i].code;
    const tName = typesDataArray[i].name;
    const traceFillColor = plotCategoryColors[i];
    const type = getBarVertTrace(yData, xData, tName, traceFillColor);
    newPlotData.push(type);
  }
  return newPlotData;
};

/**
 *
 * @param {*} typesDataArray
 * @returns
 */
export const plotConfig = {
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
export const getPlotLayout = plotTitle => {
  const newPlotLayout = {
    autosize: true,
    margin: { t: 40, r: 0, b: 0, l: 0, pad: 10 },
    xaxis: {
      automargin: true,
      tickangle: -90,
      title: {
        // text: 'Maltreatment Type',
        text: plotTitle,
        standoff: 20
      }
    },
    yaxis: {
      automargin: true,
      tickangle: 0,
      title: {
        text: 'Total',
        standoff: 20
      }
    },
    annotations: []
  };
  return newPlotLayout;
};

//  Data Marshalling Methods.

/**
 *
 * @param {*} typesDataArray
 * @returns
 */
export const getMaltreatmentTypeNames = maltreatmentTypeCodes => {
  const updatedMaltreatmentTypesList = [];
  if (maltreatmentTypeCodes.length === 0) {
    return ['None'];
  }
  for (let i = 0; i < maltreatmentTypeCodes.length; i += 1) {
    for (let j = 0; j < MALTREATMENT.length; j += 1) {
      if (maltreatmentTypeCodes[i] === MALTREATMENT[j].field) {
        updatedMaltreatmentTypesList.push(MALTREATMENT[j].name);
      }
    }
  }
  return updatedMaltreatmentTypesList;
};

/**
 *
 * @param {*} typesDataArray
 * @returns
 */
export const getMaltreatmentTypesDataObject = (
  codeArray,
  nameArray,
  valueArray
) => {
  const newMaltreatmentDataObject = [];
  for (let i = 0; i < codeArray.length; i += 1) {
    const dataObject = {};
    dataObject.code = codeArray[i];
    dataObject.name = nameArray[i];
    dataObject.value = valueArray[i];
    newMaltreatmentDataObject.push(dataObject);
  }
  return newMaltreatmentDataObject;
};

/**
 *
 * @param {*} typesDataArray
 * @returns
 */
export const getObservedFeaturesLabel = selectedObservedFeatureCode => {
  return OBSERVED_FEATURES.find(f => selectedObservedFeatureCode === f.field)
    .name;
};
