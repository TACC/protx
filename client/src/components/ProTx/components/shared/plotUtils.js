import { THEME_CB12_MAIN, THEME_HIST_GRADIENT_ALT1 } from '../data/colors';
import { CATEGORY_CODES } from '../data/meta';

/**
 * TODO: Integrate chroma.js library for dynamic color scale generation.
 * Assign an imported color theme for use in plot generation.
 */

const plotColors = THEME_CB12_MAIN;
const histColors = THEME_HIST_GRADIENT_ALT1;
const categoryCodes = CATEGORY_CODES;

const plotConfig = {
  doubleClickDelay: 1000,
  responsive: true,
  displayModeBar: false,
  modeBarButtonsToRemove: [],
  displaylogo: false,
  showEditInChartStudio: false
};

/**
 *
 * TODO: determine if we need to pass in different values to the layout per-plot for tick configurations. These could also be created by combining the base layout object with an override object in the plot component.
 *
 * @param {*} typesDataArray
 * @returns
 */

const getPlotLayout = (
  plotAnnotation,
  plotOrientation,
  plotLegend,
  plotXAxisTitle,
  plotXAxisType,
  plotYAxisTitle,
  plotYAxisType
) => {
  // Defaults settings.
  const baseMargin = 40;
  const basePadding = 5;
  const baseStandoff = 20;
  const baseFontSize = 8;
  const baseTitleFontSize = 10;

  const plotLayoutAutoSize = true;
  const plotLayoutMarginTop = baseMargin;
  const plotLayoutMarginRight = baseMargin;
  const plotLayoutMarginBottom = baseMargin;
  const plotLayoutMarginLeft = baseMargin;
  const plotLayoutmarginPad = basePadding;
  const plotLayoutFontSize = baseFontSize;

  const plotLayoutXaxisAutoMargin = false;
  const plotLayoutXaxisAutoRange = true;
  const plotLayoutXaxisType = plotXAxisType;
  const plotLayoutXaxisTickAngle = 0;
  const plotLayoutXaxisTick0 = 0; // %,# --> 0 | $ --> 1000
  const plotLayoutXaxisTickFormat = null; // %,# --> null | $ --> 'f'
  const plotLayoutXaxisTickPrefix = null; // %,# --> null | $ --> '$'
  const plotLayoutXaxisTickSuffix = null; // % --> '%' | #,$ --> null
  const plotLayoutXaxisTitle = plotXAxisTitle;
  const plotLayoutXaxisTitleStandoff = baseStandoff;
  const plotLayoutXaxisTitleFontSize = baseTitleFontSize;

  const plotLayoutYaxisAutoMargin = true;
  let plotLayoutYaxisAutorange;
  const plotLayoutYaxisType = plotYAxisType;
  const plotLayoutYaxisTickAngle = 0;
  const plotLayoutYaxisTick0 = 0; // %,# --> 0 | $ --> 1000
  const plotLayoutYaxisTickFormat = null; // %,# --> null | $ --> 'f'
  const plotLayoutYaxisTickPrefix = null; // %,# --> null | $ --> '$'
  const plotLayoutYaxisTickSuffix = null; // % --> '%' | #,$ --> null
  const plotLayoutYaxisTitle = plotYAxisTitle;
  const plotLayoutYaxisTitleStandoff = baseStandoff;
  const plotLayoutYaxisTitleFontSize = baseTitleFontSize;

  if (plotOrientation === 'v') {
    plotLayoutYaxisAutorange = true;
  }

  if (plotOrientation === 'h') {
    plotLayoutYaxisAutorange = 'reversed';
  }

  const newPlotLayout = {
    autosize: plotLayoutAutoSize,
    margin: {
      t: plotLayoutMarginTop,
      r: plotLayoutMarginRight,
      b: plotLayoutMarginBottom,
      l: plotLayoutMarginLeft,
      pad: plotLayoutmarginPad
    },
    font: {
      size: plotLayoutFontSize
    },
    xaxis: {
      automargin: plotLayoutXaxisAutoMargin,
      autorange: plotLayoutXaxisAutoRange,
      type: plotLayoutXaxisType,
      tickangle: plotLayoutXaxisTickAngle,
      tick0: plotLayoutXaxisTick0,
      tickformat: plotLayoutXaxisTickFormat,
      tickprefix: plotLayoutXaxisTickPrefix,
      ticksuffix: plotLayoutXaxisTickSuffix,
      title: {
        text: plotLayoutXaxisTitle,
        standoff: plotLayoutXaxisTitleStandoff,
        font: {
          size: plotLayoutXaxisTitleFontSize
        }
      }
    },
    yaxis: {
      automargin: plotLayoutYaxisAutoMargin,
      autorange: plotLayoutYaxisAutorange,
      type: plotLayoutYaxisType,
      tickangle: plotLayoutYaxisTickAngle,
      tick0: plotLayoutYaxisTick0,
      tickformat: plotLayoutYaxisTickFormat,
      tickprefix: plotLayoutYaxisTickPrefix,
      ticksuffix: plotLayoutYaxisTickSuffix,
      title: {
        text: plotLayoutYaxisTitle,
        standoff: plotLayoutYaxisTitleStandoff,
        font: {
          size: plotLayoutYaxisTitleFontSize
        }
      }
    },
    showlegend: plotLegend,
    annotations: [plotAnnotation]
  };

  return newPlotLayout;
};

const getTraceFillColor = (targetPlot, catcode, unique) => {
  let barColorIndex = 12;
  let barColor = histColors[barColorIndex];

  if (targetPlot === 'maltreatment') {
    const indexKey = categoryCodes.indexOf(catcode);
    barColor = plotColors[indexKey];
    return barColor;
  }

  if (targetPlot === 'observed') {
    barColorIndex = 1;
    if (unique) {
      barColorIndex = 10;
    }
  }

  if (targetPlot === 'predictive') {
    barColorIndex = 8;
    if (unique) {
      barColorIndex = 6;
    }
  }

  barColor = histColors[barColorIndex];
  return barColor;
};

const getBarTrace = (
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

/**
 *
 * @param {*} typesDataArray
 * @returns
 */

const getPlotDataBars = (targetPlotType, typesDataArray, plotOrientation) => {
  const newPlotData = [];

  for (let i = 0; i < typesDataArray.length; i += 1) {
    const yData = typesDataArray[i].value;
    const xData = typesDataArray[i].code;
    const tName = typesDataArray[i].name;
    const isHighlighted = typesDataArray[i].highlight;

    const traceFillColor = getTraceFillColor(
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

export { plotColors, histColors, plotConfig, getPlotLayout, getPlotDataBars };
