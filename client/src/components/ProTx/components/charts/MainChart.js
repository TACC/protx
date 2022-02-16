import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import ChartInstructions from './ChartInstructions';
import DemographicDetails from './DemographicDetails';
import MaltreatmentDetails from './MaltreatmentDetails';
import MainPlot from './MainPlot';
import MaltreatmentTypesPlot from './MaltreatmentPlot';
import './MainChart.css';

import {
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
import './MaltreatmentPlot.css';

function MainChart({
  mapType,
  plotType,
  geography,
  maltreatmentTypes,
  observedFeature,
  year,
  selectedGeographicFeature,
  data,
  showRate,
  showInstructions
}) {
  /** Component Logic.
   * TODO:
   * - Need to seperate the Plot into the generic Plot component (`MainPlot`) and the plot-specific header layout needed for chart details not included in the plotly figure (`DemographicsDetails`, `MaltreatmentDetails`, `AnalyticsDetails`).
   **/
  // console.log(plotType);

  /***********************/
  /** DEMOGRAPHICS PLOT **/
  /***********************/

  if (plotType === 'demographics') {
    // console.log('DEMOGRAPHICS PLOT LOGIC');

    const protxDemographicsDistribution = useSelector(
      state => state.protxDemographicsDistribution
    );

    const dispatch = useDispatch();

    useEffect(() => {
      if (observedFeature === 'maltreatment') {
        return;
      }
      if (selectedGeographicFeature) {
        dispatch({
          type: 'FETCH_PROTX_DEMOGRAPHIC_DISTRIBUTION',
          payload: {
            area: geography,
            selectedArea: selectedGeographicFeature,
            variable: observedFeature,
            unit: showRate ? 'percent' : 'count'
          }
        });
      }
    }, [
      mapType,
      geography,
      observedFeature,
      selectedGeographicFeature,
      showRate
    ]);

    if (selectedGeographicFeature && observedFeature) {
      return (
        <div className="observed-features-chart main-chart">
          <div className="observed-features-plot main-plot">
            <div className="observed-features-plot-layout">
              <DemographicDetails
                geography={geography}
                observedFeature={observedFeature}
                selectedGeographicFeature={selectedGeographicFeature}
                data={data}
              />
              <MainPlot
                divId="main-plot"
                className="main-plot"
                geography={geography}
                maltreatmentTypes={maltreatmentTypes}
                observedFeature={observedFeature}
                selectedGeographicFeature={selectedGeographicFeature}
                data={data}
              />
              {!protxDemographicsDistribution.loading && (
                <ChartInstructions currentReportType="hidden" />
              )}
            </div>
          </div>
        </div>
      );
    }
  }

  /***********************/
  /** MALTEATMENT PLOT  **/
  /***********************/

  if (plotType === 'maltreatment') {
    // console.log('MALTEATMENT PLOT LOGIC');

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

    const plotState = maltreatmentPlotData.malPlotState;

    if (selectedGeographicFeature && maltreatmentTypes.length !== 0) {
      return (
        <div className="maltreatment-chart">
          <div className="maltreatment-types-plot">
            <div className="maltreatment-types-plot-layout">
              <MaltreatmentDetails
                geography={geography}
                selectedGeographicFeature={selectedGeographicFeature}
                maltreatmentTypes={maltreatmentTypes}
                maltreatmentPlotAggregate={
                  maltreatmentPlotData.malTypesAggregate
                }
                maltreatmentTypesList={maltreatmentPlotData.malTypesList}
                showRate={showRate}
              />
              <MaltreatmentTypesPlot plotState={plotState} />
              {/* {!protxMaltreatmentDistribution.loading && ( */}
              <ChartInstructions currentReportType="hidden" />
              {/* )} */}
            </div>
          </div>
        </div>
      );
    }
  }

  /***********************/
  /** ANALYTICS PLOT    **/
  /***********************/

  if (plotType === 'analytics') {
    // console.log('ANALYTICS PLOT LOGIC');
  }

  /***********************/
  /** PLOT INSTRUCTIONS **/
  /***********************/

  return (
    <div className="main-chart">
      {showInstructions && <ChartInstructions currentReportType={plotType} />}
    </div>
  );
}

MainChart.propTypes = {
  mapType: PropTypes.string.isRequired,
  plotType: PropTypes.string.isRequired,
  geography: PropTypes.string.isRequired,
  maltreatmentTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  observedFeature: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  selectedGeographicFeature: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired,
  showRate: PropTypes.bool.isRequired,
  showInstructions: PropTypes.bool
};

MainChart.defaultProps = {
  showInstructions: false
};

export default MainChart;
