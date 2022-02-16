import React from 'react';
import PropTypes from 'prop-types';
import Plot from 'react-plotly.js';
import './AnalyticsPlot.css';

function AnalyticsPlot({ plotState }) {
  return (
    <div className="predictive-features-plot-chart">
      <Plot
        divId="predictive-features-plot"
        className="predictive-features-plot"
        data={plotState.data}
        layout={plotState.layout}
        config={plotState.config}
        useResizeHandler
      />
    </div>
  );
}

AnalyticsPlot.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  plotState: PropTypes.object.isRequired
};

AnalyticsPlot.defaultProps = {};

export default AnalyticsPlot;
