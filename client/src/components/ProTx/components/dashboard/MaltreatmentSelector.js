import React, { useEffect, useState } from 'react';
import MultiSelect from 'react-multi-select-component';
import PropTypes from 'prop-types';
import { MALTREATMENT } from '../data/meta';
import './MaltreatmentSelector.css';

const MaltreatmentSelector = ({ selectedTypes, setSelectedTypes }) => {
  const [selected, setSelected] = useState([]);

  const options = MALTREATMENT.map(feature => {
    return { label: feature.name, value: feature.field };
  });

  const overideStrings = {
    allItemsAreSelected: 'All'
  };

  const customValueRenderer = (currentSelectedTypes, _options) => {
    if (currentSelectedTypes.length) {
      if (currentSelectedTypes.length === 1) {
        return currentSelectedTypes.map(({ label }) => label);
      }
      if (currentSelectedTypes.length === _options.length) {
        return [` All selected (${currentSelectedTypes.length})`];
      }
      return [
        ` Multiple maltreatment selected (${currentSelectedTypes.length})`
      ];
    }
    return 'None';
  };

  useEffect(() => {
    const updatedSelected = selectedTypes.map(val => {
      const meta = MALTREATMENT.find(element => element.field === val);
      return { label: meta.name, value: meta.field };
    });
    setSelected(updatedSelected);
  }, [selectedTypes]);

  const handleChange = newSelection => {
    const newSelectionTypes = newSelection.map(e => e.value);
    setSelectedTypes(newSelectionTypes);
  };

  return (
    <MultiSelect
      options={options}
      value={selected}
      onChange={handleChange}
      labelledBy="Select"
      overrideStrings={overideStrings}
      valueRenderer={customValueRenderer}
    />
  );
};

MaltreatmentSelector.propTypes = {
  selectedTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  setSelectedTypes: PropTypes.func.isRequired
};

export default MaltreatmentSelector;
