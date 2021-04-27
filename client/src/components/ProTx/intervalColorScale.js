// eslint-disable-next-line no-unused-vars
const coldToHotColors8 = [
  `#ffffcc`,
  `#ffeda0`,
  `#fed976`,
  `#feb24c`,
  `#fd8d3c`,
  `#fc4e2a`,
  `#e31a1c`,
  `#bd0026`,
  `#800026`
];

const coldToHotColors6 = [
  `#ffffb2`,
  `#fed976`,
  `#feb24c`,
  `#fd8d3c`,
  `#f03b20`,
  `#bd0026`
];

/** Interval color scale

 Translate values to color and provide information about range of colors (and there intervals) based
 upon information about a variable (min, max, type, special formatting properties etc).

 TODO extended to handle percents, integers, human readability: https://jira.tacc.utexas.edu/browse/COOKS-26
*/
export class IntervalColorScale {
  constructor(meta) {
    this.meta = meta;
    this.colors = coldToHotColors6;
    this.numberIntervals = coldToHotColors6.length;
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
  return coldToHotColors6[binValue];
}
