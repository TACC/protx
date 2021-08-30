import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SectionMessage, LoadingSpinner } from '_common';
import DisplaySelectors from './DisplaySelectors';
import MaltreatmentObservedFeaturesReportLayout from './MaltreatmentObservedFeaturesReportLayout';
import PredictiveFeaturesReportLayout from './PredictiveFeaturesReportLayout';
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
    OBSERVED_FEATURES[3]
      .field /* EP_CROWD; COOKS-110: EP_CROWD is starting field as we choosing between percent values
     to begin with */
  );
  const [year, setYear] = useState('2019');
  const [selectedGeographicFeature, setSelectedGeographicFeature] = useState(
    ''
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
        <Route
          path={[`${protxRoute}/maltreatment`, `${protxRoute}/demographics`]}
          render={({ location }) => {
            if (location.pathname.includes(`${protxRoute}/maltreatment`)) {
              setMapType('maltreatment');
              // maltreatment only has county data
              setGeography('county');
            } else {
              // observedFeatures (i.e. Demographic Features only has 2019 data)
              setYear('2019');
              setMapType('observedFeatures');
            }
            return (
              <>
                <DisplaySelectors
                  mapType={mapType}
                  geography={geography}
                  maltreatmentTypes={maltreatmentTypes}
                  observedFeature={observedFeature}
                  year={year}
                  setGeography={setGeography}
                  setMaltreatmentTypes={setMaltreatmentTypes}
                  setObservedFeature={setObservedFeature}
                  setYear={setYear}
                />
                <MaltreatmentObservedFeaturesReportLayout
                  mapType={mapType}
                  geography={geography}
                  maltreatmentTypes={maltreatmentTypes}
                  observedFeature={observedFeature}
                  year={year}
                  data={data}
                  selectedGeographicFeature={selectedGeographicFeature}
                  setSelectedGeographicFeature={setSelectedGeographicFeature}
                />
              </>
            );
          }}
        />
        <Route path={`${protxRoute}/analytics`}>
          <DisplaySelectors
            mapType="observedFeatures"
            geography="county"
            maltreatmentTypes={maltreatmentTypes}
            observedFeature={observedFeature}
            year="2019"
            setMaltreatmentTypes={setMaltreatmentTypes}
            setObservedFeature={setObservedFeature}
            limitToTopObservedFeatureFields
          />
          <PredictiveFeaturesReportLayout
            mapType="observedFeatures"
            geography="county"
            maltreatmentTypes={maltreatmentTypes}
            observedFeature={observedFeature}
            year="2019"
            data={data}
            selectedGeographicFeature={selectedGeographicFeature}
            setSelectedGeographicFeature={setSelectedGeographicFeature}
          />
        </Route>
        <Redirect from={protxRoute} to={`${protxRoute}/analytics`} />
      </Switch>
    </div>
  );
}

export default DashboardDisplay;
