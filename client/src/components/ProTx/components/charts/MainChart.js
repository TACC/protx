import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import MainPlot from './MainPlot';
import ChartInstructions from './ChartInstructions';
import './MainChart.css';

function MainChart({
  mapType,
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
   * - Anonymize this component so it can handle all charts.
   * - Needs to take all the arguments provided by the DashboardDisplay
   * DisplaySelector component state and properly parse them.
   * - Need to seperate the Plot into the generic Plot component (`MainPlot`) and the plot-specific header layout needed for chart details not included in the plotly figure (`DemographicsDetails`, `MaltreatmentDetails`, `AnalyticsDetails`).
   **/

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
    );
  }

  return (
    <div className="main-chart">
      {showInstructions && <ChartInstructions currentReportType="observed" />}
    </div>
  );
}

MainChart.propTypes = {
  mapType: PropTypes.string.isRequired,
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
  // maltreatmentTypes: [],
  showInstructions: false
  // showRate: false
};

export default MainChart;
