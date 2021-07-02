import React from 'react';
import PropTypes from 'prop-types';
import Plot from 'react-plotly.js';
import './ConfigurableChart.css';

// import { TRACE_VERT_SINGLE_ALL } from './configs/trace.data';
import { MALTREATMENT } from '../meta';
import {
  getMaltreatmentAggregatedValue,
  getMaltreatmentSelectedValues
} from '../util';

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

  const getPlotData = (typesDataArray) => {
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

  const randomHexColorCode = () => {
    const n = (Math.random() * 0xfffff * 1000000).toString(16);
    const hexVal = '#' + n.slice(0, 6);
    return hexVal;
  };

  const getColorScales = (arrayLength) => {
    const newColorScalesArray = [];
    for (let i = 0; i < arrayLength; i += 1) {
      const newColor = randomHexColorCode();
      newColorScalesArray.push(newColor);
    }
    return newColorScalesArray;
  };

  const getDebugInfo = (
    mapTypeSelected,
    geographySelected,
    yearSelected,
    observedFeatureSelected,
    selectedGeographicFeatureSelected,
    geoidSelected,
    maltreatmentTypesDataAggregateSelected,
    maltreatmentTypesDataObjectSelected
  ) => {
    return (
      <div className="configurable-chart">
        <div className="debug-info">
          <div className="debug-status">DEBUGGING MODE ACTIVE</div>
          <div className="debug-header">ConfigurableChart Component Data</div>
          <ul>
            <li>mapType: {mapTypeSelected}</li>
            <li>geography: {geographySelected}</li>
            <li>year: {yearSelected}</li>
            <li>observedFeature: {observedFeatureSelected}</li>
            <li>
              selected feature:
              {selectedGeographicFeatureSelected}
            </li>
            <li>geoid: {geoidSelected}</li>
            <li>
              maltreatment types aggregate value:
              {maltreatmentTypesDataAggregateSelected}
            </li>
          </ul>
          <table className="debug-data-table">
            <tr>
              <th>type code</th>
              <th>type name</th>
              <th>type value</th>
            </tr>
            {maltreatmentTypesDataObjectSelected.map((maltreatmentTypeData) => (
              <tr>
                <td>{maltreatmentTypeData.code}</td>
                <td>{maltreatmentTypeData.name}</td>
                <td>{maltreatmentTypeData.value}</td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    );
  };

  const debugState = false;
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

  const debugInfo = getDebugInfo(
    mapType,
    geography,
    year,
    observedFeature,
    selectedGeographicFeature,
    geoid,
    maltreatmentTypesDataAggregate,
    maltreatmentTypesDataObject
  );

  // const traceFillColors = getColorScales(11);
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
        text: 'Total',
        standoff: 30
      }
    },
    yaxis: {
      automargin: true,
      tickangle: 0,
      title: {
        text: 'Years',
        standoff: 30
      }
    },
    annotations: []
  };

  const plotData = getPlotData(maltreatmentTypesDataObject);

  const plotState = {
    // data: TRACE_VERT_MULTI_ALL,
    // data: TRACE_VERT_SINGLE_ALL,
    data: plotData,
    layout: plotLayout,
    config: plotConfig
  };

  // console.log(plotData);

  if (debugState) {
    return debugInfo;
  }

  return (
    <div className="configurable-chart">
      <div className="chart-layout">
        <div className="chart-header">
          <div className="chart-info">
            {/* <div className="chart-info-item">
              <div className="chart-info-title">Map type</div>
              <div className="chart-info-value">{mapType}</div>
            </div>
            <div className="chart-info-item">
              <div className="chart-info-title">Area</div>
              <div className="chart-info-value">{geography}</div>
            </div>
            <div className="chart-info-item">
              <div className="chart-info-title">Selected {geography}</div>
              <div className="chart-info-value">
                {selectedGeographicFeature}
              </div>
            </div>
            <div className="chart-info-item">
              <div className="chart-info-title">Year</div>
              <div className="chart-info-value">{year}</div>
            </div> */}
            {/* <table className="chart-info-table"> */}
              {/* <tr>
                <td>
                  Map Type: <span className="selected-type">{mapType}</span>
                </td>
                <td>
                  Area: <span className="selected-type">{geography}</span>
                </td>
                <td>
                  Year: <span className="selected-type">{year}</span>
                </td>
              </tr> */}
              {/* <tr> */}
                {/* <td>
                  <tr>
                    <td>Map type</td>
                    <td>{mapType}</td>
                  </tr>
                  <tr>
                    <td>Area</td>
                    <td>{geography}</td>
                  </tr>
                  <tr>
                    <td>Selected {geography}</td>
                    <td>{selectedGeographicFeature}</td>
                  </tr>
                  <tr>
                    <td>Year</td>
                    <td>{year}</td>
                  </tr>
                </td> */}
                {/* <td className="selected-region,">
                  <span className="selected-region-label">
                    Selected {geography}:
                  </span>
                  <span className="selected-region-value">
                    {selectedGeographicFeature}
                  </span>
                </td>
                <td className="aggregated-count">
                  <span className="aggregated-count-label">
                    Aggregated Count
                  </span>
                  <span className="aggregated-count-value">
                    {maltreatmentTypesDataAggregate}
                  </span>
                </td> */}
              {/* </tr> */}
            {/* </table> */}
            <div className="chart-info-item">
              <div className="selected-region">
                  Map Type: <span className="selected-type">{mapType}</span>
                </div>
                <div className="selected-region">
                  Area: <span className="selected-type">{geography}</span>
                </div>
                <div className="selected-region">
                  Year: <span className="selected-type">{year}</span>
                </div>
            </div>
            <div className="chart-info-item">
              <div className="selected-region">
                <span className="selected-region-label">
                  Selected {geography}:
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
          <div className="chart-links">
            {/* <div className="chart-link-item">
              Show
              <a href={chartInputs.CHART_INFO.chartLinks[0].linkRef} target="">
                {chartInputs.CHART_INFO.chartLinks[0].linkLabel}
              </a>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
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
