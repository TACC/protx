import React from 'react';
import PropTypes from 'prop-types';
import Plot from 'react-plotly.js';
import './ConfigurableChart.css';

import { TRACE_VERT_MULTI_ALL } from './configs/trace.data';
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
            {maltreatmentTypesDataObjectSelected.map(maltreatmentTypeData => (
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

  const debugState = true;
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
      tickangle: 0,
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

  const plotState = {
    data: TRACE_VERT_MULTI_ALL,
    layout: plotLayout,
    config: plotConfig
  };

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
            <table className="chart-info-table">
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
            </table>
          </div>
          <div className="chart-filters">
            Maltreatment types currently selected:
            <div className="chart-filters-list">
              {maltreatmentTypesList.map(type => (
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
              This histogram is generated using {year} {mapType} data for{' '}
              {geography} {selectedGeographicFeature} using the data type(s)
            </span>
            {maltreatmentTypesList.map(type => (
              <span className="selected-type" key={type}>
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
