import React from 'react';
import PropTypes from 'prop-types';
import Plot from 'react-plotly.js';
import './ConfigurableChart.css';

import { TRACE_VERT_MULTI_ALL } from './configs/trace.data';
import { LAYOUT_07 } from './configs/chart.layouts';
import { CONFIG_BASE } from './configs/chart.configs';
import { OBSERVED_FEATURES, MALTREATMENT } from '../meta';
import {
  getMetaData,
  getObservedFeatureValue,
  getMaltreatmentAggregatedValue,
  getFeatureStyle
} from '../util';

const observedFeaturesMeta = OBSERVED_FEATURES;
const maltreatmentMeta = MALTREATMENT;

function ConfigurableChart({
  mapType,
  geography,
  maltreatmentTypes,
  observedFeature,
  year,
  selectedGeographicFeature,
  data
}) {
  const debugState = false;

  const plotState = {
    data: TRACE_VERT_MULTI_ALL,
    layout: LAYOUT_07,
    config: CONFIG_BASE
  };

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

  const maltreatmentTypesList = getMaltreatmentTypeNames(maltreatmentTypes);

  if (debugState) {
    return (
      <div className="main-chart">
        <div className="debug-info">
          <ul>
            <li>mapType: {mapType}</li>
            <li>geography: {geography}</li>
            <li>maltreatment types selected:</li>
            <ul>
              {maltreatmentTypes.map(type => (
                <li key={type}>{type}</li>
              ))}
            </ul>
            <li>selected types translated</li>
            <ul>
              {maltreatmentTypesList.map(maltype => (
                <li key={maltype}>{maltype}</li>
              ))}
            </ul>
            <li>observedFeature={observedFeature}</li>
            <li>year: {year}</li>
            <li>
              selected feature:
              {selectedGeographicFeature}
            </li>
            <li>data object:</li>
            <ul>{/* Iterate through the data object here. */}</ul>
          </ul>
        </div>
      </div>
    );
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
