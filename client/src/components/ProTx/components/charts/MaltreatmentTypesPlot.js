import React from 'react';
import PropTypes from 'prop-types';
import Plot from 'react-plotly.js';
import { MALTREATMENT } from '../meta';
import {
  getMaltreatmentAggregatedValue,
  getMaltreatmentSelectedValues
} from '../util';
import DebugPlot from './DebugPlot';
import './MaltreatmentTypesPlot.css';

/**
 * TODOS FOR ALL PLOT COMPONENTS.
 *
 * TODO: Refactor debug state to be a property of the component.
 *   - Default to false, pass in with component usage in parent.
 * TODO: Refactor colorScales assignment out into utils.
 *   - Will be used by other components.
 * TODO: Investigate moving plot configuration generation code into  utils.
 *   - Used across multiple components, refactor into library.
 */

// Set this to true to inspect the component data in a tabular view.
const debugState = false;

function MaltreatmentTypesPlot({
  mapType,
  geography,
  maltreatmentTypes,
  observedFeature,
  year,
  selectedGeographicFeature,
  data
}) {
  // Define Data Marshalling Methods.

  const getMaltreatmentTypeNames = maltreatmentTypeCodes => {
    const updatedMaltreatmentTypesList = [];
    if (maltreatmentTypeCodes.length === 0) {
      return ['None'];
    }
    for (let i = 0; i < maltreatmentTypeCodes.length; i += 1) {
      for (let j = 0; j < maltreatmentMeta.length; j += 1) {
        if (maltreatmentTypeCodes[i] === maltreatmentMeta[j].field) {
          updatedMaltreatmentTypesList.push(maltreatmentMeta[j].name);
        }
      }
    }
    return updatedMaltreatmentTypesList;
  };

  const getMaltreatmentTypesDataObject = (codeArray, nameArray, valueArray) => {
    const newMaltreatmentDataObject = [];
    for (let i = 0; i < codeArray.length; i += 1) {
      const dataObject = {};
      dataObject.code = codeArray[i];
      dataObject.name = nameArray[i];
      dataObject.value = valueArray[i];
      newMaltreatmentDataObject.push(dataObject);
    }
    return newMaltreatmentDataObject;
  };

  // Variable Assignment Using Data Marshalling Methods.

  const maltreatmentMeta = MALTREATMENT;
  const geoid = selectedGeographicFeature;

  const maltreatmentTypesList = getMaltreatmentTypeNames(maltreatmentTypes);

  const maltreatmentTypesDataValues = getMaltreatmentSelectedValues(
    data,
    geography,
    year,
    geoid,
    maltreatmentTypes
  );

  const maltreatmentTypesDataAggregate = getMaltreatmentAggregatedValue(
    data,
    geography,
    year,
    geoid,
    maltreatmentTypes
  );

  const maltreatmentTypesDataObject = getMaltreatmentTypesDataObject(
    maltreatmentTypes,
    maltreatmentTypesList,
    maltreatmentTypesDataValues
  );

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
        text: 'Maltreatment Type',
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

  const plotData = getPlotDataVertBars(maltreatmentTypesDataObject);

  const plotState = {
    data: plotData,
    layout: plotLayout,
    config: plotConfig
  };

  // Define Element Rendering Methods.

  const getMaltreatmentChartLayout = (
    mapTypeMaltreatment,
    geographyMaltreatment,
    yearMaltreatment,
    selectedGeographicFeatureMaltreatment,
    maltreatmentTypesDataAggregateMaltreatment,
    maltreatmentTypesListMaltreatment,
    plotStateMaltreatment
  ) => {
    return (
      <div className="maltreatment-types-plot-layout">
        <div className="maltreatment-types-plot-header">
          <div className="maltreatment-types-plot-info">
            {/* <div className="maltreatment-types-plot-info-item">
              <div className="maltreatment-types-plot-selected-map">
                <span className="maltreatment-types-plot-selected-map-label">
                  Map Type:{' '}
                </span>
                <span className="maltreatment-types-plot-selected-type-value">
                  {mapTypeMaltreatment}
                </span>
              </div>
              <div className="maltreatment-types-plot-selected-area">
                <span className="maltreatment-types-plot-selected-area-label">
                  Area:{' '}
                </span>
                <span className="maltreatment-types-plot-selected-type-value">
                  {geographyMaltreatment}
                </span>
              </div>
              <div className="maltreatment-types-plot-selected-year">
                <span className="maltreatment-types-plot-selected-year-label">
                  Year:{' '}
                </span>
                <span className="maltreatment-types-plot-selected-type-value">
                  {yearMaltreatment}
                </span>
              </div>
            </div> */}
            <div className="maltreatment-types-plot-info-item">
              <div className="maltreatment-types-plot-selected-region">
                <span className="maltreatment-types-plot-selected-region-label">
                  Selected {geographyMaltreatment}
                </span>
                <span className="maltreatment-types-plot-selected-region-value">
                  {selectedGeographicFeatureMaltreatment}
                </span>
              </div>
              <div className="maltreatment-types-plot-aggregated-count">
                <span className="maltreatment-types-plot-aggregated-count-label">
                  Aggregated Count
                </span>
                <span className="maltreatment-types-plot-aggregated-count-value">
                  {maltreatmentTypesDataAggregateMaltreatment}
                </span>
              </div>
            </div>
          </div>
          <div className="maltreatment-types-plot-chart-filters">
            Selected Maltreatment Types
            <div className="maltreatment-types-plot-chart-filters-list">
              {maltreatmentTypesListMaltreatment.map(type => (
                <span
                  className="maltreatment-types-plot-selected-type"
                  key={type}
                >
                  {type}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="maltreatment-types-plot-chart-body">
          <div className="maltreatment-types-plot-chart-body-plot">
            <Plot
              data={plotStateMaltreatment.data}
              layout={plotStateMaltreatment.layout}
              config={plotStateMaltreatment.config}
              useResizeHandler
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </div>
        <div className="maltreatment-types-plot-chart-footer">
          <span className="maltreatment-types-plot-chart-summary">
            This chart was generated using {yearMaltreatment}{' '}
            {mapTypeMaltreatment} data for {geographyMaltreatment}{' '}
            {selectedGeographicFeatureMaltreatment} using the data type(s)
          </span>
          {maltreatmentTypesListMaltreatment.map(type => (
            <span
              className="maltreatment-types-plot-selected-type-summary"
              key={type}
            >
              {type}
            </span>
          ))}
        </div>
      </div>
    );
  };

  // Generate Elements Using Element Rendering Methods.

  const maltreatmentChartLayout = getMaltreatmentChartLayout(
    mapType,
    geography,
    year,
    selectedGeographicFeature,
    maltreatmentTypesDataAggregate,
    maltreatmentTypesList,
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
        year={year}
        selectedGeographicFeature={selectedGeographicFeature}
        data={data}
      />
    );
  }

  return (
    <div className="maltreatment-types-plot">{maltreatmentChartLayout}</div>
  );
}

MaltreatmentTypesPlot.propTypes = {
  mapType: PropTypes.string.isRequired,
  geography: PropTypes.string.isRequired,
  maltreatmentTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  observedFeature: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  selectedGeographicFeature: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired
};

export default MaltreatmentTypesPlot;
