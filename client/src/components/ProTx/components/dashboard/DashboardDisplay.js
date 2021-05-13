import React, { useEffect, useState } from 'react';
import './DashboardDisplay.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { SectionMessage, LoadingSpinner } from '_common';
import DisplaySelectors from './DisplaySelectors';
import DisplayLayout from './DisplayLayout';
import { MALTREATMENT, OBSERVED_FEATURES } from '../../meta';

function DashboardDisplay() {
  // Map type and selected types (i.e. geography, year etc)
  const [mapType, setMapType] = useState('maltreatment');
  const [geography, setGeography] = useState('county');
  const [maltreatmentType, setMaltreatmentType] = useState(
    MALTREATMENT[0].field
  );
  const [observedFeature, setObservedFeature] = useState(
    OBSERVED_FEATURES[0].field
  );
  const [year, setYear] = useState('2019');

  const dispatch = useDispatch();
  const { loading, error, data } = useSelector(state => state.protx);

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
      <DisplaySelectors
        mapType={mapType}
        geography={geography}
        maltreatmentType={maltreatmentType}
        observedFeature={observedFeature}
        year={year}
        setMapType={setMapType}
        setGeography={setGeography}
        setMaltreatmentType={setMaltreatmentType}
        setObservedFeature={setObservedFeature}
        setYear={setYear}
      />
      <DisplayLayout
        mapType={mapType}
        geography={geography}
        maltreatmentType={maltreatmentType}
        observedFeature={observedFeature}
        year={year}
        data={data}
      />
    </div>
  );
}

export default DashboardDisplay;
