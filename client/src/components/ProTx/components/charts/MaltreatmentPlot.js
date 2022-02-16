import React from 'react';
import PropTypes from 'prop-types';
import Plot from 'react-plotly.js';
import './MaltreatmentPlot.css';

function MaltreatmentPlot({ plotState }) {
  return (
    <div className="maltreatment-types-plot-chart">
      <Plot
        divId="maltreatment-types-plot"
        className="maltreatment-types-plot"
        data={plotState.data}
        layout={plotState.layout}
        config={plotState.config}
        useResizeHandler
      />
    </div>
  );
}

MaltreatmentPlot.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  plotState: PropTypes.object.isRequired
};

MaltreatmentPlot.defaultProps = {};

export default MaltreatmentPlot;
