import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { DropdownSelector } from '_common';
import MaltreatmentSelector from './MaltreatmentSelector';
import {
  OBSERVED_FEATURES,
  OBSERVED_FEATURES_TOP_FIELDS,
  SUPPORTED_YEARS
} from '../data/meta';
import { compareSimplifiedValueType } from '../shared/dataUtils';
import './DisplaySelectors.module.scss';

/* Radio buttons for types of values to display in dropdown (see COOKS-110 for next steps) */
function ValueTypeSelector({ valueType, setValueType }) {
  return (
    <div styleName="radio-container">
      <div className="radio-container-element">
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label>
          <input
            className="radio-button"
            type="radio"
            value="percent"
            styleName="radio-button"
            checked={valueType === 'percent'}
            onChange={() => setValueType('percent')}
          />
          Percentages
        </label>
      </div>
      <div className="radio">
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label>
          <input
            className="radio-button"
            type="radio"
            value="total"
            styleName="radio-button"
            checked={valueType === 'total'}
            onChange={() => setValueType('total')}
          />
          Totals
        </label>
      </div>
    </div>
  );
}

ValueTypeSelector.propTypes = {
  valueType: PropTypes.string.isRequired,
  setValueType: PropTypes.func.isRequired
};

/**
 * Selectors (i.e. dropdowns) to allow users to select what to display on maps/charts
 *
 * Customizations:
 * - if `setGeography` or `setYear` are not set then the associated dropdown is disabled
 * - if 'limitToTopObservedFeatureFields' then a limited set of demographic data is selectable
 *    (and user can't switch between value types like between percent/total)
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
  setGeography,
  setMaltreatmentTypes,
  setObservedFeature,
  setYear,
  limitToTopObservedFeatureFields
}) {
  const [valueType, setValueType] = useState('percent');
  const disableGeography = mapType === 'maltreatment' || setGeography === null;
  const disabledYear = mapType === 'observedFeatures' || setYear == null;

  const switchValueType = newValueType => {
    setValueType(newValueType);
    const obsFeature = OBSERVED_FEATURES.find(f => observedFeature === f.field);
    if (!compareSimplifiedValueType(obsFeature, newValueType)) {
      // ensure the current observed feature is of that type
      const firstFeatureWithMatchingValueType = OBSERVED_FEATURES.find(f =>
        compareSimplifiedValueType(f, newValueType)
      );
      setObservedFeature(firstFeatureWithMatchingValueType.field);
    }
  };

  return (
    <div styleName="display-selectors">
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
        <>
          {!limitToTopObservedFeatureFields && (
            <div styleName="control">
              <span styleName="label">Value</span>
              <ValueTypeSelector
                valueType={valueType}
                setValueType={switchValueType}
              />
            </div>
          )}
          <div styleName="control">
            <span styleName="label">Demographic</span>
            <DropdownSelector
              value={observedFeature}
              onChange={event => setObservedFeature(event.target.value)}
            >
              <optgroup label="Select demographic feature">
                {OBSERVED_FEATURES.filter(f => {
                  if (limitToTopObservedFeatureFields) {
                    return OBSERVED_FEATURES_TOP_FIELDS.includes(f.field);
                  }
                  return compareSimplifiedValueType(f, valueType);
                }).map(f => (
                  <option key={f.field} value={f.field}>
                    {f.name}
                  </option>
                ))}
              </optgroup>
            </DropdownSelector>
          </div>
        </>
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
  setGeography: PropTypes.func,
  setMaltreatmentTypes: PropTypes.func.isRequired,
  setObservedFeature: PropTypes.func.isRequired,
  setYear: PropTypes.func,
  limitToTopObservedFeatureFields: PropTypes.bool
};

DisplaySelectors.defaultProps = {
  setGeography: null,
  setYear: null,
  limitToTopObservedFeatureFields: false
};

export default DisplaySelectors;
