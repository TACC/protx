import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import ObservedFeaturesPlot from './ObservedFeaturesPlot';
import ChartInstructions from './ChartInstructions';
import './ObservedFeaturesChart.css';

function ObservedFeaturesChart({
  mapType,
  geography,
  observedFeature,
  selectedGeographicFeature,
  data,
  showInstructions,
  showRate
}) {
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
      <div className="observed-features-chart">
        <ObservedFeaturesPlot
          geography={geography}
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
    <div className="observed-features-chart">
      {showInstructions && <ChartInstructions currentReportType="observed" />}
    </div>
  );
}

ObservedFeaturesChart.propTypes = {
  mapType: PropTypes.string.isRequired,
  geography: PropTypes.string.isRequired,
  observedFeature: PropTypes.string.isRequired,
  selectedGeographicFeature: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired,
  showRate: PropTypes.bool.isRequired,
  showInstructions: PropTypes.bool
};

ObservedFeaturesChart.defaultProps = {
  showInstructions: false
};

export default ObservedFeaturesChart;
