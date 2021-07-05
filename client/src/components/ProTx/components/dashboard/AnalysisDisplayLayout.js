import React from 'react';
import './AnalysisDisplayLayout.css';
import PropTypes from 'prop-types';
import MainMap from '../maps/MainMap';
import MainChart from '../charts/MainChart';

function AnalysisDisplayLayout({
  mapType,
  geography,
  maltreatmentTypes,
  observedFeature,
  year,
  selectedGeographicFeature,
  setSelectedGeographicFeature,
  data
}) {
  return (
    <div className="display-layout-root">
      <div className="display-layout-map">
        <MainMap
          mapType={mapType}
          geography={geography}
          maltreatmentTypes={maltreatmentTypes}
          observedFeature={observedFeature}
          year={year}
          data={data}
          setSelectedGeographicFeature={setSelectedGeographicFeature}
        />
      </div>
      <div className="display-layout-chart">
        <MainChart
          mapType={mapType}
          geography={geography}
          maltreatmentTypes={maltreatmentTypes}
          observedFeature={observedFeature}
          year={year}
          selectedGeographicFeature={selectedGeographicFeature}
          data={data}
        />
      </div>
    </div>
  );
}

AnalysisDisplayLayout.propTypes = {
  mapType: PropTypes.string.isRequired,
  geography: PropTypes.string.isRequired,
  maltreatmentTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  observedFeature: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  selectedGeographicFeature: PropTypes.string.isRequired,
  setSelectedGeographicFeature: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired
};

export default AnalysisDisplayLayout;