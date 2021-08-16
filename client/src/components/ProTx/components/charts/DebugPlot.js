import React from 'react';
import PropTypes from 'prop-types';
import './DebugPlot.css';

function DebugPlotRedux({
  mapType,
  geography,
  maltreatmentTypes,
  observedFeature,
  year,
  selectedGeographicFeature,
  fipsIdValue,
  geoId,
  plotType,
  plotData,
  data
}) {
  // console.log(mapType);
  // console.log(geography);
  // console.log(maltreatmentTypes);
  // console.log(observedFeature);
  // console.log(year);
  // console.log(selectedGeographicFeature);
  // console.log(fipsIdValue);
  // console.log(geoId);
  // console.log(plotType);
  // console.log(plotData);
  // console.log(data);

  const getSelectionDataTable = (
    mapTypeDebug,
    geographyDebug,
    maltreatmentTypesDebug,
    observedFeatureDebug,
    yearDebug,
    selectedGeographicFeatureDebug,
    fipsIdValueDebug,
    geoIdDebug
  ) => {
    return (
      <div className="debug-selection-data">
        <div className="debug-selection-data-title">
          Component Selection State
        </div>
        <ul className="debug-selection-data-table">
          <li>mapType: {mapTypeDebug}</li>
          <li>geography: {geographyDebug}</li>
          <li className="debug-selection-data-title">maltreatmentTypes</li>
          <ul className="debug-plot-data-table">
            {maltreatmentTypesDebug.map(function malTypesList(mtt, mttId) {
              return <li className="inline-list">{mtt}</li>;
            })}
          </ul>
          <li>observedFeature: {observedFeatureDebug}</li>
          <li>year: {yearDebug}</li>
          <li>selectedGeographicFeature: {selectedGeographicFeatureDebug}</li>
          <li>fipsIdValue: {fipsIdValueDebug}</li>
          <li>geoId: {geoIdDebug}</li>
        </ul>
      </div>
    );
  };

  const getPlotDataTable = (plotTypeDebug, plotDataDebug) => {
    if (plotTypeDebug === 'maltreatmentTypes') {
      return (
        <div className="debug-plot-data">
          <div className="debug-plot-data-title">Component Plot State</div>
          <table className="debug-data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>X.0 (Type)</th>
                <th>Y.0 (Count)</th>
                <th>Marker Hex</th>
                <th>Color</th>
              </tr>
            </thead>
            <tbody>
              {plotDataDebug.malPlotState.data.map(function plotStateDataTable(
                pd,
                pdId
              ) {
                const divStyle = {
                  backgroundColor: pd.marker.color
                };
                return (
                  <tr className="debug-plot-data-table">
                    <td className="debug-plot-data-table-feature">{pd.name}</td>
                    <td>{pd.x[0]}</td>
                    <td>{pd.y[0]}</td>
                    <td>{pd.marker.color}</td>
                    <td style={divStyle}>&nbsp;</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="debug-plot-data-title">Types Aggregate</div>
          <ul className="debug-plot-data-table">
            <li>{plotDataDebug.malTypesAggregate}</li>
          </ul>
          <div className="debug-plot-data-title">Types List</div>
          <ul className="debug-plot-data-table">
            {plotDataDebug.malTypesList.map(function plotTypesList(mtl, mtlId) {
              return <li>{mtl}</li>;
            })}
          </ul>
        </div>
      );
    }

    if (plotTypeDebug === 'observedFeatures') {
      // console.log(plotDataDebug);
      return (
        <div className="debug-plot-data">
          <div className="debug-plot-data-title">Component Plot State</div>
          <table className="debug-data-table">
            <tr>
              <td>OBSERVED FEATURES PLOT DATA</td>
            </tr>
          </table>
        </div>
      );
    }

    if (plotTypeDebug === 'predictiveFeatures') {
      return (
        <div className="debug-plot-data">
          <div className="debug-plot-data-title">Component Plot State</div>
          <table className="debug-data-table">
            <tr>
              <td>PREDICTIVE FEATURES PLOT DATA</td>
            </tr>
          </table>
        </div>
      );
    }

    return (
      <div className="debug-plot-data">
        <div className="debug-plot-data-title">Component Plot State</div>
        <table className="debug-data-table">
          <tr>
            <td>UNRECOGNIZED PLOT DATA</td>
          </tr>
        </table>
      </div>
    );
  };

  const getDebugInfo = (selectionDataTableDebug, plotDataTableDebug) => {
    return (
      <div className="debug-info">
        <div className="debug-status">PLOT COMPONENT DEBUGGING MODE ACTIVE</div>
        {/* <div className="debug-header">Chart Component Data</div> */}
        {selectionDataTableDebug}
        {plotDataTableDebug}
      </div>
    );
  };

  const selectionDataTable = getSelectionDataTable(
    mapType,
    geography,
    maltreatmentTypes,
    observedFeature,
    year,
    selectedGeographicFeature,
    fipsIdValue,
    geoId
  );

  const plotDataTable = getPlotDataTable(plotType, plotData);
  const debugInfo = getDebugInfo(selectionDataTable, plotDataTable);

  return <div className="debug-plot">{debugInfo}</div>;
}

DebugPlotRedux.propTypes = {
  mapType: PropTypes.string.isRequired,
  geography: PropTypes.string.isRequired,
  maltreatmentTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  observedFeature: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  selectedGeographicFeature: PropTypes.string.isRequired,
  fipsIdValue: PropTypes.string.isRequired,
  geoId: PropTypes.string.isRequired,
  plotType: PropTypes.string.isRequired,
  plotData: PropTypes.arrayOf(PropTypes.object).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired
};

export default DebugPlotRedux;
