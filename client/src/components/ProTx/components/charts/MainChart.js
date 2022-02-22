import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { LoadingSpinner } from '_common';
import {
  getMaltreatmentTypeNames,
  getMaltreatmentSelectedValues,
  getMaltreatmentAggregatedValue,
  getMaltreatmentTypesDataObject,
  getPredictiveFeaturesDataObject
} from '../shared/dataUtils';
import {
  plotConfig,
  getPlotLayout,
  getPlotDataBars
} from '../shared/plotUtils';
import ChartInstructions from './ChartInstructions';
import DemographicsDetails from './DemographicsDetails';
import MaltreatmentDetails from './MaltreatmentDetails';
import PredictiveFeaturesTable from './PredictiveFeaturesTable';
import AnalyticsDetails from './AnalyticsDetails';
import MainPlot from './MainPlot';
import './MainChart.css';

function MainChart({
  mapType,
  chartType,
  geography,
  maltreatmentTypes,
  observedFeature,
  year,
  selectedGeographicFeature,
  data,
  showRate,
  showInstructions
}) {
  /***********************/
  /** ANALYTICS PLOT    **/
  /***********************/

  if (chartType === 'analytics') {
    const prepPredictiveFeaturesPlotData = () => {
      const newPredictiveFeaturesDataObject = getPredictiveFeaturesDataObject();

      // Transform the response from the query into the required object structure for the plot.
      const predictiveFeaturesDataObject = [];

      const axisCategories = [
        'category',
        'linear',
        'log',
        'date',
        'multicategory',
        '-'
      ];

      const plotTitle = 'Predictive Features';
      const plotOrientation = 'v';
      const showPlotLegend = true;
      const plotXDataLabel = 'X DATA LABEL';
      const plotXDataAxisType = axisCategories[1];
      const plotYDataLabel = 'Y DATA LABEL';
      const plotYDataAxisType = axisCategories[1];

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
        'predictive',
        predictiveFeaturesDataObject,
        plotOrientation
      );

      const plotState = {
        data: plotData,
        layout: plotLayout,
        config: plotConfig,
        raw: newPredictiveFeaturesDataObject
      };

      const predictiveFeaturesPlotData = {
        predictiveFeaturesPlotState: plotState
      };

      return predictiveFeaturesPlotData;
    };

    const predictiveFeaturesPlotData = prepPredictiveFeaturesPlotData();
    const plotState = predictiveFeaturesPlotData.predictiveFeaturesPlotState;
    const showPlot = false; // Hide the plot while its still a work-in-progress.

    return (
      <div className="predictive-features-chart">
        <div className="predictive-features-plot">
          <div className="predictive-features-plot-layout">
            <PredictiveFeaturesTable
              selectedGeographicFeature={selectedGeographicFeature}
            />
            {showPlot && (
              <>
                <AnalyticsDetails
                  geography={geography}
                  observedFeature={observedFeature}
                  selectedGeographicFeature={selectedGeographicFeature}
                  data={data}
                />
                <MainPlot plotState={plotState} />
              </>
            )}
            <ChartInstructions currentReportType="hidden" />
          </div>
        </div>
      </div>
    );
  }

  /***********************/
  /** DEMOGRAPHICS PLOT **/
  /***********************/

  if (chartType === 'demographics') {
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
      if (protxDemographicsDistribution.error) {
        return (
          <div className="data-error-message">
            There was a problem loading the data.
          </div>
        );
      }

      if (protxDemographicsDistribution.loading) {
        return (
          <div className="loading-spinner">
            <LoadingSpinner />
          </div>
        );
      }

      const plotState = protxDemographicsDistribution.data;

      return (
        <div className="observed-features-plot-layout">
          <DemographicsDetails
            geography={geography}
            observedFeature={observedFeature}
            selectedGeographicFeature={selectedGeographicFeature}
            data={data}
          />
          <MainPlot plotState={plotState} />
          {!protxDemographicsDistribution.loading && (
            <ChartInstructions currentReportType="hidden" />
          )}
        </div>
      );
    }
  }

  /***********************/
  /** MALTEATMENT PLOT  **/
  /***********************/

  if (chartType === 'maltreatment') {
    // Dummy state data to make the empty plot render.
    let protxMaltreatmentDistribution = {};

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

    protxMaltreatmentDistribution = prepMaltreatmentPlotData(
      selectedGeographicFeature,
      maltreatmentTypes,
      data,
      geography,
      year,
      showRate
    );

    const plotState = protxMaltreatmentDistribution;

    if (selectedGeographicFeature && maltreatmentTypes.length !== 0) {
      return (
        <div className="maltreatment-chart">
          <div className="maltreatment-types-plot">
            <div className="maltreatment-types-plot-layout">
              <MaltreatmentDetails
                geography={geography}
                selectedGeographicFeature={selectedGeographicFeature}
                maltreatmentTypes={maltreatmentTypes}
                maltreatmentPlotAggregate={plotState.malTypesAggregate}
                maltreatmentTypesList={plotState.malTypesList}
                showRate={showRate}
              />
              <MainPlot plotState={plotState.malPlotState} />
              <ChartInstructions currentReportType="hidden" />
            </div>
          </div>
        </div>
      );
    }
  }

  /***********************/
  /** PLOT INSTRUCTIONS **/
  /***********************/

  return (
    <div className="main-chart">
      {showInstructions && <ChartInstructions currentReportType={chartType} />}
    </div>
  );
}

MainChart.propTypes = {
  mapType: PropTypes.string.isRequired,
  chartType: PropTypes.string.isRequired,
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
