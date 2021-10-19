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
import { histColors, plotConfig, getPlotLayout } from '../shared/plotUtils';

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
    // const plotDataYRange = newObservedFeaturesPlotData.fig_aes.yrange;
    const plotDataGeotype = newObservedFeaturesPlotData.fig_aes.geotype;

    let plotDataLabelXUnits = '';
    if (plotDataGeotype === 'county') {
      plotDataLabelXUnits = 'Number of Counties';
    }
    if (plotDataGeotype === 'tract') {
      plotDataLabelXUnits = 'Number of Census Tracts';
    }

    const plotDataLabelYUnits = newObservedFeaturesPlotData.fig_aes.label_units;
    const plotDataBarLabels = newObservedFeaturesPlotData.fig_aes.bar_labels;
    // const plotDataBarCenters = newObservedFeaturesPlotData.fig_aes.bar_centers;
    const PlotDataYears = newObservedFeaturesPlotData.years;

    const plotTitle = 'Demographics';
    const plotOrientation = 'v';
    const showPlotLegend = true;
    const plotXDataLabel = ''; // plotDataLabelXUnits
    let plotYDataLabel = plotDataLabelYUnits;

    let plotXDataAxisType = 'linear';
    const plotYDataAxisType = 'category';

    if (geography === 'cbsa') {
      plotXDataAxisType = 'log';
      plotYDataLabel = 'Core Base Statistical Areas';
    }

    const traceMarkerTypes = ['scatter', 'bar', 'histogram', 'marker'];
    const traceType = traceMarkerTypes[1];
    const markerOpacity = 0.8;
    const minSubplot = plotDataXRange[0];
    const maxSubplot = plotDataXRange[1];
    const subplotRange = [minSubplot, maxSubplot];
    // console.log(subplotRange);

    /**
     * TODO: Recreate the hardcoded plot data.
     */

    // Iterate over data array.
    // Generate the following objects per year:
    // - Marker object for histogram bar
    // - Line object for Mean
    // - Line object for Mediam
    // - Line object for focal_value

    const rawData = protxDemographicsDistribution.data;

    // Variables used in iteration.
    // const isMarker; // true, false
    // const isLine; // mean, median, focal_value
    // const plotMarkerColor; // 'rgb(0,0,0)'
    // const plotMarkerOpacity;  // 1.0
    // const plotMarkerOrientation;  // 'h'
    // const plotLineColor; // 'rgb(0,0,0)'
    // const plotLineType; // 'dash', 'dot', 'solid'
    // const plotLineWidth;  // 3
    // const plotLegendVisible;  // true, false
    // const plotType; // 'bar', 'scatter'
    // const lpotXDataArray; // [0,1,2,3,4,5,6,7,8,9]
    // const plotXAxisAnchor; // 'x'
    // const plotYDataArray;   // [minVal, maxVal]
    // const plotYAxisAnchor;  // 'y'
    // const plotName;   // focal_value

    const generatePlotBar = () => {
      const plotBarObject = {
        // marker: { color: 'rgb(5.0, 200.0, 200.0)' },
        // opacity: 0.4,
        // orientation: 'h',
        // showlegend: false,
        // type: 'bar',
        // x: [13, 46, 100, 62, 18, 11, 3, 1, 0, 0],
        // xaxis: 'x',
        // y: [
        //   12232.77,
        //   16482.51,
        //   20732.25,
        //   24981.989999999998,
        //   29231.73,
        //   33481.47,
        //   37731.21,
        //   41980.95,
        //   46230.69,
        //   50480.43
        // ],
        // yaxis: 'y'
      };

      return plotBarObject;
    };

    const generatePlotLine = () => {
      const plotLineObject = {
        // line: { color: 'gray', dash: 'dot', width: 3 },
        // mode: 'lines',
        // name: 'median',
        // showlegend: true,
        // type: 'scatter',
        // x: [0, 115.50000000000001],
        // xaxis: 'x',
        // y: [21631.5, 21631.5],
        // yaxis: 'y'
      };

      return plotLineObject;
    };

    const prepPlotData = (targetName, inputData) => {
      console.log(targetName, inputData);
      const plotDataArray = [];

      // eslint-disable-next-line no-restricted-syntax
      for (const [index, [key, value]] of Object.entries(
        Object.entries(inputData.years)
      )) {
        // console.log(`${index}: ${key} = `, value);
        // console.log(histColors[index]);

        const plotYearBarMarker = generatePlotBar();
        const plotYearLineMean = generatePlotLine();
        const plotYearLineMedian = generatePlotLine();
        const plotYearLineFocalValue = generatePlotLine();

        plotDataArray.push(
          plotYearBarMarker,
          plotYearLineMean,
          plotYearLineMedian,
          plotYearLineFocalValue
        );
      }

      // console.log(plotDataArray);
      return plotDataArray;
    };

    /**
     * TODO: Recreate the hardcoded layout.
     */

    const bargapValue = 0;

    const plotLayoutRefactor = {
      annotations: [],
      bargap: bargapValue,
      template: {},
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

    const selectedRegion = getFipsIdName(selectedGeographicFeature);
    const plotDataRefactor = prepPlotData(selectedRegion, rawData);

    const plotStateRefactor = {
      data: plotDataRefactor,
      layout: plotLayoutRefactor,
      config: plotConfig,
      raw: newObservedFeaturesPlotData
    };

    const observedFeaturesPlotData = {
      // observedFeaturesPlotState: plotState
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
