import React, { useEffect, useState } from 'react';
import MultiSelect from 'react-multi-select-component';
import PropTypes from 'prop-types';
import { MALTREATMENT } from '../meta';

const MaltreatmentSelector = ({ selectedTypes, setSelectedTypes }) => {
  const [selected, setSelected] = useState([]);

  const options = MALTREATMENT.map(feature => {
    return { label: feature.name, value: feature.field };
  });

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
    />
  );
};

MaltreatmentSelector.propTypes = {
  selectedTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  setSelectedTypes: PropTypes.func.isRequired
};

export default MaltreatmentSelector;
