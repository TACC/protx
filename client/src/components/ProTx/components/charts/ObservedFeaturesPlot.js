import React from 'react';
import PropTypes from 'prop-types';
import Plot from 'react-plotly.js';
import DebugPlot from './DebugPlot';
import './ObservedFeaturesPlot.css';

/**
 * TODO: Finish defining the method getObservedFeaturesNames() to return label value for a given feature code. Ideally iterate over an array so it can be used to get the values of the selected set of identifiers. Will require some additional work in the utils.js module as well.
 *
 * TODO: Finish defining the method getObservedFeaturesDataObject() to create the individual data elements used in the plot trace.
 *
 * TODO:  Finish defining the methods needed to marshall the data object for the plot.
 *
 * TODO: Verify that Debug still works correctly.
 *
 * TODO: Make sure arguments are in the correct order for all component signatures and methods!
 */

// Set this to true to inspect the component data in a tabular view.
const debugState = false;

function ObservedFeaturesPlot({
  mapType,
  geography,
  maltreatmentTypes,
  observedFeature,
  year,
  selectedGeographicFeature,
  data
}) {
  // Define Data Marshalling Methods.

  const getObservedFeaturesDataObject = () => {
    const newObservedFeaturesDataObject = [];
    return newObservedFeaturesDataObject;
  };

  // Variable Assignment Using Data Marshalling Methods.

  const observedFeaturesDataObject = getObservedFeaturesDataObject();

  // Define Plotting Helper Methods.

  const getBarVertTrace = (traceY, traceX, traceName, traceFillColor) => {
    return {
      y: [traceY],
      x: [traceX],
      name: traceName,
      type: 'bar',
      orientation: 'v',
      marker: {
        line: {
          color: ['#111111'],
          width: 1
        },
        color: [traceFillColor]
      }
    };
  };

  const getPlotDataVertBars = typesDataArray => {
    const newPlotData = [];
    for (let i = 0; i < typesDataArray.length; i += 1) {
      const yData = typesDataArray[i].value;
      const xData = typesDataArray[i].code;
      const tName = typesDataArray[i].name;
      const traceFillColor = plotCategoryColors[i];
      const type = getBarVertTrace(yData, xData, tName, traceFillColor);
      newPlotData.push(type);
    }
    return newPlotData;
  };

  // Assign Plot Variables.

  const plotCategoryColors = [
    '#4363d8',
    '#911eb4',
    '#bcf60c',
    '#fabebe',
    '#808000',
    '#000075',
    '#808080',
    '#ffe119',
    '#e6beff',
    '#3cb44b',
    '#aaffc3',
    '#ffd8b1',
    '#ffffff',
    '#46f0f0',
    '#f032e6',
    '#008080',
    '#000000',
    '#e6194b',
    '#9a6324',
    '#fffac8',
    '#f58231',
    '#800000'
  ];

  const plotConfig = {
    doubleClickDelay: 1000,
    responsive: true,
    displayModeBar: false,
    modeBarButtonsToRemove: [],
    displaylogo: false,
    showEditInChartStudio: false
  };

  const plotLayout = {
    autosize: true,
    margin: { t: 40, r: 0, b: 0, l: 0, pad: 10 },
    xaxis: {
      automargin: true,
      tickangle: -90,
      title: {
        text: 'Observed Feature',
        standoff: 20
      }
    },
    yaxis: {
      automargin: true,
      tickangle: 0,
      title: {
        text: 'Total',
        standoff: 20
      }
    },
    annotations: []
  };

  const plotData = getPlotDataVertBars(observedFeaturesDataObject);

  const plotState = {
    data: plotData,
    layout: plotLayout,
    config: plotConfig
  };

  // Define Element Rendering Methods.

  const getObservedFeaturesChartLayout = (
    mapTypeObservedFeatures,
    observedFeatureObservedFeatures,
    geographyObservedFeatures,
    selectedGeographicFeatureObservedFeatures,
    plotStateObservedFeatures
  ) => {
    return (
      <div className="observed-features-plot-layout">
        <div className="observed-features-plot-header">
          <div className="observed-features-plot-info">
            <div className="observed-features-plot-placeholder-text">
              TARGET: {mapTypeObservedFeatures}Plot for the selected feature{' '}
              {observedFeatureObservedFeatures} in the{' '}
              {geographyObservedFeatures} of{' '}
              {selectedGeographicFeatureObservedFeatures}.
            </div>
          </div>
          <div className="observed-features-plot-info">
            <div className="observed-features-plot-placeholder-text observed-features-plot-placeholder-emphasis">
              The plot for #demographic-features is in development.
            </div>
          </div>
        </div>
        <div className="observed-features-plot-chart-body">
          <div className="observed-features-plot-chart-body-plot">
            {/* <Plot
              data={plotStateObservedFeatures.data}
              layout={plotStateObservedFeatures.layout}
              config={plotStateObservedFeatures.config}
              useResizeHandler
              style={{ width: '100%', height: '100%' }}
            /> */}
          </div>
        </div>
      </div>
    );
  };

  // Generate Elements Using Element Rendering Methods.

  const observedFeaturesChartLayout = getObservedFeaturesChartLayout(
    mapType,
    observedFeature,
    geography,
    selectedGeographicFeature,
    plotState
  );

  // Render Component.

  if (debugState) {
    return (
      <DebugPlot
        className="plot-debug"
        mapType={mapType}
        geography={geography}
        maltreatmentTypes={maltreatmentTypes}
        observedFeature={observedFeature}
        year={year}
        selectedGeographicFeature={selectedGeographicFeature}
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
  maltreatmentTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  observedFeature: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  selectedGeographicFeature: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired
};

export default ObservedFeaturesPlot;
