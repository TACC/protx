import React from 'react';
import PropTypes from 'prop-types';
import './ChartInstructions.css';

function ChartInstructions({ currentReportType }) {
  const instructions = {
    type: '',
    title: 'Reporting Tool Instructions',
    description: 'Description of the selected reporting tool.',
    selections: {
      subtitle: 'Using the Reporting Tool',
      steps: ['TBD', 'TBD', 'TBD', 'TBD', 'TBD', 'TBD', 'TBD', 'TBD']
    },
    footer: 'Footer content for the current tool (if any).'
  };

  if (currentReportType === 'hidden') {
    return (
      <div className="report-instructions-hidden">
        Note: To display the instructions again, deselect the current geographic
        region on the map.
      </div>
    );
  }

  if (currentReportType === 'observed') {
    instructions.type = 'observed';
    instructions.title = 'Demographics Data Reporting Tool Instructions';
    instructions.description =
      'The Demographics Data Reporting Tool is designed to view demographic feature data aggregated by geographic region types and filtered by the selected timeframe.';
    instructions.selections.subtitle =
      'Using the Demographics Data Reporting Tool';
    instructions.selections.steps = [
      // 'Select a geographic region type from the Area dropdown menu (located above the map).',
      // '-- Note: Area is currently restricted to Counties.',
      // 'Select either `Percentages` or `Totals` (located above the map) to set the data Value type to display.',
      // '-- Note: The map key and map tiles will update to reflect the corresponding data values for the selected Value type.',
      // 'Select a demographic feature from the Demographics dropdown menu (located above the map).',
      // '-- Note: The map key and the map tiles will update to reflect the corresponding data values for the selected feature(s).',
      // '-- Note: The map tile color value is indicated in the map key (located in the bottom-right corner of the map). The numeric values reflected in the map key will change based on the current feature selected.',
      // 'Select a timeframe from the Year dropdown menu (located above the map).',
      // '-- Note: The Year is currently restricted to  U.S. census data from 2019.',
      'Left-click on the map to select a geographic region, zooming to the region extents and filtering the data by the region selection.',
      'After the map zooms to the selected region, resource markers will populate the map and the layer panel will open (located in the top-right corner of the map).',
      // 'The resource marker layers can be toggled on and off by selecting the corresponding checkbox in the layer menu panel (located in the top-right corner of the map).',
      // 'Left-clicking on a resource marker will display detailed information about the resource in a popup window. Some markers include hyperlinks to the related website. Popup windows can be closed by left-clicking the close button in the winodw (the X located in the top right corner) or by left-clicking anywhere outside the popup window panel.',
      'Left-clicking on a resource marker will display detailed information about the resource in a popup window.',
      'Left-clicking on the Globe icon located in the top-left corner of the map will reset the map zoom level to the default (the entire state of Texas).',
      // '-- Note: You can manually zoom in and out on the map at any time by left-clicking the zoom buttons located in the top-left corner of the map, using the scroll wheel on your mouse or using gestures on your touch device.',
      // '-- Note: The resource markers will be dynamically toggled off when the map zooms out beyond a certain level. If you wish to see the markers at these zoom levels, you can toggle them on and off manually by left-clicking the corresponding checkbox in the layer menu panel located in the top-right corner of the map.',
      '-- Note: To display these instructions again, deselect the current geographic region on the map.'
    ];
    instructions.footer = '';
  }

  if (currentReportType === 'maltreatment') {
    instructions.type = 'maltreatment';
    instructions.title = 'Maltreatment Data Reporting Tool Instructions';
    instructions.description =
      'The Maltreatment Data Reporting Tool is designed to view maltreatment data aggregated by geographic region types and filtered by the selected timeframe.';
    instructions.selections.subtitle =
      'Using the Maltreatment Data Reporting Tool';
    instructions.selections.steps = [
      // 'Select a geographic region type from the Area dropdown menu (located above the map).',
      // '-- Note: Area is currently restricted to Counties.',
      // 'Select either `Rate per 100K children` or `Totals` (located above the map) to set the data Value type to display.',
      // '-- Note: The map key and map tiles will update to reflect the corresponding data values for the selected Value type.',
      // 'Select one or more maltreatment categories from the Type dropdown menu (located above the map).',
      // '-- Note: The map key and the map tiles will update to reflect the corresponding data values for the current selection.',
      // '-- Note: The map tile color value is indicated in the map key (located in the bottom-right corner of the map). The numeric values reflected in the map key will change based on the current selection.',
      // '-- Note: You can change the selected maltreatment categories at any time.',
      // 'Select a timeframe from the Year dropdown menu (located above the map).',
      // '-- Note: The Year is currently restricted to U.S. census data from 2011 to 2019.',
      'Left-click on the map to select a geographic region, zooming to the region extents and filtering the data by the region selection.',
      'After the map zooms to the selected region, resource markers will populate the map and the layer panel will open (located in the top-right corner of the map).',
      // 'The resource marker layers can be toggled on and off by selecting the corresponding checkbox in the layer menu panel (located in the top-right corner of the map).',
      // 'Left-clicking on a resource marker will display detailed information about the resource in a popup window. Some markers include hyperlinks to the related website. Popup windows can be closed by left-clicking the close button in the winodw (the X located in the top right corner) or by left-clicking anywhere outside the popup window panel.',
      'Left-clicking on a resource marker will display detailed information about the resource in a popup window.',
      'Left-clicking on the Globe icon located in the top-left corner of the map will reset the map zoom level to the default (the entire state of Texas).',
      // '-- Note: You can manually zoom in and out on the map at any time by left-clicking the zoom buttons located in the top-left corner of the map, using the scroll wheel on your mouse or using gestures on your touch device.',
      // '-- Note: The resource markers will be dynamically toggled off when the map zooms out beyond a certain level. If you wish to see the markers at these zoom levels, you can toggle them on and off manually by left-clicking the corresponding checkbox in the layer menu panel located in the top-right corner of the map.',
      '-- Note: To display these instructions again, deselect the current geographic region on the map.'
    ];
    instructions.footer = '';
  }

  if (currentReportType === 'predictive') {
    instructions.type = 'predictive';
    instructions.title = 'Analytics Reporting Tool Instructions';
    instructions.description =
      'The Analytics Reporting Tool is designed to view predictive features and compare them across geographic regions within the selected timeframe. This tool is currently restricted to the top seven predictive features.';
    instructions.selections.subtitle = 'Using the Analytics Reporting Tool';
    instructions.selections.steps = [
      // 'Select a geographic region type from the Area dropdown menu (located above the map).',
      // '-- Note: Area is currently restricted to Counties.',
      // 'Select a predictive feature from the Demographics dropdown menu (located above the map).',
      // '-- Note: The map key and the map tiles will update to reflect the corresponding data values for the selected feature(s).',
      // '-- Note: The map tile color value is indicated in the map key (located in the bottom-right corner of the map). The numeric values reflected in the map key will change based on the current feature selected.',
      // 'Select a timeframe from the Year dropdown menu (located above the map).',
      // '-- Note: The timeframe is currently restricted to the last census count from 2019.',
      'Left-click on the map to select a geographic region, zooming to the region extents and filtering the data by the region selection.',
      'After the map zooms to the selected region, resource markers will populate the map and the layer panel will open (located in the top-right corner of the map).',
      // 'The resource marker layers can be toggled on and off by selecting the corresponding checkbox in the layer menu panel (located in the top-right corner of the map).',
      // 'Left-clicking on a resource marker will display detailed information about the resource in a popup window. Some markers include hyperlinks to the related website. Popup windows can be closed by left-clicking the close button in the winodw (the X located in the top right corner) or by left-clicking anywhere outside the popup window panel.',
      'Left-clicking on a resource marker will display detailed information about the resource in a popup window.',
      'Left-clicking on the Globe icon located in the top-left corner of the map will reset the map zoom level to the default (the entire state of Texas).',
      // '-- Note: You can manually zoom in and out on the map at any time by left-clicking the zoom buttons located in the top-left corner of the map, using the scroll wheel on your mouse or using gestures on your touch device.',
      // '-- Note: The resource markers will be dynamically toggled off when the map zooms out beyond a certain level. If you wish to see the markers at these zoom levels, you can toggle them on and off manually by left-clicking the corresponding checkbox in the layer menu panel located in the top-right corner of the map.',
      '-- Note: To display these instructions again, deselect the current geographic region on the map.'
    ];
    instructions.footer = '';
  }

  return (
    <div className="report-instructions">
      <div className="report-instructions-title">{instructions.title}</div>
      <div className="report-instructions-description">
        {instructions.description}
      </div>
      <div className="report-instructions-subtitle">
        {instructions.selections.subtitle}
      </div>
      <div className="report-instructions-steps-group">
        <ul className="report-instructions-steps">
          {instructions.selections.steps.map(step => (
            <li key={step} className="report-instructions-step">
              {step}
            </li>
          ))}
        </ul>
      </div>
      <div className="report-instructions-footer">{instructions.footer}</div>
    </div>
  );
}

ChartInstructions.propTypes = {
  currentReportType: PropTypes.string.isRequired
};

export default ChartInstructions;
