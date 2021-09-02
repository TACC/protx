import { PHR_MSA_COUNTIES } from '../data/PHR_MSA_County_Data';
import { MALTREATMENT, OBSERVED_FEATURES } from '../data/meta';

/**
 *
 * @param {*} string
 * @returns
 */
const capitalizeString = string => {
  return string[0].toUpperCase() + string.slice(1);
};

/**
 *
 * @param {*} targetValue
 * @returns
 */
const cleanValue = targetValue => {
  if (targetValue) {
    const result = targetValue - Math.floor(targetValue) !== 0;
    if (result) return `${targetValue.toFixed(2)} %`;
  }
  return targetValue;
};

/**
 * Compare an observedFeature's valueType with valueType and return  true if same type (i.e. percent type or non-percent type)
 *
 * This is not a valueType direct comparison as we are really considering things as being
 * percentages or non-percentages.  This is cause we have percents and a variety of yet-to-be-defined
 * non-percentage value types (like count, dollars etc).
 *
 * @param {Object} observed feature
 * @param {String} valueType
 * @return boolean
 */
const compareSimplifiedValueType = (observedFeature, valueType) => {
  const isPercent =
    'valueType' in observedFeature && observedFeature.valueType === 'percent';
  return valueType === 'percent' ? isPercent : !isPercent;
};

/**
 * Get the county name for a given Geoid.
 * @param {String} currentGeoid
 * @returns {fipsIdName: string}
 */
const getFipsIdName = currentGeoid => {
  const trimmedGeoid = currentGeoid.substring(currentGeoid.length - 3);
  const countyObjects = PHR_MSA_COUNTIES[0];
  let fipsIdName;

  Object.keys(countyObjects).forEach(cty => {
    const currentCounty = countyObjects[cty];
    const baseCode = '000';
    const countyCode = baseCode + currentCounty['FIPS Number']; // String.
    const currentCountyCode = countyCode.slice(-3);
    const currentCountyName = currentCounty['County Name'];

    if (currentCountyCode === trimmedGeoid) {
      fipsIdName = currentCountyName;
    }
  });

  return fipsIdName;
};

/**
 * Get meta data for observed features
 * @param {Object} data
 * @param {String} geography
 * @param {Number} year
 * @param {String} observedFeature
 * @returns {Object} meta data (min, max)
 */
const getObservedFeaturesMetaData = (
  data,
  geography,
  year,
  observedFeature
) => {
  const hasValues =
    geography in data.observedFeaturesMeta &&
    observedFeature in data.observedFeaturesMeta[geography];
  return hasValues
    ? data.observedFeaturesMeta[geography][observedFeature]
    : null;
};

/**
 * Get meta data for maltreatment data
 * @param {Object} data
 * @param {String} geography
 * @param {Number} year
 * @param Array<{String}> maltreatmentTypes
 * @returns {Object} meta data (min, max)
 */
const getMaltreatmentMetaData = (data, geography, year, maltreatmentTypes) => {
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
};

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
const getMetaData = (
  data,
  mapType,
  geography,
  year,
  observedFeature,
  maltreatmentTypes
) => {
  const meta =
    mapType === 'observedFeatures'
      ? getObservedFeaturesMetaData(data, geography, year, observedFeature)
      : getMaltreatmentMetaData(data, geography, year, maltreatmentTypes);
  return meta;
};

/**
 * Get value of an observed (demographic) feature  data for maltreatment data
 * @param {Object} data
 * @param {String} geography
 * @param {Number} year
 * @param {Number} geoid
 * @param {String} observedFeature
 * @returns {Number} value (null if no value exists)
 */
const getObservedFeatureValue = (
  data,
  geography,
  year,
  geoid,
  observedFeature
) => {
  const dataSet = data.observedFeatures[geography];
  const hasElement = geoid in dataSet;
  const hasElementAndProperty = hasElement && observedFeature in dataSet[geoid];
  const featureValue = hasElementAndProperty
    ? dataSet[geoid][observedFeature]
    : null;
  return featureValue;
};

/**
 * Get aggreagated value of maltreatment counts for a feature
 * @param {Object} data
 * @param {String} geography
 * @param {Number} year
 * @param {Number} geoid
 * @param Array<{String}> maltreatmentTypes
 * @returns {Number} value (null if no value exists)
 */
const getMaltreatmentAggregatedValue = (
  data,
  geography,
  year,
  geoid,
  maltreatmentTypes
) => {
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
};

/**
 *
 * @param {*} typesDataArray
 * @returns
 */
const getMaltreatmentTypeNames = maltreatmentTypeCodes => {
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
 * Get array of values for the selected maltreatment types for a feature
 * @param {Object} data
 * @param {String} geography
 * @param {Number} year
 * @param {Number} geoid
 * @param Array<{String}> maltreatmentTypes
 * @returns Array<{Number}> of values
 */
const getMaltreatmentSelectedValues = (
  data,
  geography,
  year,
  geoid,
  maltreatmentTypes
) => {
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
};

/**
 *
 * @param {*} typesDataArray
 * @returns
 */
const getMaltreatmentTypesDataObject = (codeArray, nameArray, valueArray) => {
  const newMaltreatmentDataObject = [];
  for (let i = 0; i < codeArray.length; i += 1) {
    const dataObject = {};
    dataObject.code = codeArray[i];
    dataObject.name = nameArray[i];
    dataObject.value = valueArray[i];
    dataObject.highlight = false;
    newMaltreatmentDataObject.push(dataObject);
  }
  return newMaltreatmentDataObject;
};

/**
 *
 * @param {*} typesDataArray
 * @returns
 */
const getObservedFeaturesLabel = selectedObservedFeatureCode => {
  return OBSERVED_FEATURES.find(f => selectedObservedFeatureCode === f.field)
    .name;
};

/**
 *
 * @param {*} selectedObservedFeatureCode
 * @returns {valueType: string}
 */
const getObservedFeatureValueType = selectedObservedFeatureCode => {
  const hasValue = OBSERVED_FEATURES.find(
    f => selectedObservedFeatureCode === f.field
  ).valueType;
  if (hasValue === 'percent') {
    return 'Percent';
  }
  return 'Total Count';
};

/**
 *
 * @param {*} typesDataArray
 * @returns
 */
const getPredictiveFeaturesDataObject = () => {
  const newPredictiveFeaturesDataObject = [];

  //

  return newPredictiveFeaturesDataObject;
};

export {
  capitalizeString,
  cleanValue,
  compareSimplifiedValueType,
  getMetaData,
  getObservedFeatureValue,
  getMaltreatmentAggregatedValue,
  getFipsIdName,
  getMaltreatmentTypeNames,
  getMaltreatmentSelectedValues,
  getMaltreatmentTypesDataObject,
  getObservedFeaturesLabel,
  getObservedFeatureValueType,
  getPredictiveFeaturesDataObject
};
