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
  plotTraceBaseTemplate
} from '../shared/plotUtils'; // getPlotLayout

function ObservedFeaturesPlotRefactor({
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
        <div className="observed-features-plot-chart-body">
          <div className="observed-features-plot-chart-body-plot">
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
        <div className="observed-features-plot-chart-footer">
          <span className="observed-features-plot-chart-summary">
            This chart was generated using data for{' '}
            <span className="observed-features-plot-selected-type">
              {selectedGeographicFeatureName} {geographyObservedFeatures}
              {/* (code{' '}{selectedGeographicFeatureObservedFeatures}) */}
            </span>{' '}
            based on the{' '}
            <span className="observed-features-plot-selected-type-value">
              2011-2019 US Census Data
            </span>{' '}
            for{' '}
            <span className="observed-features-plot-selected-type-summary">
              {observedFeaturesLabel}
            </span>
          </span>
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
    const minSubplot = plotDataXRange[0];
    const maxSubplot = plotDataXRange[1];
    const subplotRange = [minSubplot, maxSubplot];
    // console.log(subplotRange);

    /**

    // // const plotDataYRange = newObservedFeaturesPlotData.fig_aes.yrange;
    // const plotDataGeotype = newObservedFeaturesPlotData.fig_aes.geotype;

    // let plotDataLabelXUnits = '';
    // if (plotDataGeotype === 'county') {
    //   plotDataLabelXUnits = 'Number of Counties';
    // }
    // if (plotDataGeotype === 'tract') {
    //   plotDataLabelXUnits = 'Number of Census Tracts';
    // }

    // const plotDataLabelYUnits = newObservedFeaturesPlotData.fig_aes.label_units;
    // const plotDataBarLabels = newObservedFeaturesPlotData.fig_aes.bar_labels;
    // // const plotDataBarCenters = newObservedFeaturesPlotData.fig_aes.bar_centers;
    // const PlotDataYears = newObservedFeaturesPlotData.years;

    // const plotTitle = 'Demographics';
    // const plotOrientation = 'v';
    // const showPlotLegend = true;
    // const plotXDataLabel = ''; // plotDataLabelXUnits
    // let plotYDataLabel = plotDataLabelYUnits;

    // let plotXDataAxisType = 'linear';
    // const plotYDataAxisType = 'category';

    // if (geography === 'cbsa') {
    //   plotXDataAxisType = 'log';
    //   plotYDataLabel = 'Core Base Statistical Areas';
    // }

    // const traceMarkerTypes = ['scatter', 'bar', 'histogram', 'marker'];
    // const traceType = traceMarkerTypes[1];
    // const markerOpacity = 0.8;

    **/

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
      plotYAxisAnchorValue
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
        yaxis: plotYAxisAnchorValue
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
      plotYAxisAnchorValue
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
        yaxis: plotYAxisAnchorValue
      };

      return plotLineObject;
    };

    const prepPlotData = (targetName, inputData) => {
      // console.log(inputData);

      const plotBarCenters = inputData.fig_aes.bar_centers;
      const plotDataArray = [];

      // Object.values(inputData).forEach((inputValue, inputValueIndex) => {
      //   console.log(`${inputValueIndex}:`, inputValue);
      //   const figureAesthetics = inputValue.fig_aes;
      //   const yearsDataArray = inputValue.years;
      //   console.log(figureAesthetics);
      //   console.log(yearsDataArray);
      // });

      // Object.values(yearsData).forEach((targetValue, targetIndex) => {
      //   console.log(`${targetIndex}:`, targetValue);

      //   // Recurse to build individual year traces.
      //   Object.values(yearsData).forEach((value, index) => {
      //     console.log(`${index}:`, value);
      //   });
      // });

      Object.entries(inputData).forEach(([key, value], index) => {
        // console.log(`${index}, ${key}:`, value);

        if (key === 'fig_aes') {
          // console.log('key is fig_aes');
        }
        if (key === 'years') {
          // console.log('key is years');

          Object.entries(inputData[key]).forEach(
            ([yearKey, yearValue], yearIndex) => {
              const plotTraceIndex = yearIndex + 1;
              const plotMarkerColor = histColors[yearIndex];
              const plotMarkerOpacity = 0.8;
              const plotMarkerOrientation = 'h';

              const plotLineColorMean = '#ff0000';
              const plotLineColorMedian = '#00ff00';
              const plotLineColorFocalValue = '#0000ff';

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
              const plotLineWidth = 3;

              const plotDisplayLegend = false;

              const traceMarkerTypes = [
                'scatter',
                'bar',
                'histogram',
                'marker'
              ];

              const plotXDataArray = yearValue.bars;
              const plotXAxisAnchor = `x${String(plotTraceIndex)}`;
              const plotYDataArray = subplotRange; // [minVal, maxVal]
              const plotYAxisAnchor = `y${plotTraceIndex}`;

              // Generate traces.
              const plotYearBarMarker = generatePlotBar(
                plotMarkerColor,
                plotMarkerOpacity,
                plotMarkerOrientation,
                plotDisplayLegend,
                traceMarkerTypes[1],
                plotXDataArray,
                plotXAxisAnchor,
                plotBarCenters,
                plotYAxisAnchor
              );
              const plotYearLineMean = generatePlotLine(
                plotLineColorMean,
                plotLineTypeMean,
                plotLineWidth,
                'lines',
                'Mean',
                plotDisplayLegend,
                traceMarkerTypes[0],
                plotXDataArray,
                plotXAxisAnchor,
                plotYDataArray,
                plotYAxisAnchor
              );
              const plotYearLineMedian = generatePlotLine(
                plotLineColorMedian,
                plotLineTypeMedian,
                plotLineWidth,
                'lines',
                'Median',
                plotDisplayLegend,
                traceMarkerTypes[0],
                plotXDataArray,
                plotXAxisAnchor,
                plotYDataArray,
                plotYAxisAnchor
              );

              const plotYearLineFocalValue = generatePlotLine(
                plotLineColorFocalValue,
                plotLineTypeFocalValue,
                plotLineWidth,
                'lines',
                targetName,
                plotDisplayLegend,
                traceMarkerTypes[0],
                plotXDataArray,
                plotXAxisAnchor,
                plotYDataArray,
                plotYAxisAnchor
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

      // console.log(plotDataArray);
      return plotDataArray;
    };

    /**
     * TODO: Recreate the hardcoded layout.
     */

    const observedFeaturesAnnotations = [
      {
        font: { size: 16 },
        showarrow: false,
        text: '2011',
        x: 0.04567901234567901,
        xanchor: 'center',
        xref: 'paper',
        y: 1,
        yanchor: 'bottom',
        yref: 'paper'
      },
      {
        font: { size: 16 },
        showarrow: false,
        text: '2012',
        x: 0.15925925925925927,
        xanchor: 'center',
        xref: 'paper',
        y: 1,
        yanchor: 'bottom',
        yref: 'paper'
      },
      {
        font: { size: 16 },
        showarrow: false,
        text: '2013',
        x: 0.27283950617283953,
        xanchor: 'center',
        xref: 'paper',
        y: 1,
        yanchor: 'bottom',
        yref: 'paper'
      },
      {
        font: { size: 16 },
        showarrow: false,
        text: '2014',
        x: 0.38641975308641974,
        xanchor: 'center',
        xref: 'paper',
        y: 1,
        yanchor: 'bottom',
        yref: 'paper'
      },
      {
        font: { size: 16 },
        showarrow: false,
        text: '2015',
        x: 0.5,
        xanchor: 'center',
        xref: 'paper',
        y: 1,
        yanchor: 'bottom',
        yref: 'paper'
      },
      {
        font: { size: 16 },
        showarrow: false,
        text: '2016',
        x: 0.6135802469135803,
        xanchor: 'center',
        xref: 'paper',
        y: 1,
        yanchor: 'bottom',
        yref: 'paper'
      },
      {
        font: { size: 16 },
        showarrow: false,
        text: '2017',
        x: 0.7271604938271605,
        xanchor: 'center',
        xref: 'paper',
        y: 1,
        yanchor: 'bottom',
        yref: 'paper'
      },
      {
        font: { size: 16 },
        showarrow: false,
        text: '2018',
        x: 0.8407407407407408,
        xanchor: 'center',
        xref: 'paper',
        y: 1,
        yanchor: 'bottom',
        yref: 'paper'
      },
      {
        font: { size: 16 },
        showarrow: false,
        text: '2019',
        x: 0.954320987654321,
        xanchor: 'center',
        xref: 'paper',
        y: 1,
        yanchor: 'bottom',
        yref: 'paper'
      },
      {
        font: { size: 16 },
        showarrow: false,
        text: 'Number of counties',
        x: 0.5,
        xanchor: 'center',
        xref: 'paper',
        y: 0,
        yanchor: 'top',
        yref: 'paper',
        yshift: -30
      }
    ];

    const bargap = 0;

    const getPlotLayoutRefactor = bargapValue => {
      const plotLayoutObject = {
        annotations: observedFeaturesAnnotations,
        bargap: bargapValue,
        template: plotTraceBaseTemplate,
        xaxis: {},
        xaxis2: {},
        xaxis3: {},
        xaxis4: {},
        xaxis5: {},
        xaxis6: {},
        xaxis7: {},
        xaxis8: {},
        xaxis9: {},
        yaxis: {},
        yaxis2: {},
        yaxis3: {},
        yaxis4: {},
        yaxis5: {},
        yaxis6: {},
        yaxis7: {},
        yaxis8: {},
        yaxis9: {}
      };
      // console.log(plotLayoutObject);

      return plotLayoutObject;
    };

    const selectedRegion = getFipsIdName(selectedGeographicFeature);
    const plotDataRefactor = prepPlotData(selectedRegion, rawData);

    const plotLayoutRefactor = getPlotLayoutRefactor(bargap);

    const plotStateRefactor = {
      data: plotDataRefactor,
      layout: plotLayoutRefactor,
      config: plotConfig,
      raw: newObservedFeaturesPlotData
    };

    const observedFeaturesPlotData = {
      observedFeaturesPlotState: plotStateRefactor
    };

    // console.log(observedFeaturesPlotData);
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

ObservedFeaturesPlotRefactor.propTypes = {
  mapType: PropTypes.string.isRequired,
  geography: PropTypes.string.isRequired,
  observedFeature: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  selectedGeographicFeature: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired,
  showRate: PropTypes.bool.isRequired
};

ObservedFeaturesPlotRefactor.defaultProps = {};

export default ObservedFeaturesPlotRefactor;
