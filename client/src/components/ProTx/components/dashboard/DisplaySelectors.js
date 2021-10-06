import React from 'react';
import PropTypes from 'prop-types';
import { DropdownSelector } from '_common';
import MaltreatmentSelector from './MaltreatmentSelector';
import {
  OBSERVED_FEATURES,
  OBSERVED_FEATURES_TOP_FIELDS,
  SUPPORTED_YEARS
} from '../data/meta';
import './DisplaySelectors.module.scss';

/* Radio buttons for types of values to display in dropdown (see COOKS-110 for next steps) */
function RateSelector({ showRate, setShowRate }) {
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
            checked={showRate}
            onChange={() => setShowRate(true)}
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
            checked={!showRate}
            onChange={() => setShowRate(false)}
          />
          Totals
        </label>
      </div>
    </div>
  );
}

RateSelector.propTypes = {
  showRate: PropTypes.bool.isRequired,
  setShowRate: PropTypes.func.isRequired
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
  showRate,
  setGeography,
  setMaltreatmentTypes,
  setObservedFeature,
  setYear,
  setShowRate,
  limitToTopObservedFeatureFields
}) {
  const disableGeography = mapType === 'maltreatment' || setGeography === null;
  const disabledYear = mapType === 'observedFeatures' || setYear == null;

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
            <option value="dfps_region" disabled>
              DFPS Regions
            </option>
            <option
              value="tract"
              disabled
              /* # Support county and tract for https://jira.tacc.utexas.edu/browse/COOKS-135 */
            >
              Census Tracts
            </option>
            <option value="county">Counties</option>
            <option value="cbsa" disabled>
              Core base statistical areas
            </option>
            <option value="urban_area" disabled>
              Urban Areas
            </option>
            <option value="zcta" disabled>
              Zip Codes
            </option>
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
      {(mapType === 'observedFeatures' || mapType === 'predictiveFeatures') && (
        <>
          {setShowRate && (
            <div styleName="control">
              <span styleName="label">Value</span>
              <RateSelector showRate={showRate} setShowRate={setShowRate} />
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
                  return true;
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
  showRate: PropTypes.bool.isRequired,
  setGeography: PropTypes.func,
  setMaltreatmentTypes: PropTypes.func.isRequired,
  setObservedFeature: PropTypes.func.isRequired,
  setYear: PropTypes.func,
  setShowRate: PropTypes.func,
  limitToTopObservedFeatureFields: PropTypes.bool
};

DisplaySelectors.defaultProps = {
  setGeography: null,
  setYear: null,
  setShowRate: null,
  limitToTopObservedFeatureFields: false
};

export default DisplaySelectors;
