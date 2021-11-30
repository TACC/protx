import React from 'react';
import PropTypes from 'prop-types';
import './ChartInstructions.css';

function ChartInstructions({ currentReportType }) {
  // Observed Features.
  const observedFeaturesDropdownInstructions = [
    'Select an Area.',
    'Select a Demographic Feature.',
    'TimeFrame is restricted to the last census count from 2019.'
  ];
  const observedFeaturesMapInstructions = ['Select a Geographic Region.'];
  const observedFeaturesShowDescription = true;
  const observedFeaturesDescription =
    'Demographic feature percents/counts for individual geographic regions with the selected observable feature during the selected timeframe.';

  // Maltreatment Types.
  const maltreatmentDropdownInstructions = [
    'Using Map Type Maltreatment',
    'Data is restricted to the county area',
    'Select one or more Maltreatment Types',
    'Select a Year'
  ];
  const maltreatmentMapInstructions = ['Select a Geographic Region'];
  const maltreatmentShowDescription = true;
  const maltreatmentDescription =
    'Maltreatment counts for individual geographic regions with specifc maltreatment types during the selected year.';

  // Predictive Features.
  const predictiveFeaturesDropdownInstructions = [
    'Map is restricted to the County Area.',
    'Demographic is restrcited to the top seven predictive features.',
    'Year is restricted to 2019 (the most recent census data).'
  ];
  const predictiveFeaturesMapInstructions = ['Select a Geographic Region.'];
  const predictiveFeaturesShowDescription = false;
  const predictiveFeaturesDescription = 'Description needed.';

  const instructions = {
    observed: {
      dd: observedFeaturesDropdownInstructions,
      map: observedFeaturesMapInstructions,
      showDesc: observedFeaturesShowDescription,
      desc: observedFeaturesDescription
    },
    maltreatment: {
      dd: maltreatmentDropdownInstructions,
      map: maltreatmentMapInstructions,
      showDesc: maltreatmentShowDescription,
      desc: maltreatmentDescription
    },
    predictive: {
      dd: predictiveFeaturesDropdownInstructions,
      map: predictiveFeaturesMapInstructions,
      showDesc: predictiveFeaturesShowDescription,
      desc: predictiveFeaturesDescription
    }
  };

  console.log(instructions);

  // const getCurrentDescription = (
  //   showCurrentDescription,
  //   currentDescription
  // ) => {
  //   if (showCurrentDescription) {
  //     return (
  //       <div>
  //         <div className="chart-description-label">Description</div>
  //         <div className="chart-description">{currentDescription}</div>
  //       </div>
  //     );
  //   }
  //   return <div />;
  // };

  // const currentDescription = getCurrentDescription(
  //   showDescription,
  //   description
  // );

  return (
    <div className="chart-instructions">
      <div className="chart-instructions-label">Instructions</div>
      <div>Current Report Type: {currentReportType}</div>
      {/* <div>{instructions[predictive][desc]}</div> */}
      {/* <h3>In the Dropdown Selection Menu (top):</h3>
      <ul>
        {dropdownInstructions.map(instruction => (
          <li key={instruction}>{instruction}</li>
        ))}
      </ul>
      <h3>On the Map (left):</h3>
      <ul>
        {mapInstructions.map(instruction => (
          <li key={instruction}>{instruction}</li>
        ))}
      </ul>
      {currentDescription} */}
    </div>
  );
}

ChartInstructions.propTypes = {
  currentReportType: PropTypes.string.isRequired
};

export default ChartInstructions;
