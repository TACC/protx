import React from 'react';
import PropTypes from 'prop-types';
import { MALTREATMENT } from '../meta'; /* OBSERVED_FEATURES, */
import {
  getObservedFeatureValue,
  getMaltreatmentAggregatedValue,
  getMaltreatmentSelectedValues
} from '../util';
import './DebugPlot.css';
// import './ConfigurableChart.css';

function DebugPlot({
  mapType,
  geography,
  maltreatmentTypes,
  observedFeature,
  year,
  selectedGeographicFeature,
  data
}) {
  // Define Data Marshalling Methods.

  const getMaltreatmentTypeNames = maltreatmentTypeCodes => {
    const updatedMaltreatmentTypesList = [];
    if (maltreatmentTypeCodes.length === 0) {
      return ['None'];
    }
    for (let i = 0; i < maltreatmentTypeCodes.length; i += 1) {
      for (let j = 0; j < maltreatmentMeta.length; j += 1) {
        if (maltreatmentTypeCodes[i] === maltreatmentMeta[j].field) {
          updatedMaltreatmentTypesList.push(maltreatmentMeta[j].name);
        }
      }
    }
    return updatedMaltreatmentTypesList;
  };

  const getMaltreatmentTypesDataObject = (codeArray, nameArray, valueArray) => {
    const newMaltreatmentDataObject = [];
    for (let i = 0; i < codeArray.length; i += 1) {
      const dataObject = {};
      dataObject.code = codeArray[i];
      dataObject.name = nameArray[i];
      dataObject.value = valueArray[i];
      newMaltreatmentDataObject.push(dataObject);
    }
    return newMaltreatmentDataObject;
  };

  // Variable Assignment Using Data Marshalling Methods.

  const maltreatmentMeta = MALTREATMENT;
  const geoid = selectedGeographicFeature;

  const observedFeatureValue = getObservedFeatureValue(
    data,
    geography,
    year,
    geoid,
    observedFeature
  );

  const maltreatmentTypesList = getMaltreatmentTypeNames(maltreatmentTypes);

  const maltreatmentTypesDataValues = getMaltreatmentSelectedValues(
    data,
    geography,
    year,
    geoid,
    maltreatmentTypes
  );

  const maltreatmentTypesDataAggregate = getMaltreatmentAggregatedValue(
    data,
    geography,
    year,
    geoid,
    maltreatmentTypes
  );

  const maltreatmentTypesDataObject = getMaltreatmentTypesDataObject(
    maltreatmentTypes,
    maltreatmentTypesList,
    maltreatmentTypesDataValues
  );

  // Define Element Rendering Methods.

  const getSelectionDataList = (
    mapTypeDebug,
    geographyDebug,
    yearDebug,
    observedFeatureDebug,
    observedGeographicFeatureDebug,
    geoidDebug,
    observedFeatureValueDebug,
    maltreatmentTypesDataAggregateDebug
  ) => {
    return (
      <ul>
        <li>mapType: {mapTypeDebug}</li>
        <li>geography: {geographyDebug}</li>
        <li>observedFeature: {observedFeatureDebug}</li>
        <li>observedFeatureValue: {observedFeatureValueDebug}</li>
        <li>
          observedGeographicFeature:
          {observedGeographicFeatureDebug}
        </li>
        <li>geoid: {geoidDebug}</li>
        <li>year: {yearDebug}</li>
        <li>
          maltreatmentTypesDataAggregate:
          {maltreatmentTypesDataAggregateDebug}
        </li>
      </ul>
    );
  };

  const getMaltreatmentDataTable = maltreatmentTypesDataObjectDebug => {
    return (
      <table className="debug-data-table">
        <tr>
          <th>type code</th>
          <th>type name</th>
          <th>type value</th>
        </tr>
        {maltreatmentTypesDataObjectDebug.map(maltreatmentTypeData => (
          <tr>
            <td>{maltreatmentTypeData.code}</td>
            <td>{maltreatmentTypeData.name}</td>
            <td>{maltreatmentTypeData.value}</td>
          </tr>
        ))}
      </table>
    );
  };

  const getDebugInfo = (selectionDataDebug, maltreatmentDataTableDebug) => {
    return (
      <div className="configurable-chart">
        <div className="debug-info">
          <div className="debug-status">DEBUGGING MODE ACTIVE</div>
          <div className="debug-header">Chart Component Data</div>
          {selectionDataDebug}
          {maltreatmentDataTableDebug}
        </div>
      </div>
    );
  };

  // Generate Elements Using Element Rendering Methods.

  const selectionDataList = getSelectionDataList(
    mapType,
    geography,
    year,
    observedFeature,
    selectedGeographicFeature,
    geoid,
    observedFeatureValue,
    maltreatmentTypesDataAggregate
  );

  const maltreatmentDataTable = getMaltreatmentDataTable(
    maltreatmentTypesDataObject
  );

  const debugInfo = getDebugInfo(selectionDataList, maltreatmentDataTable);

  // Render Component.

  return <div className="configurable-chart">{debugInfo}</div>;
}

DebugPlot.propTypes = {
  mapType: PropTypes.string.isRequired,
  geography: PropTypes.string.isRequired,
  maltreatmentTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  observedFeature: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  selectedGeographicFeature: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired
};

export default DebugPlot;
