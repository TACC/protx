import React from 'react';
import PropTypes from 'prop-types';
import Plot from 'react-plotly.js';
import {
  getFipsIdName,
  capitalizeString,
  getMaltreatmentLabel
} from '../shared/dataUtils';
import { getMaltreatmentPlotData } from '../shared/plotUtils';
import DebugPlot from './DebugPlot';
import './MaltreatmentTypesPlot.css';

function MaltreatmentTypesPlot({
  mapType,
  geography,
  maltreatmentTypes,
  year,
  showRate,
  selectedGeographicFeature,
  data,
  debug
}) {
  const PLOT_TYPE = 'maltreatmentTypes';
  const getMaltreatmentChartLayout = (
    mapTypeMaltreatment,
    geographyMaltreatment,
    yearMaltreatment,
    selectedGeographicFeatureMaltreatment,
    fipsIdNameMaltreatment,
    maltreatmentLabel,
    maltreatmentTypesDataAggregateMaltreatment,
    maltreatmentTypesListMaltreatment,
    plotStateMaltreatment
  ) => {
    const geographyLabel = capitalizeString(geographyMaltreatment);

    return (
      <div className="maltreatment-types-plot-layout">
        <div className="maltreatment-types-plot-header">
          <div className="maltreatment-types-plot-info">
            <div className="maltreatment-types-plot-info-item">
              <div className="maltreatment-types-plot-selected-region">
                <span className="maltreatment-types-plot-selected-region-label">
                  Selected {geographyLabel}
                </span>
                <span className="maltreatment-types-plot-selected-region-value">
                  {fipsIdNameMaltreatment}
                </span>
                <span className="maltreatment-types-plot-selected-region-code">
                  ({selectedGeographicFeatureMaltreatment})
                </span>
              </div>
              <div className="maltreatment-types-plot-aggregated-count">
                <span className="maltreatment-types-plot-aggregated-count-label">
                  {maltreatmentLabel}
                </span>
                <span className="maltreatment-types-plot-aggregated-count-value">
                  {maltreatmentTypesDataAggregateMaltreatment}
                </span>
              </div>
            </div>
          </div>
          <div className="maltreatment-types-plot-info">
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
        </div>
        <div className="maltreatment-types-plot-chart-body">
          <div className="maltreatment-types-plot-chart-body-plot">
            <Plot
              divId="maltreatment-types-plot"
              className="maltreatment-types-plot"
              data={plotStateMaltreatment.data}
              layout={plotStateMaltreatment.layout}
              config={plotStateMaltreatment.config}
              useResizeHandler
            />
          </div>
        </div>
        <div className="maltreatment-types-plot-chart-footer">
          <span className="maltreatment-types-plot-chart-summary">
            This chart was generated using{' '}
            <span className="maltreatment-types-plot-selected-type">
              {yearMaltreatment} {mapTypeMaltreatment} data
            </span>{' '}
            for{' '}
            <span className="maltreatment-types-plot-selected-type">
              {fipsIdNameMaltreatment} {geographyMaltreatment}
              {/* (code{' '}{selectedGeographicFeatureMaltreatment})  */}
            </span>{' '}
            using the data type(s):{' '}
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
    year,
    showRate
  );

  const fipsIdValue = getFipsIdName(selectedGeographicFeature);
  const geoId = `${selectedGeographicFeature}:${fipsIdValue}`;
  const maltreatmentLabel = getMaltreatmentLabel(maltreatmentTypes, showRate);

  const maltreatmentChartLayout = getMaltreatmentChartLayout(
    mapType,
    geography,
    year,
    selectedGeographicFeature,
    fipsIdValue,
    maltreatmentLabel,
    maltreatmentPlotData.malTypesAggregate,
    maltreatmentPlotData.malTypesList,
    maltreatmentPlotData.malPlotState
  );

  if (debug) {
    return (
      <DebugPlot
        className="plot-debug"
        mapType={mapType}
        geography={geography}
        maltreatmentTypes={maltreatmentTypes}
        year={year}
        selectedGeographicFeature={selectedGeographicFeature}
        fipsIdValue={fipsIdValue}
        geoId={geoId}
        plotType={PLOT_TYPE}
        plotData={maltreatmentPlotData}
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
  showRate: PropTypes.bool.isRequired,
  selectedGeographicFeature: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired,
  /** Render component data in debug mode. */
  debug: PropTypes.bool
};

MaltreatmentTypesPlot.defaultProps = {
  debug: false
};

export default MaltreatmentTypesPlot;
