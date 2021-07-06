import React from 'react';
import PropTypes from 'prop-types';
import Plot from 'react-plotly.js';
import './MaltreatmentTypesPlot.css';
import DebugPlot from './DebugPlot';
import { OBSERVED_FEATURES, MALTREATMENT } from '../meta';
import {
  getObservedFeatureValue,
  getMaltreatmentAggregatedValue,
  getMaltreatmentSelectedValues
} from '../util';

// Set this to true to inspect the component data in a tabular view.
// This will hide he chart rendering.
const debugState = true;

function MaltreatmentTypesPlot({
  mapType,
  geography,
  maltreatmentTypes,
  observedFeature,
  year,
  selectedGeographicFeature,
  data
}) {
  if (debugState) {
    // return <div className="configurable-chart">{debugInfo}</div>;
    return (
      <DebugPlot
        className="plot-debug"
        mapType={mapType}
        geography={geography}
        maltreatmentTypes={maltreatmentTypes}
        observedFeature={observedFeature}
        year={year}
        selectedGeographicFeature={selectedGeographicFeature}
        data={data}
      />
    );
  }

  return <div>MaltreatmentTypesPlot from ConfigurableChart refactor.</div>;
}

MaltreatmentTypesPlot.propTypes = {
  mapType: PropTypes.string.isRequired,
  geography: PropTypes.string.isRequired,
  maltreatmentTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  observedFeature: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  selectedGeographicFeature: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired
};

export default MaltreatmentTypesPlot;
