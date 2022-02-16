import React from 'react';
import PropTypes from 'prop-types';
import Plot from 'react-plotly.js';
import './MaltreatmentPlot.css';

function MaltreatmentTypesPlot({ plotState }) {
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

MaltreatmentTypesPlot.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  plotState: PropTypes.object.isRequired
};

MaltreatmentTypesPlot.defaultProps = {};

export default MaltreatmentTypesPlot;
