import React from 'react';
import PropTypes from 'prop-types';
import Plot from 'react-plotly.js';
import {
  getFipsIdName,
  capitalizeString,
  getMaltreatmentLabel,
  getMaltreatmentTypeNames,
  getMaltreatmentSelectedValues,
  getMaltreatmentAggregatedValue,
  getMaltreatmentTypesDataObject
} from '../shared/dataUtils';
import {
  plotConfig,
  getPlotLayout,
  getPlotDataBars
} from '../shared/plotUtils';
import './MaltreatmentTypesPlot.css';

function MaltreatmentTypesPlot({
  mapType,
  geography,
  maltreatmentTypes,
  year,
  showRate,
  selectedGeographicFeature,
  data
}) {
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
        <div className="maltreatment-types-plot-info">
          <div className="maltreatment-types-plot-info-region">
            <div className="maltreatment-types-plot-selected-region">
              <span className="maltreatment-types-plot-selected-region-label">
                FIPS: {selectedGeographicFeatureMaltreatment}
              </span>
              <span className="maltreatment-types-plot-selected-region-value">
                {fipsIdNameMaltreatment} {geographyLabel}
              </span>
            </div>
            <div className="maltreatment-types-plot-aggregated-count">
              <span className="maltreatment-types-plot-aggregated-count-value">
                {maltreatmentTypesDataAggregateMaltreatment}
              </span>
              <span className="maltreatment-types-plot-aggregated-count-label">
                {maltreatmentLabel}
              </span>
            </div>
          </div>
        </div>
        <div className="maltreatment-types-plot-info">
          <div className="maltreatment-types-plot-info-chart">
            <span className="maltreatment-types-plot-chart-summary">
              This chart was generated with{' '}
              <span className="maltreatment-types-plot-selected-type">
                {yearMaltreatment} {mapTypeMaltreatment} data
              </span>{' '}
              for{' '}
              <span className="maltreatment-types-plot-selected-type">
                {fipsIdNameMaltreatment} {geographyMaltreatment}
                {/* (code{' '}{selectedGeographicFeatureMaltreatment})  */}
              </span>{' '}
              using data for the following type(s):{' '}
            </span>
            {maltreatmentTypesListMaltreatment.map(type => (
              <span
                className="maltreatment-types-plot-selected-type-summary"
                key={type}
              >
                {type}
              </span>
            ))}
            {'.'}
          </div>
        </div>
        <div className="maltreatment-types-plot-chart">
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
    );
  };

  const prepMaltreatmentPlotData = (
    selectedGeographicFeaturePrep,
    maltreatmentTypesPrep,
    dataPrep,
    geographyPrep,
    yearPrep,
    showRatePrep
  ) => {
    const geoid = selectedGeographicFeaturePrep;
    const maltreatmentTypesList = getMaltreatmentTypeNames(
      maltreatmentTypesPrep,
      dataPrep
    );

    const maltreatmentTypesDataValues = getMaltreatmentSelectedValues(
      dataPrep,
      geographyPrep,
      yearPrep,
      showRatePrep,
      geoid,
      maltreatmentTypesPrep
    );

    const maltreatmentTypesDataAggregate = getMaltreatmentAggregatedValue(
      dataPrep,
      geographyPrep,
      yearPrep,
      showRatePrep,
      geoid,
      maltreatmentTypesPrep
    ).toFixed(0);

    const maltreatmentTypesDataObject = getMaltreatmentTypesDataObject(
      maltreatmentTypesPrep,
      maltreatmentTypesList,
      maltreatmentTypesDataValues
    );

    const plotTitle = 'Maltreatment Types';
    const plotOrientation = 'v';
    const showPlotLegend = false;
    const plotXDataLabel = 'Maltreatment Type';
    const plotXDataAxisType = 'category';
    const plotYDataLabel = 'Total Number of Cases in Selected County';
    const plotYDataAxisType = 'linear';

    const plotLayout = getPlotLayout(
      plotTitle,
      plotOrientation,
      showPlotLegend,
      plotXDataLabel,
      plotXDataAxisType,
      plotYDataLabel,
      plotYDataAxisType
    );

    const plotData = getPlotDataBars(
      'maltreatment',
      maltreatmentTypesDataObject,
      plotOrientation
    );

    const plotState = {
      data: plotData,
      layout: plotLayout,
      config: plotConfig
    };

    const maltreatmentPlotData = {
      malTypesAggregate: maltreatmentTypesDataAggregate,
      malTypesList: maltreatmentTypesList,
      malPlotState: plotState
    };

    return maltreatmentPlotData;
  };

  const maltreatmentPlotData = prepMaltreatmentPlotData(
    selectedGeographicFeature,
    maltreatmentTypes,
    data,
    geography,
    year,
    showRate
  );

  const fipsIdValue = getFipsIdName(selectedGeographicFeature);
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
  data: PropTypes.object.isRequired
};

MaltreatmentTypesPlot.defaultProps = {};

export default MaltreatmentTypesPlot;
