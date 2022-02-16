import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import ChartInstructions from './ChartInstructions';
import DemographicDetails from './DemographicDetails';
import MainPlot from './MainPlot';
import MaltreatmentTypesPlot from './MaltreatmentTypesPlot';
import './MainChart.css';

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
      // maltreatmentTypes
      observedFeature,
      // year,
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

    // OLD PLOT.
    if (selectedGeographicFeature && maltreatmentTypes.length !== 0) {
      return (
        <div className="maltreatment-chart">
          <MaltreatmentTypesPlot
            mapType={mapType}
            geography={geography}
            maltreatmentTypes={maltreatmentTypes}
            year={year}
            showRate={showRate}
            selectedGeographicFeature={selectedGeographicFeature}
            data={data}
          />
          {/* {!protxMaltreatmentDistribution.loading && ( */}
          <ChartInstructions currentReportType="hidden" />
          {/* )} */}
        </div>
      );
    }

    // NEW PLOT (MIMICS DEMOGRAPHICS).
    /*
    const protxMaltreatmentDistribution = useSelector(
      state => state.protxDemographicsDistribution
    );
    const dispatch = useDispatch();

    useEffect(() => {
      if (observedFeature === 'maltreatment') {
        return;
      }
      if (selectedGeographicFeature) {
        dispatch({
          type: 'FETCH_PROTX_MALTREATMENT_DISTRIBUTION',
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
        <div className="observed-features-chart">
          <ObservedFeaturesPlot
            geography={geography}
            observedFeature={observedFeature}
            selectedGeographicFeature={selectedGeographicFeature}
            data={data}
          />
          {!protxMaltreatmentDistribution.loading && (
            <ChartInstructions currentReportType="hidden" />
          )}
        </div>
      );
    }
    */
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
