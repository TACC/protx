import { getColor } from './maps/intervalColorScale';
import { THEME_CB12_MAIN, THEME_CB12_ALT0 } from './colors';
import PHR_MSA_COUNTIES from './PHR_MSA_County_Data';
import { OBSERVED_FEATURES, MALTREATMENT, CATEGORY_CODES } from './meta';

/**
 * Assign an imported color theme for use in plot generation.
 */
export const plotColors = THEME_CB12_MAIN;
export const histColors = THEME_CB12_ALT0;

/**
 * Define array of category codes.
 */
export const categoryCodes = CATEGORY_CODES;

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
 * @param {String} mapType
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

/**
 * Get the county name for a given Geoid.
 * @param {String} currentGeoid
 * @returns {fipsIdName: string}
 */
export const getFipsIdName = currentGeoid => {
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
 *
 * @param {*} typesDataArray
 * @returns
 */
export const getBarTrace = (
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

export const getCategoryColorDestructured = (
  targetPlot,
  catcode,
  unique = false
) => {
  if (targetPlot === 'maltreatment') {
    const indexKey = categoryCodes.indexOf(catcode);
    const barColor = plotColors[indexKey];
    return barColor;
  }
  if (targetPlot === 'observed') {
    if (unique) {
      return histColors[10];
    }
    return histColors[1];
  }
  if (targetPlot === 'predictive') {
    if (unique) {
      return histColors[6];
    }
    return histColors[8];
  }
  return histColors[10];
};

/**
 *
 * @param {*} typesDataArray
 * @returns
 */
export const getPlotDataBars = (
  targetPlotType,
  typesDataArray,
  plotOrientation
) => {
  const newPlotData = [];
  for (let i = 0; i < typesDataArray.length; i += 1) {
    const yData = typesDataArray[i].value;
    const xData = typesDataArray[i].code;
    const tName = typesDataArray[i].name;
    const isHighlighted = typesDataArray[i].highlight;
    const traceFillColor = getCategoryColorDestructured(
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
export const getPlotLayout = (plotTitle, plotOrientation, plotLegend) => {
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
    xaxis: {
      automargin: true,
      tickangle: -90,
      title: {
        text: plotTitle,
        standoff: 20
      }
    },
    yaxis: {
      automargin: true,
      autorange: yAxisAutorange,
      tickangle: 0,
      title: {
        text: 'Total',
        standoff: 20
      }
    },
    showlegend: plotLegend,
    annotations: []
  };

  return newPlotLayout;
};

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
export const getObservedFeaturesLabel = selectedObservedFeatureCode => {
  return OBSERVED_FEATURES.find(f => selectedObservedFeatureCode === f.field)
    .name;
};

/**
 *
 * @param {*} typesDataArray
 * @returns
 */
export const getPredictiveFeaturesDataObject = () => {
  const newPredictiveFeaturesDataObject = [];

  //

  return newPredictiveFeaturesDataObject;
};

/**
 *
 * @param {*} typesDataArray
 * @returns
 */
export const getMaltreatmentPlotData = (
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

  const plotOrientation = 'v';
  const plotLayout = getPlotLayout('Maltreatment Types', plotOrientation, true);
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
 * Current setup chokes on these data objects and does not display correctly.
 * Need to destructure each data object before handing it back to the plot component to render.
 *
 * @param {*} selectedGeographicFeature
 * @param {*} observedFeature
 * @param {*} data
 * @param {*} geography
 * @param {*} year
 * @returns
 *
 */
export const getObservedFeaturesPlotData = (
  selectedGeographicFeature,
  observedFeature,
  data,
  geography,
  year
) => {
  // console.log(geography);
  // console.log(data);

  const observedFeaturesDataObject = [];
  const observedFeaturesData = data.observedFeatures;
  let observedFeatureValue;

  Object.keys(observedFeaturesData).forEach(observed => {
    if (observed === geography) {
      const innerFeature = observedFeaturesData[observed];
      Object.keys(innerFeature).forEach(feature => {
        const featureValues = innerFeature[feature];
        Object.keys(featureValues).forEach(value => {
          if (value === observedFeature) {
            const currentFeature = {};
            currentFeature.code = feature;
            currentFeature.name = feature;

            // Transform each area type's data as needed.
            if (geography === 'cbsa') {
              // console.log('cbsa data');
              // Things here with data object.
            }
            if (geography === 'census_tract') {
              // console.log('census_tract data');
              // Things here with data object.
            }
            if (geography === 'county') {
              // console.log('county data');
              // Things here with data object.
              const featureFipsIdName = getFipsIdName(feature);
              currentFeature.code = featureFipsIdName;
              currentFeature.name = featureFipsIdName;
            }
            if (geography === 'dfps_region') {
              // console.log('dfps_region data');
              // Things here with data object.
            }
            if (geography === 'urban_area') {
              // console.log('urban_area data');
              // Things here with data object.
            }
            if (geography === 'zcta') {
              // console.log('zcta data');
              // Things here with data object.
            }

            // Highlight selected region.
            currentFeature.value = featureValues[value];
            currentFeature.highlight = false;
            if (selectedGeographicFeature === feature) {
              currentFeature.highlight = true;
              observedFeatureValue = currentFeature.value;
            }
            observedFeaturesDataObject.push(currentFeature);
          }
        });
      });
    }
  });

  const plotOrientation = 'h';
  const plotLayout = getPlotLayout('Observed Features', plotOrientation, false);
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
export const getPredictiveFeaturesPlotData = () => {
  const predictiveFeaturesDataObject = getPredictiveFeaturesDataObject();
  const plotOrientation = 'v';
  const plotLayout = getPlotLayout(
    'Predictive Features',
    plotOrientation,
    true
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

/**
 * Capitalize a String value.
 */
export const capitalizeString = string => {
  return string[0].toUpperCase() + string.slice(1);
};

/**
 *
 * @param {*} targetValue
 * @returns
 */
export const cleanValue = targetValue => {
  if (targetValue) {
    const result = targetValue - Math.floor(targetValue) !== 0;
    if (result) return `${targetValue.toFixed(2)} %`;
  }
  return targetValue;
};
