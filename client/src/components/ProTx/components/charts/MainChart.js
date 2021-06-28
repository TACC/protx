import React from 'react';
import './MainChart.css';
<<<<<<< HEAD
import PropTypes from 'prop-types';
// import ScatterBarChart from './ScatterBarChart';
// import ScatterBarChart from './ScatterBarChart';
// import StackedBarChart from './StackedBarChart';
=======
>>>>>>> 22dca75f (Removed some unused cull for old charts. Updated a css selector for the chart layout on header info.)
import ConfigurableChart from './ConfigurableChart';

function MainChart({
  mapType,
  geography,
  maltreatmentTypes,
  observedFeature,
  year,
  selectedGeographicFeature,
  data
}) {
  const selectedFeatureInfo = selectedGeographicFeature || 'NONE';
  return (
    <div className="main-chart">
<<<<<<< HEAD
      <span style={{ color: 'red' }}>
        mapType: {mapType} geography: {} year: {year} selected feature:{' '}
        {selectedFeatureInfo}
      </span>
      {/* <ScatterBarChart className="chart-diagram" /> */}
      {/* <StackedBarChart className="chart-diagram" /> */}
=======
>>>>>>> 22dca75f (Removed some unused cull for old charts. Updated a css selector for the chart layout on header info.)
      <ConfigurableChart className="chart-diagram" />
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
  data: PropTypes.object.isRequired
};

export default MainChart;
