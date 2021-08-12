import React from 'react';
import PropTypes from 'prop-types';
import './DebugPlot.css';

function DebugPlotRedux({
  mapType,
  geography,
  maltreatmentTypes,
  maltreatmentPlotData,
  observedFeature,
  year,
  selectedGeographicFeature,
  data
}) {
  // console.log(mapType);
  // console.log(geography);
  // console.log(maltreatmentTypes);
  // console.log(maltreatmentPlotData);
  // console.log(observedFeature);
  // console.log(year);
  // console.log(selectedGeographicFeature);
  // console.log(data);

  const getSelectionDataTable = (
    mapTypeDebug,
    geographyDebug,
    maltreatmentTypesDebug,
    observedFeatureDebug,
    yearDebug,
    selectedGeographicFeatureDebug
  ) => {
    return (
      <div className="debug-selection-data">
        <div className="debug-selection-data-title">Selection Data</div>
        <ul className="debug-selection-data-table">
          <li>mapType: {mapTypeDebug}</li>
          <li>geography: {geographyDebug}</li>
          <li>maltreatmentTypesDebug: {maltreatmentTypesDebug}</li>
          <li>observedFeature: {observedFeatureDebug}</li>
          <li>year: {yearDebug}</li>
          <li>selectedGeographicFeature: {selectedGeographicFeatureDebug}</li>
        </ul>
      </div>
    );
  };

  const getPlotDataTable = maltreatmentPlotDataDebug => {
    // console.log(maltreatmentPlotDataDebug);
    // console.log(maltreatmentPlotDataDebug.malTypesAggregate);
    // console.log(maltreatmentPlotDataDebug.malTypesList);
    // console.log(maltreatmentPlotDataDebug.malPlotState);

    return (
      <div className="debug-plot-data">
        <div className="debug-plot-data-title">Plot State</div>
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
            {maltreatmentPlotDataDebug.malPlotState.data.map(
              function plotStateDataTable(pd, pdId) {
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
              }
            )}
          </tbody>
        </table>
        <div className="debug-plot-data-title">Types Aggregate</div>
        <ul className="debug-plot-data-table">
          <li>{maltreatmentPlotDataDebug.malTypesAggregate}</li>
        </ul>
        <div className="debug-plot-data-title">Types List</div>
        <ul className="debug-plot-data-table">
          {maltreatmentPlotDataDebug.malTypesList.map(function plotTypesList(
            mtl,
            mtlId
          ) {
            return <li>{mtl}</li>;
          })}
        </ul>
      </div>
    );
  };

  const getDebugInfo = (selectionDataTableDebug, plotDataTableDebug) => {
    return (
      <div className="debug-info">
        <div className="debug-status">DEBUGGING MODE ACTIVE</div>
        <div className="debug-header">Chart Component Data</div>
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
    selectedGeographicFeature
  );

  const plotDataTable = getPlotDataTable(maltreatmentPlotData);
  const debugInfo = getDebugInfo(selectionDataTable, plotDataTable);

  return <div className="debug-plot">{debugInfo}</div>;
}

DebugPlotRedux.propTypes = {
  mapType: PropTypes.string.isRequired,
  geography: PropTypes.string.isRequired,
  maltreatmentTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  maltreatmentPlotData: PropTypes.arrayOf(PropTypes.object).isRequired,
  observedFeature: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  selectedGeographicFeature: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired
};

export default DebugPlotRedux;
