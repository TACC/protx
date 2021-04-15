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

export const colorMapInformation = {
  colors: coldToHotColors6,
  numberIntervals: coldToHotColors6.length
};

export function getColor(value, min, max) {
  const binValue = Math.min(Math.floor(6 * ((value - min) / (max - min))), 5);
  return coldToHotColors6[binValue];
}

export function getIntervalValues(meta) {
  const intervalValues = [meta.min];
  for (let i = 1; i < colorMapInformation.numberIntervals; i += 1) {
    intervalValues.push(
      meta.min +
        (i * (meta.max - meta.min)) / colorMapInformation.numberIntervals
    );
  }
  intervalValues.push(meta.max);
  return intervalValues;
}
