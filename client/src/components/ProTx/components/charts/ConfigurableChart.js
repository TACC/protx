import React from 'react';
import PropTypes from 'prop-types';
import Plot from 'react-plotly.js';
import './ConfigurableChart.css';
import { OBSERVED_FEATURES, MALTREATMENT } from '../meta';
import {
  getObservedFeatureValue,
  getMaltreatmentAggregatedValue,
  getMaltreatmentSelectedValues
} from '../util';

/**
 * TODO: Complete the chart design for the demographics selections.
 * TODO: Add a method to iterate over OBSERVED_FEATURES label values.
 * TODO: Add any util.js methods required to munge the data arrays.
 * TODO: Create additional plotTrace methods basedon chart needs.
 * TODO: Cleanup the CSS, very redundant, use --vars.
 * TODO: Think about how to extend the Chart for other data usecases.
 */

function ConfigurableChart({
  mapType,
  geography,
  maltreatmentTypes,
  observedFeature,
  year,
  selectedGeographicFeature,
  data
}) {
  const getMaltreatmentTypeNames = (maltreatmentTypeCodes) => {
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

  const getPlotDataVertBars = (typesDataArray) => {
    const newPlotData = [];
    for (let i = 0; i < typesDataArray.length; i += 1) {
      const yData = typesDataArray[i].value;
      const xData = typesDataArray[i].code;
      const tName = typesDataArray[i].name;
      const traceFillColor = traceFillColors[i];
      const type = getBarVertTrace(yData, xData, tName, traceFillColor);
      newPlotData.push(type);
    }
    return newPlotData;
  };

  const getMaltreatmentDataTable = (maltreatmentTypesDataObjectDebug) => {
    return (
      <table className="debug-data-table">
        <tr>
          <th>type code</th>
          <th>type name</th>
          <th>type value</th>
        </tr>
        {maltreatmentTypesDataObjectDebug.map((maltreatmentTypeData) => (
          <tr>
            <td>{maltreatmentTypeData.code}</td>
            <td>{maltreatmentTypeData.name}</td>
            <td>{maltreatmentTypeData.value}</td>
          </tr>
        ))}
      </table>
    );
  };

  const getSelectionData = (
    mapTypeDebug,
    geographyDebug,
    yearDebug,
    observedFeatureDebug,
    observedGeographicFeatureDebug,
    geoidDebug,
    observedFeatureValueDebug,
    maltreatmentTypesDataAggregateDebug
  ) => {
    return (
      <ul>
        <li>mapType: {mapTypeDebug}</li>
        <li>geography: {geographyDebug}</li>
        <li>observedFeature: {observedFeatureDebug}</li>
        <li>observedFeatureValue: {observedFeatureValueDebug}</li>
        <li>
          observedGeographicFeature:
          {observedGeographicFeatureDebug}
        </li>
        <li>geoid: {geoidDebug}</li>
        <li>year: {yearDebug}</li>
        <li>
          maltreatmentTypesDataAggregate:
          {maltreatmentTypesDataAggregateDebug}
        </li>
      </ul>
    );
  };

  const getDebugInfo = (selectionDataDebug, maltreatmentDataTableDebug) => {
    return (
      <div className="configurable-chart">
        <div className="debug-info">
          <div className="debug-status">DEBUGGING MODE ACTIVE</div>
          <div className="debug-header">ConfigurableChart Component Data</div>
          {selectionDataDebug}
          {maltreatmentDataTableDebug}
        </div>
      </div>
    );
  };

  const getTempMessage = (
    mapTypeMessage,
    tempMessageValueMaltreatment,
    tempMessageObservedFeatures
  ) => {
    if (mapTypeMessage === 'maltreatment') {
      return <div className="temp-message">{tempMessageValueMaltreatment}</div>;
    }
    if (mapTypeMessage === 'observedFeatures') {
      return <div className="temp-message">{tempMessageObservedFeatures}</div>;
    }
  };

  const getObservedFeaturesChartLayout = (
    mapTypeObservedFeatures,
    geographyObservedFeatures,
    yearObservedFeatures,
    selectedGeographicFeatureObservedFeatures,
    maltreatmentTypesDataAggregateObservedFeatures,
    maltreatmentTypesListObservedFeatures,
    plotStateObservedFeatures
  ) => {
    return (
      <div className="demographics-map">
        <div className="chart-layout">
          <div className="chart-header">
            <div className="chart-info">
              <div className="chart-info-item">
                <div className="selected-map">
                  <span className="selected-map-label">Map Type: </span>
                  <span className="selected-type-value">{mapType}</span>
                </div>
                <div className="selected-area">
                  <span className="selected-area-label">Area: </span>
                  <span className="selected-type-value">{geography}</span>
                </div>
                <div className="selected-year">
                  <span className="selected-year-label">Year: </span>
                  <span className="selected-type-value">{year}</span>
                </div>
              </div>
              <div className="chart-info-item">
                <div className="selected-region">
                  <span className="selected-region-label">
                    Selected {geography}
                  </span>
                  <span className="selected-region-value">
                    {selectedGeographicFeature}
                  </span>
                </div>
                <div className="aggregated-count">
                  <span className="aggregated-count-label">
                    Aggregated Count
                  </span>
                  <span className="aggregated-count-value">
                    {maltreatmentTypesDataAggregate}
                  </span>
                </div>
              </div>
            </div>
            <div className="chart-filters">
              Selected Maltreatment Types
              <div className="chart-filters-list">
                {maltreatmentTypesList.map((type) => (
                  <span className="selected-type" key={type}>
                    {type}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="chart-body">
            <div className="chart-body-plot">
              <Plot
                data={plotState.data}
                layout={plotState.layout}
                config={plotState.config}
                useResizeHandler
                style={{ width: '100%', height: '100%' }}
              />
            </div>
          </div>
          <div className="chart-footer">
            <div>
              <span className="chart-summary">
                This chart is generated using {year} {mapType} data for{' '}
                {geography} {selectedGeographicFeature} using the data type(s)
              </span>
              {maltreatmentTypesList.map((type) => (
                <span className="selected-type-summary" key={type}>
                  {type}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

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
      <div className="maltreatment-map">
        <div className="chart-layout">
          <div className="chart-header">
            <div className="chart-info">
              <div className="chart-info-item">
                <div className="selected-map">
                  <span className="selected-map-label">Map Type: </span>
                  <span className="selected-type-value">
                    {mapTypeMaltreatment}
                  </span>
                </div>
                <div className="selected-area">
                  <span className="selected-area-label">Area Type: </span>
                  <span className="selected-type-value">
                    {geographyMaltreatment}
                  </span>
                </div>
                <div className="selected-year">
                  <span className="selected-year-label">Year: </span>
                  <span className="selected-type-value">
                    {yearMaltreatment}
                  </span>
                </div>
              </div>
              <div className="chart-info-item">
                <div className="selected-region">
                  <span className="selected-region-label">
                    Selected {geographyMaltreatment}
                  </span>
                  <span className="selected-region-value">
                    {selectedGeographicFeatureMaltreatment}
                  </span>
                </div>
                <div className="aggregated-count">
                  <span className="aggregated-count-label">
                    Aggregated Count
                  </span>
                  <span className="aggregated-count-value">
                    {maltreatmentTypesDataAggregateMaltreatment}
                  </span>
                </div>
              </div>
            </div>
            <div className="chart-filters">
              <div className="chart-filters-header">
                Selected Maltreatment Types
              </div>
              <div className="chart-filters-list">
                {maltreatmentTypesListMaltreatment.map((type) => (
                  <span className="selected-type-filter" key={type}>
                    {type}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="chart-body">
            <div className="chart-body-plot">
              <Plot
                data={plotStateMaltreatment.data}
                layout={plotStateMaltreatment.layout}
                config={plotStateMaltreatment.config}
                useResizeHandler
                style={{ width: '100%', height: '100%' }}
              />
            </div>
          </div>
          <div className="chart-footer">
            <span className="chart-summary">
              This chart was generated using {yearMaltreatment}{' '}
              {mapTypeMaltreatment} data for {geographyMaltreatment}{' '}
              {selectedGeographicFeatureMaltreatment} using the data type(s)
            </span>
            {maltreatmentTypesListMaltreatment.map((type) => (
              <span className="selected-type-summary" key={type}>
                {type}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderChart = (
    debugStateRender,
    debugInfoRender,
    showTempMessageRender,
    tempMessageRender,
    mapTypeRender,
    maltreatmentChartLayoutRender,
    observedFeaturesChartLayoutRender
  ) => {
    if (debugStateRender) {
      return <div className="configurable-chart">{debugInfoRender}</div>;
    }
    if (showTempMessageRender) {
      return <div className="configurable-chart">{tempMessageRender}</div>;
    }
    if (mapTypeRender === 'maltreatment') {
      return (
        <div className="configurable-chart">
          {maltreatmentChartLayoutRender}
        </div>
      );
    }
    if (mapTypeRender === 'observedFeatures') {
      return (
        <div className="configurable-chart">
          {observedFeaturesChartLayoutRender}
        </div>
      );
    }
  };

  // Set this to true to inspect the component data in a tabular view.
  // This will hide he chart rendering.
  const debugState = false;
  const showTempMessage = true;
  const tempMessageObservedFeaturesChart =
    'The demographic features chart is currently under development.';
  const tempMessageMaltreatmentChart =
    'The maltreatment chart is currently under development.';
  const maltreatmentMeta = MALTREATMENT;
  const geoid = selectedGeographicFeature;

  const observedFeatureValue = getObservedFeatureValue(
    data,
    geography,
    year,
    geoid,
    observedFeature
  );

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

  const selectionData = getSelectionData(
    mapType,
    geography,
    year,
    observedFeature,
    selectedGeographicFeature,
    geoid,
    observedFeatureValue,
    maltreatmentTypesDataAggregate
  );

  const maltreatmentDataTable = getMaltreatmentDataTable(
    maltreatmentTypesDataObject
  );

  const debugInfo = getDebugInfo(selectionData, maltreatmentDataTable);

  const tempMessage = getTempMessage(
    mapType,
    tempMessageObservedFeaturesChart,
    tempMessageMaltreatmentChart
  );

  // Assign colors to the categories of maltreatment.
  // Static values will persist across view reflows.
  // Omitted any colors that are similar to the current map scales.
  const traceFillColors = [
    // '#e6194b',
    // '#3cb44b',
    // '#ffe119',
    '#4363d8',
    // '#f58231',
    '#911eb4',
    '#46f0f0',
    '#f032e6',
    '#bcf60c',
    '#fabebe',
    '#008080',
    '#e6beff',
    // '#9a6324',
    // '#fffac8',
    // '#800000',
    '#aaffc3',
    '#808000',
    // '#ffd8b1',
    '#000075',
    '#808080',
    '#ffffff',
    '#000000'
  ];

  const plotConfig = {
    doubleClickDelay: 1000,
    responsive: true,
    displayModeBar: false,
    modeBarButtonsToRemove: [],
    displaylogo: false,
    showEditInChartStudio: false
    // plotlyServerURL: 'https://chart-studio.plotly.com',
    // linkText: 'Edit Chart in Plotly Studio'
  };

  const plotLayout = {
    // title: 'Bar Chart',
    // barmode: 'stack',
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

  const observedFeaturesChartLayout = getObservedFeaturesChartLayout(
    mapType,
    geography,
    year,
    selectedGeographicFeature,
    maltreatmentTypesDataAggregate,
    maltreatmentTypesList,
    plotState
  );

  const maltreatmentChartLayout = getMaltreatmentChartLayout(
    mapType,
    geography,
    year,
    selectedGeographicFeature,
    maltreatmentTypesDataAggregate,
    maltreatmentTypesList,
    plotState
  );

  const chart = renderChart(
    debugState,
    debugInfo,
    showTempMessage,
    tempMessage,
    mapType,
    maltreatmentChartLayout,
    observedFeaturesChartLayout
  );

  return chart;
}

ConfigurableChart.propTypes = {
  mapType: PropTypes.string.isRequired,
  geography: PropTypes.string.isRequired,
  maltreatmentTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  observedFeature: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  selectedGeographicFeature: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired
};

export default ConfigurableChart;
