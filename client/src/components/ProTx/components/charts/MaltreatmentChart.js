import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import ObservedFeaturesPlot from './MaltreatmentPlot';
import ChartInstructions from './ChartInstructions';
import './ObservedFeaturesChart.css';

function MaltreatmentChart({
  mapType,
  geography,
  observedFeature,
  selectedGeographicFeature,
  data,
  showInstructions,
  showRate
}) {
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
  return (
    <div className="observed-features-chart">
      {showInstructions && <ChartInstructions currentReportType="observed" />}
    </div>
  );
}

MaltreatmentChart.propTypes = {
  mapType: PropTypes.string.isRequired,
  geography: PropTypes.string.isRequired,
  observedFeature: PropTypes.string.isRequired,
  selectedGeographicFeature: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired,
  showRate: PropTypes.bool.isRequired,
  showInstructions: PropTypes.bool
};

MaltreatmentChart.defaultProps = {
  showInstructions: false
};

export default MaltreatmentChart;
