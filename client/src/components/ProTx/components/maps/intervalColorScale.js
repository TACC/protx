// eslint-disable-next-line no-unused-vars

const colorbrewerClass6YlOrBr = [
  '#ffffd4',
  '#fee391',
  '#fec44f',
  '#fe9929',
  '#d95f0e',
  '#993404'
];

const colorsArray = colorbrewerClass6YlOrBr;

/** Interval color scale

 Translate values to color and provide information about range of colors (and there intervals) based
 upon information about a variable (min, max, type, special formatting properties etc).

 TODO extended to handle percents, integers, human readability: https://jira.tacc.utexas.edu/browse/COOKS-26
*/
export class IntervalColorScale {
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
