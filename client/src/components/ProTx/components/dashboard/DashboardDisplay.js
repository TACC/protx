import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SectionMessage, LoadingSpinner } from '_common';
import DisplaySelectors from './DisplaySelectors';
import MainMap from '../maps/MainMap';
// import MaltreatmentChart from '../charts/MaltreatmentChart';
// import MaltreatmentChart from '../charts/MaltreatmentChart.OLD';
// import ObservedFeaturesChart from '../charts/ObservedFeaturesChart';
// import PredictiveFeaturesChart from '../charts/PredictiveFeaturesChart';
import MainChart from '../charts/MainChart';

import './DashboardDisplay.css';
import './DashboardDisplay.module.scss';

function DashboardDisplay() {
  // Map type and selected types (i.e. geography, year etc)
  // TODO: control of this state should be moved to redux/sagas (https://jira.tacc.utexas.edu/browse/COOKS-55)
  const [mapType, setMapType] = useState('maltreatment');
  const [geography, setGeography] = useState('county');
  const [maltreatmentTypes, setMaltreatmentTypes] = useState(['ABAN']);
  const [observedFeature, setObservedFeature] = useState('CROWD');
  const [year, setYear] = useState('2019');
  const [selectedGeographicFeature, setSelectedGeographicFeature] = useState(
    ''
  );
  const [showRate, setShowRate] = useState(true);
  const dispatch = useDispatch();
  const { loading, error, data } = useSelector(state => state.protx);
  const protxRoute = '/protx';

  // Get systems and any other initial data we need from the backend.
  useEffect(() => {
    dispatch({ type: 'FETCH_PROTX' });
  }, []);

  if (error) {
    return (
      <div styleName="error">
        <SectionMessage type="warn">
          There was a problem loading the map data.
        </SectionMessage>
      </div>
    );
  }

  if (loading) {
    return (
      <div styleName="root">
        <LoadingSpinner />
      </div>
    );
  }

  const displayLayout = plotType => {
    return (
      <>
        <DisplaySelectors
          mapType={mapType}
          geography={geography}
          maltreatmentTypes={maltreatmentTypes}
          observedFeature={observedFeature}
          year={year}
          showRate={showRate}
          setGeography={setGeography}
          setMaltreatmentTypes={setMaltreatmentTypes}
          setObservedFeature={setObservedFeature}
          setYear={setYear}
          setShowRate={setShowRate}
        />
        <div className="display-layout-root">
          <div className="display-layout-map">
            <MainMap
              mapType={mapType}
              geography={geography}
              maltreatmentTypes={maltreatmentTypes}
              observedFeature={observedFeature}
              year={year}
              showRate={showRate}
              data={data}
              selectedGeographicFeature={selectedGeographicFeature}
              setSelectedGeographicFeature={setSelectedGeographicFeature}
            />
          </div>
          <div className="display-layout-chart">
            <MainChart
              mapType={mapType}
              plotType={plotType}
              geography={geography}
              maltreatmentTypes={maltreatmentTypes}
              observedFeature={observedFeature}
              year={year}
              selectedGeographicFeature={selectedGeographicFeature}
              data={data}
              showRate={showRate}
              showInstructions
            />
          </div>
        </div>
      </>
    );
  };

  return (
    <div styleName="root">
      <Switch>
        <Route
          path={`${protxRoute}/maltreatment`}
          render={() => {
            setMapType('maltreatment');
            // Maltreatment only has county data.
            setGeography('county');
            const plotType = 'maltreatment';
            return displayLayout(plotType);
          }}
        />
        <Route
          path={`${protxRoute}/demographics`}
          render={() => {
            setMapType('observedFeatures');
            // observedFeatures (i.e. Demographic Features) only has 2019 data.
            setYear('2019');
            const plotType = 'demographics';
            return displayLayout(plotType);
          }}
        />
        <Route
          path={`${protxRoute}/analytics`}
          render={() => {
            setMapType('observedFeatures');
            // Year is fixed to 10 years of data.
            setYear('2019');
            // Currently restricted to county data.
            setGeography('county');
            // Do not show the rate.
            setShowRate(false);
            const plotType = 'analytics';
            return displayLayout(plotType);
          }}
        />
        <Redirect from={protxRoute} to={`${protxRoute}/analytics`} />
      </Switch>
    </div>
  );
}

export default DashboardDisplay;
