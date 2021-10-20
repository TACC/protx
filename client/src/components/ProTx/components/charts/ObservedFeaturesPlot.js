import React from 'react';
import PropTypes from 'prop-types';
import Plot from 'react-plotly.js';
import { useSelector } from 'react-redux';
import { LoadingSpinner } from '_common';
import {
  getFipsIdName,
  capitalizeString,
  cleanValue,
  getObservedFeaturesLabel,
  getObservedFeatureValue
} from '../shared/dataUtils';
import './ObservedFeaturesPlot.css';
import {
  histColors,
  plotConfig,
  plotTraceBaseTemplate,
  hoverTemplate
} from '../shared/plotUtils';

function ObservedFeaturesPlot({
  mapType,
  geography,
  observedFeature,
  year,
  selectedGeographicFeature,
  data,
  showRate
}) {
  const protxDemographicsDistribution = useSelector(
    state => state.protxDemographicsDistribution
  );

  if (protxDemographicsDistribution.error) {
    return (
      <div className="data-error-message">
        There was a problem loading the data.
      </div>
    );
  }

  if (protxDemographicsDistribution.loading) {
    return (
      <div className="loading-spinner">
        <LoadingSpinner />
      </div>
    );
  }

  const observedFeaturesLabel = getObservedFeaturesLabel(observedFeature, data);

  const getObservedFeaturesChartLayout = (
    mapTypeObservedFeatures,
    geographyObservedFeatures,
    yearObservedFeatures,
    observedFeatureObservedFeatures,
    selectedGeographicFeatureObservedFeatures,
    plotStateObservedFeatures
  ) => {
    const selectedGeographicFeatureName = getFipsIdName(
      selectedGeographicFeatureObservedFeatures
    );
    const geographyType = capitalizeString(geographyObservedFeatures);
    const currentTargetValue = getObservedFeatureValue(
      data,
      geography,
      year,
      selectedGeographicFeature,
      observedFeature,
      showRate
    );
    const observedFeatureTotalCount = cleanValue(currentTargetValue);

    let featureTotalUnit = 'Total';
    if (showRate) {
      featureTotalUnit = '';
    }

    return (
      <div className="observed-features-plot-layout">
        <div className="observed-features-plot-info">
          <div className="observed-features-plot-info-region">
            <div className="observed-features-plot-selected-region">
              <span className="observed-features-plot-selected-region-label">
                FIPS: {selectedGeographicFeatureObservedFeatures}
              </span>
              <span className="observed-features-plot-selected-region-value">
                {selectedGeographicFeatureName} {geographyType}
              </span>
            </div>
            <div className="observed-features-plot-aggregated-count">
              <span className="observed-features-plot-aggregated-count-value">
                {observedFeatureTotalCount}
              </span>
              <span className="observed-features-plot-aggregated-count-label">
                {featureTotalUnit}
              </span>
            </div>
          </div>
        </div>
        <div className="observed-features-plot-selected">
          <div className="observed-features-plot-selected-feature">
            <span className="observed-features-plot-selected-feature-label">
              Selected Feature:
            </span>
            <span className="observed-features-plot-selected-feature-value">
              {observedFeaturesLabel}
            </span>
          </div>
        </div>
        <div className="observed-features-plot-info-summary">
          This chart was generated using data for{' '}
          <span className="observed-features-plot-selected-type">
            {selectedGeographicFeatureName} {geographyObservedFeatures}
          </span>{' '}
          based on the{' '}
          <span className="observed-features-plot-selected-type-value">
            2011-2019 US Census Data
          </span>{' '}
          for{' '}
          <span className="observed-features-plot-selected-type-summary">
            {observedFeaturesLabel}
          </span>
        </div>
        <div className="observed-features-plot-chart">
          <Plot
            divId="observed-features-plot"
            className="observed-features-plot"
            data={plotStateObservedFeatures.data}
            layout={plotStateObservedFeatures.layout}
            config={plotStateObservedFeatures.config}
            useResizeHandler
          />
        </div>
      </div>
    );
  };

  const prepObservedFeaturesPlotData = (
    selectedGeographicFeaturePrep,
    observedFeaturePrep,
    dataPrep,
    geographyPrep,
    yearPrep,
    showRatePrep,
    dataHistogram
  ) => {
    const newObservedFeaturesPlotData = dataHistogram;

    // eslint-disable-next-line no-restricted-syntax
    for (const [iYear, yearData] of Object.entries(dataHistogram.years)) {
      yearData.focal_value = getObservedFeatureValue(
        dataPrep,
        geographyPrep,
        iYear,
        selectedGeographicFeaturePrep,
        observedFeaturePrep,
        showRatePrep
      );
    }

    const plotDataXRange = newObservedFeaturesPlotData.fig_aes.xrange;
    const plotDataYRange = newObservedFeaturesPlotData.fig_aes.yrange;
    const rawData = protxDemographicsDistribution.data;

    const generatePlotBar = (
      plotMarkerColor,
      plotMarkerOpacity,
      plotMarkerOrientation,
      plotLegendVisible,
      plotType,
      plotXDataArray,
      plotXAxisAnchorValue,
      plotYDataArray,
      plotYAxisAnchorValue,
      plotHoverTemplateLayout
    ) => {
      const plotBarObject = {
        marker: { color: plotMarkerColor },
        opacity: plotMarkerOpacity,
        orientation: plotMarkerOrientation,
        showlegend: plotLegendVisible,
        type: plotType,
        x: plotXDataArray,
        xaxis: plotXAxisAnchorValue,
        y: plotYDataArray,
        yaxis: plotYAxisAnchorValue,
        hovertemplate: plotHoverTemplateLayout
      };

      return plotBarObject;
    };

    const generatePlotLine = (
      plotLineColor,
      plotLineType,
      plotLineWidth,
      plotTypeLineMode,
      plotNameLegend,
      plotLegendVisible,
      plotTypeLine,
      plotXDataArray,
      plotXAxisAnchorValue,
      plotYDataArray,
      plotYAxisAnchorValue,
      plotHoverTemplateLayout
    ) => {
      const plotLineObject = {
        line: {
          color: plotLineColor,
          dash: plotLineType,
          width: plotLineWidth
        },
        mode: plotTypeLineMode,
        name: plotNameLegend,
        showlegend: plotLegendVisible,
        type: plotTypeLine,
        x: plotXDataArray,
        xaxis: plotXAxisAnchorValue,
        y: plotYDataArray,
        yaxis: plotYAxisAnchorValue,
        hovertemplate: plotHoverTemplateLayout
      };

      return plotLineObject;
    };

    const prepPlotData = (targetName, inputData) => {
      const plotBarCenters = inputData.fig_aes.bar_centers;
      const plotXRange = inputData.fig_aes.xrange;
      // const plotYRange = inputData.fig_aes.yrange;
      const plotDataArray = [];

      Object.entries(inputData).forEach(([key, value], index) => {
        if (key === 'years') {
          Object.entries(inputData[key]).forEach(
            ([yearKey, yearValue], yearIndex) => {
              const plotTraceIndex = yearIndex + 1;
              const plotMarkerColor = histColors[yearIndex];
              const plotMarkerOpacity = 1.0;
              const plotMarkerOrientation = 'h';

              const plotLineDashStyle = [
                'solid',
                'dot',
                'dash',
                'longdash',
                'dashdot',
                'longdashdot',
                '5px,10px,2px,2px'
              ];

              const plotLineTypeMean = plotLineDashStyle[2];
              const plotLineTypeMedian = plotLineDashStyle[1];
              const plotLineTypeFocalValue = plotLineDashStyle[0];
              const plotLineWidth = 2;

              // '#7b2cbf' '#118ab2' '#06d6a0' '#ffd166' '#ff8500' '#ff6b6b' '#081c15'
              const plotLineColorMean = '#ff6b6b';
              const plotLineColorMedian = '#ffd166';
              const plotLineColorFocalValue = '#06d6a0';

              let plotDisplayLegend = false;
              if (yearIndex === 0) {
                plotDisplayLegend = true;
              }

              const traceMarkerTypes = [
                'scatter',
                'bar',
                'histogram',
                'marker'
              ];

              const plotXDataBars = yearValue.bars;
              const plotXDataLines = plotXRange;
              const plotXAxisAnchor = `x${String(plotTraceIndex)}`;
              const plotYDataBars = plotBarCenters;
              const plotMean = yearValue.mean;
              const plotMode = yearValue.median;
              const plotFocalValue = yearValue.focal_value;
              const plotYAxisAnchor = `y${plotTraceIndex}`;
              const plotHoverTemplate = ''; // hoverTemplate;

              const plotYDataLines = [
                [plotMean, plotMean],
                [plotMode, plotMode],
                [plotFocalValue, plotFocalValue]
              ];

              // Generate traces.
              const plotYearBarMarker = generatePlotBar(
                plotMarkerColor,
                plotMarkerOpacity,
                plotMarkerOrientation,
                false, // plotDisplayLegend,
                traceMarkerTypes[1],
                plotXDataBars,
                plotXAxisAnchor,
                plotYDataBars,
                plotYAxisAnchor,
                plotHoverTemplate
              );
              const plotYearLineMean = generatePlotLine(
                plotLineColorMean,
                plotLineTypeMean,
                plotLineWidth,
                'lines',
                'Mean',
                plotDisplayLegend,
                traceMarkerTypes[0],
                plotXDataLines,
                plotXAxisAnchor,
                plotYDataLines[0],
                plotYAxisAnchor,
                plotHoverTemplate
              );
              const plotYearLineMedian = generatePlotLine(
                plotLineColorMedian,
                plotLineTypeMedian,
                plotLineWidth,
                'lines',
                'Median',
                plotDisplayLegend,
                traceMarkerTypes[0],
                plotXDataLines,
                plotXAxisAnchor,
                plotYDataLines[1],
                plotYAxisAnchor,
                plotHoverTemplate
              );

              const plotYearLineFocalValue = generatePlotLine(
                plotLineColorFocalValue,
                plotLineTypeFocalValue,
                plotLineWidth,
                'lines',
                targetName,
                plotDisplayLegend,
                traceMarkerTypes[0],
                plotXDataLines,
                plotXAxisAnchor,
                plotYDataLines[2],
                plotYAxisAnchor,
                plotHoverTemplate
              );

              plotDataArray.push(
                plotYearBarMarker,
                plotYearLineMean,
                plotYearLineMedian,
                plotYearLineFocalValue
              );
            }
          );
        }
      });

      return plotDataArray;
    };

    const annotationTitleFont = { size: 14 };

    const baseAnnotationObject = {
      font: annotationTitleFont,
      showarrow: false,
      text: '20##',
      x: 0,
      xanchor: 'center',
      xref: 'paper',
      y: 1,
      yanchor: 'bottom',
      yref: 'paper'
    };

    const annotation0 = {
      ...baseAnnotationObject,
      text: '2011',
      x: 0.04567901234567901
    };

    const annotation1 = {
      ...baseAnnotationObject,
      text: '2012',
      x: 0.15925925925925927
    };

    const annotation2 = {
      ...baseAnnotationObject,
      text: '2013',
      x: 0.27283950617283953
    };

    const annotation3 = {
      ...baseAnnotationObject,
      text: '2014',
      x: 0.38641975308641974
    };

    const annotation4 = {
      ...baseAnnotationObject,
      text: '2015',
      x: 0.5
    };

    const annotation5 = {
      ...baseAnnotationObject,
      text: '2016',
      x: 0.6135802469135803
    };

    const annotation6 = {
      ...baseAnnotationObject,
      text: '2017',
      x: 0.7271604938271605
    };

    const annotation7 = {
      ...baseAnnotationObject,
      text: '2018',
      x: 0.8407407407407408
    };

    const annotation8 = {
      ...baseAnnotationObject,
      text: '2019',
      x: 0.954320987654321
    };

    const annotationMain = {
      ...baseAnnotationObject,
      text: 'Number of counties',
      x: 0.5,
      y: 0,
      yanchor: 'top',
      yshift: -30
    };

    const observedFeaturesAnnotations = [
      annotation0,
      annotation1,
      annotation2,
      annotation3,
      annotation4,
      annotation5,
      annotation6,
      annotation7,
      annotation8,
      annotationMain
    ];

    let inputDomain = plotDataYRange;

    if (showRatePrep) {
      inputDomain = [0, 100];
    }

    const baseXAxisLayoutObject = {
      anchor: 'y',
      domain: inputDomain,
      range: plotDataXRange // newObservedFeaturesPlotData.fig_aes.xrange;
    };

    const xAxisLayoutRanges = [
      [0, 0.09135802469135802],
      [0.11358024691358025, 0.20493827160493827],
      [0.2271604938271605, 0.31851851851851853],
      [0.34074074074074073, 0.43209876543209874],
      [0.454320987654321, 0.5456790123456791],
      [0.5679012345679012, 0.6592592592592592],
      [0.6814814814814815, 0.7728395061728395],
      [0.7950617283950617, 0.8864197530864197],
      [0.908641975308642, 1]
    ];

    const xaxisLayout = {
      ...baseXAxisLayoutObject,
      domain: xAxisLayoutRanges[0]
    };

    const xaxis2Layout = {
      ...baseXAxisLayoutObject,
      domain: xAxisLayoutRanges[1]
    };

    const xaxis3Layout = {
      ...baseXAxisLayoutObject,
      domain: xAxisLayoutRanges[2]
    };

    const xaxis4Layout = {
      ...baseXAxisLayoutObject,
      domain: xAxisLayoutRanges[3]
    };

    const xaxis5Layout = {
      ...baseXAxisLayoutObject,
      domain: xAxisLayoutRanges[4]
    };

    const xaxis6Layout = {
      ...baseXAxisLayoutObject,
      domain: xAxisLayoutRanges[5]
    };

    const xaxis7Layout = {
      ...baseXAxisLayoutObject,
      domain: xAxisLayoutRanges[6]
    };

    const xaxis8Layout = {
      ...baseXAxisLayoutObject,
      domain: xAxisLayoutRanges[7]
    };

    const xaxis9Layout = {
      ...baseXAxisLayoutObject,
      domain: xAxisLayoutRanges[8]
    };

    const baseYAxisLayoutObject = {
      anchor: 'x',
      domain: [0, 1],
      range: [0, 100],
      visible: false
    };

    const yaxisLayout = {
      ...baseYAxisLayoutObject,
      ticktext: newObservedFeaturesPlotData.fig_aes.bar_labels,
      tickvals: newObservedFeaturesPlotData.fig_aes.bar_centers,
      title: observedFeaturesLabel,
      visible: true
    };

    const yaxis2Layout = {
      ...baseYAxisLayoutObject,
      anchor: 'x2'
    };

    const yaxis3Layout = {
      ...baseYAxisLayoutObject,
      anchor: 'x3'
    };

    const yaxis4Layout = {
      ...baseYAxisLayoutObject,
      anchor: 'x4'
    };

    const yaxis5Layout = {
      ...baseYAxisLayoutObject,
      anchor: 'x5'
    };

    const yaxis6Layout = {
      ...baseYAxisLayoutObject,
      anchor: 'x6'
    };

    const yaxis7Layout = {
      ...baseYAxisLayoutObject,
      anchor: 'x7'
    };

    const yaxis8Layout = {
      ...baseYAxisLayoutObject,
      anchor: 'x8'
    };

    const yaxis9Layout = {
      ...baseYAxisLayoutObject,
      anchor: 'x9'
    };

    const bargapWidth = 0;

    const plotLayout = {
      annotations: observedFeaturesAnnotations,
      bargap: bargapWidth,
      template: plotTraceBaseTemplate,
      xaxis: xaxisLayout,
      xaxis2: xaxis2Layout,
      xaxis3: xaxis3Layout,
      xaxis4: xaxis4Layout,
      xaxis5: xaxis5Layout,
      xaxis6: xaxis6Layout,
      xaxis7: xaxis7Layout,
      xaxis8: xaxis8Layout,
      xaxis9: xaxis9Layout,
      yaxis: yaxisLayout,
      yaxis2: yaxis2Layout,
      yaxis3: yaxis3Layout,
      yaxis4: yaxis4Layout,
      yaxis5: yaxis5Layout,
      yaxis6: yaxis6Layout,
      yaxis7: yaxis7Layout,
      yaxis8: yaxis8Layout,
      yaxis9: yaxis9Layout
    };

    const selectedRegion = getFipsIdName(selectedGeographicFeature);
    const plotData = prepPlotData(selectedRegion, rawData);

    const plotState = {
      data: plotData,
      layout: plotLayout,
      config: plotConfig,
      raw: newObservedFeaturesPlotData
    };

    const observedFeaturesPlotData = {
      observedFeaturesPlotState: plotState
    };
    console.log(observedFeaturesPlotData);

    return observedFeaturesPlotData;
  };

  const observedFeaturesPlotData = prepObservedFeaturesPlotData(
    selectedGeographicFeature,
    observedFeature,
    data,
    geography,
    year,
    showRate,
    protxDemographicsDistribution.data
  );

  const observedFeaturesChartLayout = getObservedFeaturesChartLayout(
    mapType,
    geography,
    year,
    observedFeature,
    selectedGeographicFeature,
    observedFeaturesPlotData.observedFeaturesPlotState,
    observedFeaturesPlotData.observedFeatureTargetValue
  );

  return (
    <div className="observed-features-plot">{observedFeaturesChartLayout}</div>
  );
}

ObservedFeaturesPlot.propTypes = {
  mapType: PropTypes.string.isRequired,
  geography: PropTypes.string.isRequired,
  observedFeature: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  selectedGeographicFeature: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired,
  showRate: PropTypes.bool.isRequired
};

ObservedFeaturesPlot.defaultProps = {};

export default ObservedFeaturesPlot;
