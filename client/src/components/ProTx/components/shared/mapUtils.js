import {
  getObservedFeatureValue,
  getMaltreatmentAggregatedValue
} from './dataUtils';
import { colorbrewerClass6YlOrBr } from '../data/colors';

const colorsArray = colorbrewerClass6YlOrBr;

/** Interval color scale

 Translate values to color and provide information about range of colors (and there intervals) based
 upon information about a variable (min, max, type, special formatting properties etc).

 TODO extended to handle percents, integers, human readability: https://jira.tacc.utexas.edu/browse/COOKS-26
*/
class IntervalColorScale {
  constructor(meta) {
    this.meta = meta;
    this.colors = colorsArray;
    this.numberIntervals = colorsArray.length;
  }

  getIntervalValues() {
    const intervalValues = [this.meta.min];
    for (let i = 1; i < this.numberIntervals; i += 1) {
      intervalValues.push(
        this.meta.min +
          (i * (this.meta.max - this.meta.min)) / this.numberIntervals
      );
    }
    intervalValues.push(this.meta.max);
    return intervalValues;
  }
}

// TODO moved into IntervalColorScale
export function getColor(value, min, max) {
  const binValue = Math.min(Math.floor(6 * ((value - min) / (max - min))), 5);
  return colorsArray[binValue];
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
const getFeatureStyle = (
  mapType,
  data,
  metaData,
  geography,
  year,
  geoid,
  observedFeature,
  maltreatmentTypes
) => {
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
};

export { getFeatureStyle, IntervalColorScale };
