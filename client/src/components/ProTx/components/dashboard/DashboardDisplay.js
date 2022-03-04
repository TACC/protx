import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SectionMessage, LoadingSpinner } from '_common';
import DisplaySelectors from './DisplaySelectors';
import MainMap from '../maps/MainMap';
import MainChart from '../charts/MainChart';
import './DashboardDisplay.css';
import './DashboardDisplay.module.scss';

function DashboardDisplay() {
  // Map type and selected types (i.e. geography, year etc)
  // TODO: control of this state should be moved to redux/sagas (https://jira.tacc.utexas.edu/browse/COOKS-55)

  const PRESELECTED_MALTREATMENT_CATEGORIES = [
    'ABAN',
    'EMAB',
    'LBTR',
    'MDNG',
    'NSUP',
    'PHAB',
    'PHNG',
    'RAPR',
    'SXAB',
    'SXTR'
  ];
  // const [mapType, setMapType] = useState('maltreatment');
  // const [geography, setGeography] = useState('county');
  const [maltreatmentTypes, setMaltreatmentTypes] = useState(
    PRESELECTED_MALTREATMENT_CATEGORIES
  );
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

  return (
    <div styleName="root">
      <Switch>
        <Route
          path={`${protxRoute}/maltreatment`}
          render={() => {
            return (
              <>
                <DisplaySelectors
                  mapType="maltreatment"
                  geography="county"
                  maltreatmentTypes={maltreatmentTypes}
                  observedFeature={observedFeature}
                  year={year}
                  showRate={showRate}
                  // setGeography={setGeography}
                  setGeography="null"
                  setMaltreatmentTypes={setMaltreatmentTypes}
                  setObservedFeature={setObservedFeature}
                  setYear={setYear}
                  setShowRate={setShowRate}
                />
                <div className="display-layout-root">
                  <div className="display-layout-map">
                    <MainMap
                      mapType="maltreatment"
                      geography="county"
                      maltreatmentTypes={maltreatmentTypes}
                      observedFeature={observedFeature}
                      year={year}
                      showRate={showRate}
                      data={data}
                      selectedGeographicFeature={selectedGeographicFeature}
                      setSelectedGeographicFeature={
                        setSelectedGeographicFeature
                      }
                    />
                  </div>
                  <div className="display-layout-chart">
                    <MainChart
                      chartType="maltreatment"
                      mapType="maltreatment"
                      geography="county"
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
          }}
        />
        <Route
          path={`${protxRoute}/demographics`}
          render={() => {
            return (
              <>
                <DisplaySelectors
                  mapType="observedFeatures"
                  geography="county"
                  maltreatmentTypes={maltreatmentTypes}
                  observedFeature={observedFeature}
                  year="2019"
                  showRate={showRate}
                  // setGeography={setGeography}
                  setGeography="null"
                  setMaltreatmentTypes={setMaltreatmentTypes}
                  setObservedFeature={setObservedFeature}
                  setYear={setYear} // Set to null under demographics.
                  setShowRate={setShowRate}
                />
                <div className="display-layout-root">
                  <div className="display-layout-map">
                    <MainMap
                      mapType="observedFeatures"
                      geography="county"
                      maltreatmentTypes={maltreatmentTypes}
                      observedFeature={observedFeature}
                      year="2019"
                      showRate={showRate}
                      data={data}
                      selectedGeographicFeature={selectedGeographicFeature}
                      setSelectedGeographicFeature={
                        setSelectedGeographicFeature
                      }
                    />
                  </div>
                  <div className="display-layout-chart">
                    <MainChart
                      chartType="demographics"
                      mapType="observedFeatures"
                      geography="county"
                      maltreatmentTypes={maltreatmentTypes}
                      observedFeature={observedFeature}
                      year="2019"
                      selectedGeographicFeature={selectedGeographicFeature}
                      data={data}
                      showRate={showRate}
                      showInstructions
                    />
                  </div>
                </div>
              </>
            );
          }}
        />
        <Route
          path={`${protxRoute}/analytics`}
          render={() => {
            return (
              <>
                <DisplaySelectors
                  mapType="observedFeatures"
                  geography="county"
                  maltreatmentTypes={maltreatmentTypes}
                  observedFeature={observedFeature}
                  year="2019"
                  showRate={showRate}
                  // setGeography={setGeography}
                  setGeography="null"
                  setMaltreatmentTypes={setMaltreatmentTypes}
                  setObservedFeature={setObservedFeature}
                  setYear={setYear}
                  setShowRate={setShowRate} // Set to null in Analytics view.
                />
                <div className="display-layout-root">
                  <div className="display-layout-map">
                    <MainMap
                      mapType="observedFeatures"
                      geography="county"
                      maltreatmentTypes={maltreatmentTypes}
                      observedFeature={observedFeature}
                      year="2019"
                      showRate={showRate}
                      data={data}
                      selectedGeographicFeature={selectedGeographicFeature}
                      setSelectedGeographicFeature={
                        setSelectedGeographicFeature
                      }
                    />
                  </div>
                  <div className="display-layout-chart">
                    <MainChart
                      chartType="analytics"
                      mapType="observedFeatures"
                      geography="county"
                      maltreatmentTypes={maltreatmentTypes}
                      observedFeature={observedFeature}
                      year="2019"
                      selectedGeographicFeature={selectedGeographicFeature}
                      data={data}
                      showRate={showRate}
                      showInstructions
                    />
                  </div>
                </div>
              </>
            );
          }}
        />
        <Redirect from={protxRoute} to={`${protxRoute}/analytics`} />
      </Switch>
    </div>
  );
}

export default DashboardDisplay;
