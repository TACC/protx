import React from 'react';
import PropTypes from 'prop-types';
import './ChartInstructions.css';

function ChartInstructions({
  dropdownInstructions,
  mapInstructions,
  showDescription,
  description
}) {
  const getCurrentDescription = (
    showCurrentDescription,
    currentDescription
  ) => {
    if (showCurrentDescription) {
      return (
        <div>
          <div className="chart-description-label">Description</div>
          <div className="chart-description">{currentDescription}</div>
        </div>
      );
    }
    return <div />;
  };

  const currentDescription = getCurrentDescription(
    showDescription,
    description
  );

  return (
    <div className="chart-instructions">
      <div className="chart-instructions-label">Instructions</div>
      <h3>In the Dropdown Selection Menu (top):</h3>
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
      {currentDescription}
    </div>
  );
}

ChartInstructions.propTypes = {
  dropdownInstructions: PropTypes.arrayOf(PropTypes.string).isRequired,
  mapInstructions: PropTypes.arrayOf(PropTypes.string).isRequired,
  showDescription: PropTypes.bool.isRequired,
  description: PropTypes.string.isRequired
};

export default ChartInstructions;
