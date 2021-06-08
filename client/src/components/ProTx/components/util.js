export function getMetaData(
  data,
  mapType,
  geography,
  year,
  observedFeature,
  maltreatmentTypes
) {
  if (mapType === 'observedFeatures') {
    const hasValues =
      geography in data.observedFeaturesMeta &&
      observedFeature in data.observedFeaturesMeta[geography];
    return hasValues
      ? data.observedFeaturesMeta[geography][observedFeature]
      : null;
  }

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

/// get aggregated values or returns null if not found
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
