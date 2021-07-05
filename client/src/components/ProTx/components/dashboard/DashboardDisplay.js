import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SectionMessage, LoadingSpinner } from '_common';
import DisplaySelectors from './DisplaySelectors';
import AnalysisDisplayLayout from './AnalysisDisplayLayout';
import ReportDisplayLayout from './ReportDisplayLayout';
import { MALTREATMENT, OBSERVED_FEATURES } from '../meta';
import './DashboardDisplay.module.scss';

function DashboardDisplay() {
  // Map type and selected types (i.e. geography, year etc)
  // TODO: control of this state should be moved to redux/sagas (https://jira.tacc.utexas.edu/browse/COOKS-55)
  const [mapType, setMapType] = useState('maltreatment');
  const [geography, setGeography] = useState('county');
  const [maltreatmentTypes, setMaltreatmentTypes] = useState([
    MALTREATMENT[0].field
  ]);
  const [observedFeature, setObservedFeature] = useState(
    OBSERVED_FEATURES[0].field
  );
  const [year, setYear] = useState('2019');
  const [selectedGeographicFeature, setSelectedGeographicFeature] = useState(
    null
  );

  const dispatch = useDispatch();
  const { loading, error, data } = useSelector(state => state.protx);

  const protxRoute = '/protx';

  // Get systems and any other initial data we need from the backend
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

  return (
    <div styleName="root">
      <Switch>
        <Route path={`${protxRoute}/analysis`}>
          <DisplaySelectors
            mapType={mapType}
            geography={geography}
            maltreatmentTypes={maltreatmentTypes}
            observedFeature={observedFeature}
            year={year}
            setMapType={setMapType}
            setGeography={setGeography}
            setMaltreatmentTypes={setMaltreatmentTypes}
            setObservedFeature={setObservedFeature}
            setYear={setYear}
          />
          <AnalysisDisplayLayout
            mapType={mapType}
            geography={geography}
            maltreatmentTypes={maltreatmentTypes}
            observedFeature={observedFeature}
            year={year}
            data={data}
            selectedGeographicFeature={selectedGeographicFeature}
            setSelectedGeographicFeature={setSelectedGeographicFeature}
          />
        </Route>
        <Route path={`${protxRoute}/report`}>
          <DisplaySelectors
            mapType="observedFeatures"
            geography={geography}
            maltreatmentTypes={maltreatmentTypes}
            observedFeature={observedFeature}
            year={year}
            setGeography={setGeography}
            setMaltreatmentTypes={setMaltreatmentTypes}
            setObservedFeature={setObservedFeature}
          />
          <ReportDisplayLayout
            mapType={mapType}
            geography={geography}
            maltreatmentTypes={maltreatmentTypes}
            observedFeature={observedFeature}
            year={year}
            data={data}
            selectedGeographicFeature={selectedGeographicFeature}
            setSelectedGeographicFeature={setSelectedGeographicFeature}
          />
        </Route>
        <Redirect from={protxRoute} to={`${protxRoute}/analysis`} />
      </Switch>
    </div>
  );
}

export default DashboardDisplay;
