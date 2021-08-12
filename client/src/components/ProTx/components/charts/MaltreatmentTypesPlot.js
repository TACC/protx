import React from 'react';
import PropTypes from 'prop-types';
import Plot from 'react-plotly.js';
import { getFipsIdName, getMaltreatmentPlotData } from '../util';
import DebugPlot from './DebugPlot';
import './MaltreatmentTypesPlot.css';

/* Passing in the debugState property at component declaration will render component data in debug mode. */
function MaltreatmentTypesPlot({
  mapType,
  geography,
  maltreatmentTypes,
  year,
  selectedGeographicFeature,
  data,
  debugState
}) {
  // console.log(mapType);
  // console.log(geography);
  // console.log(maltreatmentTypes);
  // console.log(year);
  // console.log(selectedGeographicFeature);
  // console.log(data);
  // console.log(debugState);

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

  const maltreatmentPlotData = getMaltreatmentPlotData(
    selectedGeographicFeature,
    maltreatmentTypes,
    data,
    geography,
    year
  );

  const fipsIdValue = getFipsIdName(selectedGeographicFeature);
  const debugGeoid = `${selectedGeographicFeature}:${fipsIdValue}`;

  const maltreatmentChartLayout = getMaltreatmentChartLayout(
    mapType,
    geography,
    year,
    selectedGeographicFeature,
    maltreatmentPlotData.malTypesAggregate,
    maltreatmentPlotData.malTypesList,
    maltreatmentPlotData.malPlotState
  );

  if (debugState) {
    return (
      <DebugPlot
        className="plot-debug"
        mapType={mapType}
        geography={geography}
        maltreatmentTypes={maltreatmentTypes}
        maltreatmentPlotData={maltreatmentPlotData}
        year={year}
        selectedGeographicFeature={debugGeoid}
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
  data: PropTypes.object.isRequired,
  debugState: PropTypes.bool.isRequired
};

export default MaltreatmentTypesPlot;
