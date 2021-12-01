import React from 'react';
import PropTypes from 'prop-types';
import './ChartInstructions.css';

function ChartInstructions({ currentReportType }) {
  // const observedFeaturesDropdownInstructions = [
  //   'Select an Area.',
  //   'Select a Demographic Feature.',
  //   'TimeFrame is restricted to the last census count from 2019.'
  // ];
  // const observedFeaturesDescription =
  //   'Demographic feature percents/counts for individual geographic regions with the selected observable feature during the selected timeframe.';

  // const maltreatmentDropdownInstructions = [
  //   'Using Map Type Maltreatment',
  //   'Data is restricted to the county area',
  //   'Select one or more Maltreatment Types',
  //   'Select a Year'
  // ];
  // const maltreatmentDescription =
  //   'Maltreatment counts for individual geographic regions with specifc maltreatment types during the selected year.';

  // const predictiveFeaturesDropdownInstructions = [
  //   'Map is restricted to the County Area.',
  //   'Demographic is restrcited to the top seven predictive features.',
  //   'Year is restricted to 2019 (the most recent census data).'
  // ];

  const instructions = {
    type: '',
    title: '',
    description: 'How to use the instructions description text goes here.',
    selections: {
      subtitle: 'Selecting data values',
      steps: [
        'Usage instruction step 01.',
        'Usage instruction step 02.',
        'Usage instruction step 03.',
        'Usage instruction step 04.'
      ]
    },
    footer: 'Usage instructions summary text goes here.'
  };

  if (currentReportType === 'observed') {
    instructions.type = 'observed';
    instructions.title = 'Using the Demographics Data Reporting Tool';
    // instructions.description = 'How to use the instructions description text goes here.';
    // instructions.selections.subtitle = 'Selecting data values';
    // instructions.selections.steps = [
    //   'Usage instruction step 01.',
    //   'Usage instruction step 02.',
    //   'Usage instruction step 03.',
    //   'Usage instruction step 04.'
    // ];
    // instructions.footer = 'Usage instructions summary text goes here.';
  }

  if (currentReportType === 'maltreatment') {
    instructions.type = 'maltreatment';
    instructions.title = 'Using the Maltreatment Data Reporting Tool';
    // instructions.description = 'How to use the instructions description text goes here.';
    // instructions.selections.subtitle = 'Selecting data values';
    // instructions.selections.steps = [
    //   'Usage instruction step 01.',
    //   'Usage instruction step 02.',
    //   'Usage instruction step 03.',
    //   'Usage instruction step 04.'
    // ];
    // instructions.footer = 'Usage instructions summary text goes here.';
  }

  if (currentReportType === 'predictive') {
    instructions.type = 'predictive';
    instructions.title = 'Using the Analytics Reporting Tool';
    // instructions.description = 'How to use the instructions description text goes here.';
    // instructions.selections.subtitle = 'Selecting data values';
    // instructions.selections.steps = [
    //   'Usage instruction step 01.',
    //   'Usage instruction step 02.',
    //   'Usage instruction step 03.',
    //   'Usage instruction step 04.'
    // ];
    // instructions.footer = 'Usage instructions summary text goes here.';
  }

  // console.log(instructions);

  return (
    <div className="report-instructions">
      <div className="report-instructions-title">{instructions.title}</div>
      <div className="report-instructions-description">
        {instructions.description}
      </div>
      <div className="report-instructions-subtitle">
        {instructions.selections.subtitle}
      </div>
      <ul className="report-instructions-steps-group">
        {instructions.selections.steps.map(step => (
          <li key={step} className="report-instructions-step">
            {step}
          </li>
        ))}
      </ul>
      <div className="report-instructions-footer">{instructions.footer}</div>
    </div>
  );
}

ChartInstructions.propTypes = {
  currentReportType: PropTypes.string.isRequired
};

export default ChartInstructions;
