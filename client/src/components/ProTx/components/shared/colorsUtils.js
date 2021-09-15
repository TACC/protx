import { colorbrewerClassYlOrBr } from '../data/colors';

/** Interval color scale

 Translate values to color and provide information about range of colors (and there intervals) based
 upon information about a variable (min, max, type, special formatting properties etc).

 */
class IntervalColorScale {
  constructor(meta) {
    this.meta = meta;
    let singleValueClasses = false;

    if (meta.min === meta.max) {
      this.numberIntervals = 1;
    } else if (Number.isInteger(meta.min) && Number.isInteger(meta.max)) {
      const numberPossibleClasses = meta.max - meta.min + 1;
      if (numberPossibleClasses <= 6) {
        singleValueClasses = true;
      }
      this.numberIntervals = Math.min(numberPossibleClasses, 6);
    } else {
      this.numberIntervals = 6;
    }
    this.colors = colorbrewerClassYlOrBr[this.numberIntervals];

    this.intervalValues = [this.meta.min];
    for (let i = 1; i < this.numberIntervals; i += 1) {
      this.intervalValues.push(
        this.meta.min +
          (i * (this.meta.max - this.meta.min)) / this.numberIntervals
      );
    }
    this.intervalValues.push(this.meta.max);

    this.intervalLabels = [];
    const scaleRoundingValue = 0;
    for (let i = 0; i < this.numberIntervals; i += 1) {
      const startValue = this.intervalValues[i].toFixed(scaleRoundingValue);
      const nextValue = this.intervalValues[i + 1].toFixed(scaleRoundingValue);
      const label = singleValueClasses
        ? `${startValue}`
        : `${startValue} - ${nextValue}`;
      this.intervalLabels.push(label);
    }
  }

  getIntervalValues() {
    return this.intervalValues;
  }

  getIntervalLabels() {
    return this.intervalLabels;
  }

  getColor(value) {
    const binValue = Math.min(
      Math.floor(
        this.numberIntervals *
          ((value - this.meta.min) / (this.meta.max - this.meta.min))
      ),
      this.numberIntervals - 1
    );
    return this.colors[binValue];
  }
}

export default IntervalColorScale;
