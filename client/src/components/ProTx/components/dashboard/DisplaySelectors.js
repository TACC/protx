import React from 'react';
import PropTypes from 'prop-types';
import { DropdownSelector } from '_common';
import MaltreatmentSelector from './MaltreatmentSelector';
import {
  OBSERVED_FEATURES,
  OBSERVED_FEATURES_TOP_FIELDS,
  SUPPORTED_YEARS
} from '../meta';
import './DisplaySelectors.module.scss';

/**
 * Selectors (i.e. dropdowns) to allow users to select what to display on maps/charts
 *
 * Customizations:
 * - if `setMapType`, `setGeography`, `setYear` are not set then the associated dropdown
 * is disabled
 *
 * Note:
 * Maltreatment data is available at the county level.
 * Demographic Features only has 2019 data
 *
 */
function DisplaySelectors({
  mapType,
  geography,
  maltreatmentTypes,
  observedFeature,
  year,
  setMapType,
  setGeography,
  setMaltreatmentTypes,
  setObservedFeature,
  setYear,
  limitToTopObservedFeatureFields
}) {
  const changeMapType = event => {
    const newMapType = event.target.value;
    if (newMapType === 'maltreatment') {
      // maltreatment only has county data
      setGeography('county');
    } else {
      // observedFeatures (i.e. Demographic Features only has 2019 data)
      setYear('2019');
    }
    setMapType(event.target.value);
  };
  const disableMapType = setMapType === null;
  const disableGeography = mapType === 'maltreatment' || setGeography === null;
  const disabledYear = mapType === 'observedFeatures' || setYear == null;

  return (
    <div styleName="display-selectors">
      <div styleName="control">
        <span styleName="label">Map</span>
        <DropdownSelector
          value={mapType}
          disabled={disableMapType}
          onChange={changeMapType}
        >
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
          disabled={disableGeography}
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
          <MaltreatmentSelector
            selectedTypes={maltreatmentTypes}
            setSelectedTypes={setMaltreatmentTypes}
          />
        </div>
      )}
      {mapType === 'observedFeatures' && (
        <div styleName="control">
          <span styleName="label">Demographic</span>
          <DropdownSelector
            value={observedFeature}
            onChange={event => setObservedFeature(event.target.value)}
          >
            <optgroup label="Select demographic feature">
              {OBSERVED_FEATURES.filter(
                f =>
                  !limitToTopObservedFeatureFields ||
                  OBSERVED_FEATURES_TOP_FIELDS.includes(f.field)
              ).map(f => (
                <option key={f.field} value={f.field}>
                  {f.name}
                </option>
              ))}
            </optgroup>
          </DropdownSelector>
        </div>
      )}
      <div styleName="control">
        <span styleName="label">Years</span>
        <DropdownSelector
          value={year}
          onChange={event => setYear(event.target.value)}
          disabled={disabledYear}
        >
          <optgroup label="Select year" />
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
  maltreatmentTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  observedFeature: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  setMapType: PropTypes.func,
  setGeography: PropTypes.func,
  setMaltreatmentTypes: PropTypes.func.isRequired,
  setObservedFeature: PropTypes.func.isRequired,
  setYear: PropTypes.func,
  limitToTopObservedFeatureFields: PropTypes.bool
};

DisplaySelectors.defaultProps = {
  setMapType: null,
  setGeography: null,
  setYear: null,
  limitToTopObservedFeatureFields: false
};

export default DisplaySelectors;
