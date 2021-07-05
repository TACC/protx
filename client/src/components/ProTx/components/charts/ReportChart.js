import React from 'react';
import PropTypes from 'prop-types';
import ConfigurableChart from './ConfigurableChart';
import './ReportChart.css';

function ReportChart({
  mapType,
  geography,
  maltreatmentTypes,
  observedFeature,
  year,
  selectedGeographicFeature,
  data
}) {
  if (mapType === 'maltreatment') {
    if (selectedGeographicFeature) {
      return (
        <div className="report-chart">
          <ConfigurableChart
            className="chart-diagram"
            mapType={mapType}
            geography={geography}
            maltreatmentTypes={maltreatmentTypes}
            observedFeature={observedFeature}
            year={year}
            selectedGeographicFeature={selectedGeographicFeature}
            data={data}
          />
        </div>
      );
    }
    return (
      <div className="report-chart">
        <div className="feature-table">
          <div className="feature-table-chart">
            <table>
              <tr>
                <th className="feature-table-chart-label">
                  Demographic Feature
                </th>
                <th className="feature-table-chart-cell">
                  Rank by Causal Strength <sup>a</sup>
                </th>
                <th className="feature-table-chart-cell">
                  Rank by Random Forest Feature Importance <sup>b</sup>
                </th>
                <th className="feature-table-chart-cell">Average Rank</th>
                <th className="feature-table-chart-cell">Ensemble Rank</th>
              </tr>
              <tr>
                <td>Number of Single Parents</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
              </tr>
              <tr>
                <td>Number of Persons in Poverty</td>
                <td>4</td>
                <td>2</td>
                <td>3</td>
                <td>2</td>
              </tr>
              <tr>
                <td>Per Capita Income</td>
                <td>3</td>
                <td>5</td>
                <td>4</td>
                <td>3</td>
              </tr>
              <tr>
                <td>Number of Persons Age 17 and Younger</td>
                <td>6</td>
                <td>4</td>
                <td>5</td>
                <td>4</td>
              </tr>
              <tr>
                <td>Number of Persons without High School Diploma</td>
                <td>12</td>
                <td>3</td>
                <td>7.5</td>
                <td>5</td>
              </tr>
              <tr>
                <td>Number of Persons Living in Group Quarters</td>
                <td>2</td>
                <td>18</td>
                <td>10</td>
                <td>6</td>
              </tr>
              <tr>
                <td>Number of Households with Crowding</td>
                <td>5</td>
                <td>16</td>
                <td>10.5</td>
                <td>7</td>
              </tr>
            </table>
          </div>

          <div className="feature-table-info">
            <div className="feature-table-description">
              Table 1. Top seven features related to child maltreatment based on
              county-level total maltreatment counts for the state of Texas,
              2011-2019. Analysis was perfomed with two different models;
              features are ranked according to their influences in each model
              type. The top five features and rankings are shown for each model;
              features ranked in the top five for both models are highlighted in
              yellow.
            </div>
            <div className="feature-table-annotation">
              <sup>a</sup> Ranking by absolute value of estimated causal
              strength where 1 indicates the largest causal impact.
            </div>
            <div className="feature-table-annotation">
              <sup>b</sup> Ranking by random forest feature importance where 1
              indicates the most important feature.
            </div>
          </div>
        </div>
        <hr />
        <div className="report-chart-message">
          <h2>Usage Instructions</h2>
          <h3>In the Dropdown Selection Menu (top):</h3>
          <ul>
            <li className="analysis-chart-message-note">
              Map is restricted to Demographic Features.
            </li>
            <li>Select an Area.</li>
            <li>Select a Demographic Feature.</li>
            <li className="analysis-chart-message-note">
              TimeFrame is restricted to the last census count from 2019.
            </li>
          </ul>
          <h3>On the Map (left):</h3>
          <ul>
            <li>Select a Geographic Region.</li>
          </ul>
          {/* <h4>Purpose</h4> */}
          {/* <p>
            Demographic feature counts for individual geographic regions with
            specific observable features during selected timeframes.
          </p> */}
        </div>
      </div>
    );
  }
}

ReportChart.propTypes = {
  mapType: PropTypes.string.isRequired,
  geography: PropTypes.string.isRequired,
  maltreatmentTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  observedFeature: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  selectedGeographicFeature: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired
};

export default ReportChart;
