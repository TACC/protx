import React from 'react';
import PropTypes from 'prop-types';
import Plot from 'react-plotly.js';
import {
  plotConfig,
  getPlotDataVertBars,
  getPlotLayout,
  getMaltreatmentTypeNames,
  getMaltreatmentTypesDataObject,
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
  year,
  selectedGeographicFeature,
  data
}) {
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

  const plotLayout = getPlotLayout('Maltreatment Types');
  const plotData = getPlotDataVertBars(maltreatmentTypesDataObject);

  const plotState = {
    data: plotData,
    layout: plotLayout,
    config: plotConfig
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
      <div className="maltreatment-types-plot-layout">
        <div className="maltreatment-types-plot-header">
          <div className="maltreatment-types-plot-info">
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

  const maltreatmentChartLayout = getMaltreatmentChartLayout(
    mapType,
    geography,
    year,
    selectedGeographicFeature,
    maltreatmentTypesDataAggregate,
    maltreatmentTypesList,
    plotState
  );

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
  year: PropTypes.string.isRequired,
  selectedGeographicFeature: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired
};

export default MaltreatmentTypesPlot;
