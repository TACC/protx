import React from 'react';
import PropTypes from 'prop-types';
import { DropdownSelector } from '_common';
import { OBSERVED_FEATURES, MALTREATMENT, SUPPORTED_YEARS } from '../meta';
import './DisplaySelectors.module.scss';

function DisplaySelectors({
  mapType,
  geography,
  maltreatmentType,
  observedFeature,
  year,
  setMapType,
  setGeography,
  setMaltreatmentType,
  setObservedFeature,
  setYear
}) {
  const changeMapType = event => {
    const newMapType = event.target.value;
    if (newMapType === 'maltreatment') {
      // maltreatment only has county data
      setGeography('county');
    } else {
      // observedFeatures (i.e. Demographic Features only has 2019 data)
      setYear(2019);
    }
    setMapType(event.target.value);
  };
  return (
    <div styleName="root">
      <div styleName="control">
        <span styleName="label">Map</span>
        <DropdownSelector value={mapType} onChange={changeMapType}>
          <optgroup label="Select Map">
            <option value="observedFeatures">Demographic Features</option>
            <option value="maltreatment">Maltreatment</option>
          </optgroup>
        </DropdownSelector>
      </div>
      <div styleName="control">
        <span styleName="label">Area</span>
        <DropdownSelector
          value={geography}
          onChange={event => setGeography(event.target.value)}
          disabled={mapType === 'maltreatment'}
        >
          <optgroup label="Select Areas">
            <option value="dfps_region">DFPS Regions</option>
            <option value="census_tract">Census Tracts</option>
            <option value="county">Counties</option>
            <option value="cbsa">Core base statistical areas</option>
            <option value="urban_area">Urban Areas</option>
            <option value="zcta">Zip Codes</option>
          </optgroup>
        </DropdownSelector>
      </div>
      {mapType === 'maltreatment' && (
        <div styleName="control">
          <span styleName="label">Type</span>
          <DropdownSelector
            value={maltreatmentType}
            onChange={event => setMaltreatmentType(event.target.value)}
          >
            <optgroup label="Select Maltreatment Type">
              {MALTREATMENT.map(feature => (
                <option key={feature.field} value={feature.field}>
                  {feature.name}
                </option>
              ))}
            </optgroup>
          </DropdownSelector>
        </div>
      )}
      {mapType === 'observedFeatures' && (
        <div styleName="control">
          <span styleName="label">Feature</span>
          <DropdownSelector
            value={observedFeature}
            onChange={event => setObservedFeature(event.target.value)}
          >
            <optgroup label="Select Observed Feature">
              {OBSERVED_FEATURES.map(feature => (
                <option key={feature.field} value={feature.field}>
                  {feature.name}
                </option>
              ))}
            </optgroup>
          </DropdownSelector>
        </div>
      )}
      <div styleName="control">
        <span styleName="label">Select TimeFrame</span>
        <DropdownSelector
          value={year}
          onChange={event => setYear(event.target.value)}
          disabled={mapType === 'observedFeatures'}
        >
          <optgroup label="Select Timeframe" />
          {SUPPORTED_YEARS.map(y => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </DropdownSelector>
      </div>
    </div>
  );
}

DisplaySelectors.propTypes = {
  mapType: PropTypes.string.isRequired,
  geography: PropTypes.string.isRequired,
  maltreatmentType: PropTypes.string.isRequired,
  observedFeature: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  setMapType: PropTypes.func.isRequired,
  setGeography: PropTypes.func.isRequired,
  setMaltreatmentType: PropTypes.func.isRequired,
  setObservedFeature: PropTypes.func.isRequired,
  setYear: PropTypes.func.isRequired
};

export default DisplaySelectors;
