import React from 'react';
import PropTypes from 'prop-types';
import Plot from 'react-plotly.js';
import {
  getFipsIdName,
  capitalizeString,
  cleanValue,
  getObservedFeaturesLabel
} from '../shared/dataUtils';
import { getObservedFeaturesPlotData } from '../shared/plotUtils';
import DebugPlot from './DebugPlot';
import './ObservedFeaturesPlot.css';

function ObservedFeaturesPlot({
  mapType,
  geography,
  maltreatmentTypes,
  observedFeature,
  year,
  selectedGeographicFeature,
  data,
  debug
}) {
  const PLOT_TYPE = 'observedFeatures';
  const getObservedFeaturesChartLayout = (
    mapTypeObservedFeatures,
    geographyObservedFeatures,
    yearObservedFeatures,
    observedFeatureObservedFeatures,
    selectedGeographicFeatureObservedFeatures,
    plotStateObservedFeatures,
    currentTargetValue
  ) => {
    const observedFeaturesLabel = getObservedFeaturesLabel(
      observedFeatureObservedFeatures
    );
    const selectedGeographicFeatureName = getFipsIdName(
      selectedGeographicFeatureObservedFeatures
    );
    const geographyType = capitalizeString(geographyObservedFeatures);
    const observedFeatureTotalCount = cleanValue(currentTargetValue);

    return (
      <div className="observed-features-plot-layout">
        <div className="observed-features-plot-header">
          <div className="observed-features-plot-info">
            <div className="observed-features-plot-info-item">
              <div className="observed-features-plot-selected-region">
                <span className="observed-features-plot-selected-region-label">
                  {geographyType}
                </span>
                <span className="observed-features-plot-selected-region-value">
                  {selectedGeographicFeatureName}
                </span>
                <span className="observed-features-plot-selected-region-code">
                  ({selectedGeographicFeatureObservedFeatures})
                </span>
              </div>
              <div className="observed-features-plot-aggregated-count">
                <span className="observed-features-plot-aggregated-count-label">
                  Total
                </span>
                <span className="observed-features-plot-aggregated-count-value">
                  {observedFeatureTotalCount}
                </span>
              </div>
            </div>
          </div>
          <div className="observed-features-plot-info">
            <div className="observed-features-plot-selected-feature">
              <span className="observed-features-plot-selected-feature-label">
                Feature
              </span>
              <span className="observed-features-plot-selected-feature-value">
                {observedFeaturesLabel}
              </span>
            </div>
          </div>
        </div>
        <div className="observed-features-plot-chart-body">
          <div className="observed-features-plot-chart-body-plot">
            <Plot
              data={plotStateObservedFeatures.data}
              layout={plotStateObservedFeatures.layout}
              config={plotStateObservedFeatures.config}
              useResizeHandler
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </div>
        <div className="observed-features-plot-chart-footer">
          <span className="observed-features-plot-chart-summary">
            This chart was generated using data for{' '}
            {selectedGeographicFeatureName} {geographyObservedFeatures} (code{' '}
            {selectedGeographicFeatureObservedFeatures}) based on the{' '}
            <span className="observed-features-plot-selected-type-value">
              {yearObservedFeatures} US Census Data
            </span>{' '}
            for{' '}
            <span className="observed-features-plot-selected-type-summary">
              {observedFeaturesLabel}
            </span>
          </span>
        </div>
      </div>
    );
  };

  const observedFeaturesPlotData = getObservedFeaturesPlotData(
    selectedGeographicFeature,
    observedFeature,
    data,
    geography,
    year
  );

  const fipsIdValue = getFipsIdName(selectedGeographicFeature);
  const geoId = `${selectedGeographicFeature}:${fipsIdValue}`;

  const observedFeaturesChartLayout = getObservedFeaturesChartLayout(
    mapType,
    geography,
    year,
    observedFeature,
    selectedGeographicFeature,
    observedFeaturesPlotData.observedFeaturesPlotState,
    observedFeaturesPlotData.observedFeatureTargetValue
  );

  if (debug) {
    return (
      <DebugPlot
        className="plot-debug"
        mapType={mapType}
        geography={geography}
        maltreatmentTypes={maltreatmentTypes}
        observedFeature={observedFeature}
        year={year}
        selectedGeographicFeature={selectedGeographicFeature}
        fipsIdValue={fipsIdValue}
        geoId={geoId}
        plotType={PLOT_TYPE}
        plotData={observedFeaturesPlotData}
        data={data}
      />
    );
  }

  return (
    <div className="observed-features-plot">{observedFeaturesChartLayout}</div>
  );
}

ObservedFeaturesPlot.propTypes = {
  mapType: PropTypes.string.isRequired,
  geography: PropTypes.string.isRequired,
  maltreatmentTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  observedFeature: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  selectedGeographicFeature: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired,
  /** Render component data in debug mode. */
  debug: PropTypes.bool
};

ObservedFeaturesPlot.defaultProps = {
  debug: false
};

export default ObservedFeaturesPlot;
