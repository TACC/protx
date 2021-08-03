import { getColor } from './maps/intervalColorScale';

/* Variables used across all Plot types. */

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
