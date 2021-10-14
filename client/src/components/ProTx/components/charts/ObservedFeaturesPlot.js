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
import DebugPlot from './DebugPlot';

function ObservedFeaturesPlot({
  mapType,
  geography,
  observedFeature,
  year,
  selectedGeographicFeature,
  data,
  showRate,
  debug
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

    return (
      <div className="observed-features-plot-layout">
        <div className="observed-features-plot-header">
          <div className="observed-features-plot-info">
            <div className="observed-features-plot-info-item">
              <div className="observed-features-plot-selected-region">
                <span className="observed-features-plot-selected-region-label">
                  {geographyType}
                </span>
                <span className="observed-features-plot-selected-region-value">
                  {selectedGeographicFeatureName}
                </span>
                <span className="observed-features-plot-selected-region-code">
                  ({selectedGeographicFeatureObservedFeatures})
                </span>
              </div>
              <div className="observed-features-plot-aggregated-count">
                <span className="observed-features-plot-aggregated-count-label">
                  Total
                </span>
                <span className="observed-features-plot-aggregated-count-value">
                  {observedFeatureTotalCount}
                </span>
              </div>
            </div>
          </div>
          <div className="observed-features-plot-info">
            <div className="observed-features-plot-selected-feature">
              <span className="observed-features-plot-selected-feature-label">
                Feature
              </span>
              <span className="observed-features-plot-selected-feature-value">
                {observedFeaturesLabel}
              </span>
            </div>
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

    const gridLayouts = [
      [1, 9],
      [3, 3]
    ];
    const selectedGridLayout = 0;
    const subplotRows = gridLayouts[selectedGridLayout][0];
    const subPlotCols = gridLayouts[selectedGridLayout][1];

    const plotSubplotGrids = {
      grid: { rows: subplotRows, columns: subPlotCols, pattern: 'independent' }
    };

    const subplotBarLayout = {
      barmode: 'group',
      bargap: 0.02,
      bargroupgap: 0
    };

    const layoutColors = {
      paper_bgcolor: 'rgba(0,0,0,0)',
      plot_bgcolor: 'rgba(0,0,0,0)'
    };

    const basePlotLayout = getPlotLayout(
      plotTitle,
      plotOrientation,
      showPlotLegend,
      plotXDataLabel,
      plotXDataAxisType,
      plotYDataLabel,
      plotYDataAxisType
    );

    const baseTrace = {
      name: 'trace name',
      y: plotDataBarLabels,
      x: PlotDataYears[2011].bars,
      xaxis: {
        anchor: 'x',
        title: '',
        ticks: ''
        // autotick: true,
        // autorange: true,
        // showticklabels: false,
        // visible: false,
        // zeroline: false,
        // showline: false,
        // showgrid: false
      },
      yaxis: {
        anchor: 'y',
        title: '',
        ticks: ''
        // autotick: true,
        // autorange: true,
        // showticklabels: false,
        // visible: false,
        // zeroline: false,
        // showline: false,
        // showgrid: false
      },
      type: traceType,
      orientation: 'h',
      opacity: markerOpacity,
      marker: {
        color: histColors[0]
      }
    };

    const trace1Conf = {
      name: '2011',
      x: PlotDataYears[2011].bars,
      xaxis: 'x1',
      yaxis: 'y1',
      marker: {
        color: histColors[0]
      }
    };

    const trace2Conf = {
      name: '2012',
      x: PlotDataYears[2012].bars,
      xaxis: 'x2',
      yaxis: 'y2',
      marker: {
        color: histColors[1]
      }
    };

    const trace3Conf = {
      name: '2013',
      x: PlotDataYears[2013].bars,
      xaxis: 'x3',
      yaxis: 'y3',
      marker: {
        color: histColors[2]
      }
    };

    const trace4Conf = {
      name: '2014',
      x: PlotDataYears[2014].bars,
      xaxis: 'x4',
      yaxis: 'y4',
      marker: {
        color: histColors[3]
      }
    };

    const trace5Conf = {
      name: '2015',
      x: PlotDataYears[2015].bars,
      xaxis: 'x5',
      yaxis: 'y5',
      marker: {
        color: histColors[4]
      }
    };

    const trace6Conf = {
      name: '2016',
      x: PlotDataYears[2016].bars,
      xaxis: 'x6',
      yaxis: 'y6',
      marker: {
        color: histColors[5]
      }
    };

    const trace7Conf = {
      name: '2017',
      x: PlotDataYears[2017].bars,
      xaxis: 'x7',
      yaxis: 'y7',
      marker: {
        color: histColors[6]
      }
    };

    const trace8Conf = {
      name: '2018',
      x: PlotDataYears[2018].bars,
      xaxis: 'x8',
      yaxis: 'y8',
      marker: {
        color: histColors[7]
      }
    };

    const trace9Conf = {
      name: '2019',
      x: PlotDataYears[2019].bars,
      xaxis: 'x9',
      yaxis: 'y9',
      marker: {
        color: histColors[8]
      }
    };

    const trace1 = {
      ...baseTrace,
      ...trace1Conf
    };

    const trace2 = {
      ...baseTrace,
      ...trace2Conf
    };

    const trace3 = {
      ...baseTrace,
      ...trace3Conf
    };

    const trace4 = {
      ...baseTrace,
      ...trace4Conf
    };

    const trace5 = {
      ...baseTrace,
      ...trace5Conf
    };

    const trace6 = {
      ...baseTrace,
      ...trace6Conf
    };

    const trace7 = {
      ...baseTrace,
      ...trace7Conf
    };

    const trace8 = {
      ...baseTrace,
      ...trace8Conf
    };

    const trace9 = {
      ...baseTrace,
      ...trace9Conf
    };

    /**
     * TODO: Render the MEAN, MEDIAN and FOCAL_VALUE on each year's subplot.
     * TODO: Render only one legend entry for MEAN, MEDIAN, FOCAL_VALUE traces.
     * TODO: Add colors to support proper trace rendering for lines.
     */

    const meanTraceType = traceMarkerTypes[0];

    const baseMeanTraceStyle = {
      opacity: 0.7
    };

    const baseMeanTrace = {
      x: [minSubplot, maxSubplot],
      type: meanTraceType,
      xaxis: {
        anchor: 'x',
        title: '',
        ticks: ''
        // autotick: true,
        // autorange: true,
        // showticklabels: false,
        // visible: false,
        // zeroline: false,
        // showline: false,
        // showgrid: false
      },
      yaxis: {
        anchor: 'y',
        title: '',
        ticks: ''
        // autotick: true,
        // autorange: true,
        // showticklabels: false,
        // visible: false,
        // zeroline: false,
        // showline: false,
        // showgrid: false
      }
    };

    const roundingAmount = 3;
    const trace1MeanConfY = PlotDataYears[2011].mean.toFixed(roundingAmount);
    const trace2MeanConfY = PlotDataYears[2012].mean.toFixed(roundingAmount);
    const trace3MeanConfY = PlotDataYears[2013].mean.toFixed(roundingAmount);
    const trace4MeanConfY = PlotDataYears[2014].mean.toFixed(roundingAmount);
    const trace5MeanConfY = PlotDataYears[2015].mean.toFixed(roundingAmount);
    const trace6MeanConfY = PlotDataYears[2016].mean.toFixed(roundingAmount);
    const trace7MeanConfY = PlotDataYears[2017].mean.toFixed(roundingAmount);
    const trace8MeanConfY = PlotDataYears[2018].mean.toFixed(roundingAmount);
    const trace9MeanConfY = PlotDataYears[2019].mean.toFixed(roundingAmount);

    const trace1MeanConf = {
      name: '2011 Mean',
      y: [trace1MeanConfY, trace1MeanConfY],
      xaxis: { anchor: 'x1' },
      yaxis: { anchor: 'y1' },
      layout: {
        col: 1,
        row: 1
      }
    };

    const trace2MeanConf = {
      name: '2012 Mean',
      y: [trace2MeanConfY, trace2MeanConfY],
      xaxis: { anchor: 'x2' },
      yaxis: { anchor: 'y2' },
      layout: {
        col: 2,
        row: 1
      }
    };

    const trace3MeanConf = {
      name: '2013 Mean',
      y: [trace3MeanConfY, trace3MeanConfY],
      xaxis: { anchor: 'x3' },
      yaxis: { anchor: 'y3' }
    };

    const trace4MeanConf = {
      name: '2014 Mean',
      y: [trace4MeanConfY, trace4MeanConfY],
      xaxis: { anchor: 'x4' },
      yaxis: { anchor: 'y4' }
    };

    const trace5MeanConf = {
      name: '2015 Mean',
      y: [trace5MeanConfY, trace5MeanConfY],
      xaxis: { anchor: 'x5' },
      yaxis: { anchor: 'y5' }
    };

    const trace6MeanConf = {
      name: '2016 Mean',
      y: [trace6MeanConfY, trace6MeanConfY],
      xaxis: { anchor: 'x6' },
      yaxis: { anchor: 'y6' }
    };

    const trace7MeanConf = {
      name: '2017 Mean',
      y: [trace7MeanConfY, trace7MeanConfY],
      xaxis: { anchor: 'x7' },
      yaxis: { anchor: 'y7' }
    };

    const trace8MeanConf = {
      name: '2018 Mean',
      y: [trace8MeanConfY, trace8MeanConfY],
      xaxis: { anchor: 'x8' },
      yaxis: { anchor: 'y8' }
    };

    const trace9MeanConf = {
      name: '2019 Mean',
      y: [trace9MeanConfY, trace9MeanConfY],
      xaxis: { anchor: 'x9' },
      yaxis: { anchor: 'y9' }
    };

    const trace1Mean = {
      ...baseMeanTrace,
      ...baseMeanTraceStyle,
      ...trace1MeanConf
    };

    const trace2Mean = {
      ...baseMeanTrace,
      ...baseMeanTraceStyle,
      ...trace2MeanConf
    };

    const trace3Mean = {
      ...baseMeanTrace,
      ...baseMeanTraceStyle,
      ...trace3MeanConf
    };

    const trace4Mean = {
      ...baseMeanTrace,
      ...baseMeanTraceStyle,
      ...trace4MeanConf
    };

    const trace5Mean = {
      ...baseMeanTrace,
      ...baseMeanTraceStyle,
      ...trace5MeanConf
    };

    const trace6Mean = {
      ...baseMeanTrace,
      ...baseMeanTraceStyle,
      ...trace6MeanConf
    };

    const trace7Mean = {
      ...baseMeanTrace,
      ...baseMeanTraceStyle,
      ...trace7MeanConf
    };

    const trace8Mean = {
      ...baseMeanTrace,
      ...baseMeanTraceStyle,
      ...trace8MeanConf
    };

    const trace9Mean = {
      ...baseMeanTrace,
      ...baseMeanTraceStyle,
      ...trace9MeanConf
    };

    const observedFeaturesDataObject = [
      trace1,
      // trace1Mean,
      trace2,
      // trace2Mean,
      trace3,
      // trace3Mean,
      trace4,
      // trace4Mean,
      trace5,
      // trace5Mean,
      trace6,
      // trace6Mean,
      trace7,
      // trace7Mean,
      trace8,
      // trace8Mean,
      trace9
      // trace9Mean
    ];

    const traceDomainRangeMappingBase = {
      x1: {
        range: subplotRange
      },
      y1: { anchor: 'x1' },
      x2: {
        range: subplotRange
      },
      y2: { anchor: 'x1' },
      x3: {
        range: subplotRange
      },
      y3: { anchor: 'x1' },
      x4: {
        range: subplotRange
      },
      y4: { anchor: 'x1' },
      x5: {
        range: subplotRange
      },
      y5: { anchor: 'x1' },
      x6: {
        range: subplotRange
      },
      y6: { anchor: 'x1' },
      x7: {
        range: subplotRange
      },
      y7: { anchor: 'x1' },
      x8: {
        range: subplotRange
      },
      y8: { anchor: 'x1' },
      x9: {
        range: subplotRange
      },
      y9: { anchor: 'x1' }
    };

    const gridLayout0Title = {
      xaxis5: {
        title: plotDataLabelXUnits // Label "centers" on subplots in 1x9 grid.
      }
    };

    const gridLayout1Title = {
      xaxis8: {
        title: plotDataLabelXUnits // Label "centers" on subplots in 3x3 grid.
      }
    };

    let traceDomainRangeMapping;

    if (selectedGridLayout === 0) {
      traceDomainRangeMapping = {
        ...traceDomainRangeMappingBase,
        ...gridLayout0Title
      };
    }

    if (selectedGridLayout === 1) {
      traceDomainRangeMapping = {
        ...traceDomainRangeMappingBase,
        ...gridLayout1Title
      };
    }

    const plotLayout = {
      ...basePlotLayout,
      ...plotSubplotGrids,
      ...subplotBarLayout,
      ...traceDomainRangeMapping,
      ...layoutColors
    };

    const plotData = observedFeaturesDataObject;

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

  const fipsIdValue = getFipsIdName(selectedGeographicFeature);
  const geoId = `${selectedGeographicFeature}:${fipsIdValue}`;

  if (debug) {
    return (
      <DebugPlot
        className="plot-debug"
        mapType={mapType}
        geography={geography}
        observedFeature={observedFeature}
        year={year}
        selectedGeographicFeature={selectedGeographicFeature}
        fipsIdValue={fipsIdValue}
        geoId={geoId}
        plotType="observedFeatures"
        plotData={observedFeaturesPlotData}
        data={data}
      />
    );
  }

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
  showRate: PropTypes.bool.isRequired,
  /** Render component data in debug mode. */
  debug: PropTypes.bool
};

ObservedFeaturesPlot.defaultProps = {
  debug: false
};

export default ObservedFeaturesPlot;
