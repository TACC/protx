import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import L from 'leaflet';
import 'leaflet.vectorgrid';
import { SectionMessage, LoadingSpinner, DropdownSelector } from '_common';
import MapProviders from './MapProviders';
import './MainMap.css';
import { OBSERVED_FEATURES, GEOID_KEY, MALTREATMENT } from './meta';
import { IntervalColorScale, getColor } from './intervalColorScale';
import './MainMap.module.scss';
import 'leaflet/dist/leaflet.css';

function hasMetaData(
  data,
  mapType,
  geography,
  year,
  observedFeature,
  maltreatmentType
) {
  if (mapType === 'observedFeatures') {
    return (
      geography in data.observedFeaturesMeta &&
      observedFeature in data.observedFeaturesMeta[geography]
    );
  }
  return (
    geography in data.maltreatmentMeta &&
    year in data.maltreatmentMeta[geography] &&
    maltreatmentType in data.maltreatmentMeta[geography][year]
  );
}

function getMetaData(
  data,
  mapType,
  geography,
  year,
  observedFeature,
  maltreatmentType
) {
  const meta =
    mapType === 'observedFeatures'
      ? data.observedFeaturesMeta[geography][observedFeature]
      : data.maltreatmentMeta[geography][year][maltreatmentType]
          .MALTREATMENT_COUNT;
  return meta;
}

let mapContainer;

function MainMap() {
  const dataServer = window.location.origin;
  const dispatch = useDispatch();
  const { loading, error, data } = useSelector(state => state.protx);

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

  // Leaflet related layers, controls, and map
  const [legendControl, setLegendControl] = useState(null);
  const [layersControl, setLayersControl] = useState(null);
  const [dataLayer, setDataLayer] = useState(null);
  const [map, setMap] = useState(null);

  // Get systems and any other initial data we need from the backend
  useEffect(() => {
    dispatch({ type: 'FETCH_PROTX' });
  }, []);

  useEffect(() => {
    if (map || loading === true) {
      return;
    }

    const newMap = L.map(mapContainer, {
      zoom: 6,
      minZoom: 6,
      maxZoom: 16
    }).setView([31.0686, -99.9018]);

    // Create Layers Control.
    const { providers, layers: baseMaps } = MapProviders();
    providers[3].addTo(newMap);
    setLayersControl(L.control.layers(baseMaps).addTo(newMap));
    setMap(newMap);
  }, [loading, data, mapContainer]);

  useEffect(() => {
    if (map) {
      // remove old legend
      if (legendControl) {
        legendControl.remove();
      }

      const hasValues = hasMetaData(
        data,
        mapType,
        geography,
        year,
        observedFeature,
        maltreatmentType
      );

      if (hasValues) {
        const newLegend = L.control({ position: 'bottomright' });

        newLegend.onAdd = () => {
          const meta = getMetaData(
            data,
            mapType,
            geography,
            year,
            observedFeature,
            maltreatmentType
          );
          const div = L.DomUtil.create('div', 'color legend');

          // get numeric values between intervals
          const colorScale = new IntervalColorScale(meta);
          const intervalValues = colorScale.getIntervalValues();

          // loop through our density intervals and generate a label with a colored square for each interval
          for (let i = 0; i < colorScale.numberIntervals; i += 1) {
            div.innerHTML += `<i style="background:${
              colorScale.colors[i]
            }"></i> ${intervalValues[i]}&ndash;${intervalValues[i + 1]}<br>`;
          }

          return div;
        };
        // add new data layer to map and controls
        newLegend.addTo(map);
        setLegendControl(newLegend);
      }
    }
  }, [data, mapType, observedFeature, geography, maltreatmentType, year, map]);

  useEffect(() => {
    const vectorTile = `${dataServer}/static/data/vector/${geography}/2019/{z}/{x}/{y}.pbf`;
    if (map && layersControl) {
      const newDataLayer = L.vectorGrid.protobuf(vectorTile, {
        vectorTileLayerStyles: {
          singleLayer: properties => {
            let fillColor;
            let hasElementAndProperty;
            const geoid = properties[GEOID_KEY[geography]];
            // TODO refactor into two style functions
            if (mapType === 'observedFeatures') {
              const dataSet = data.observedFeatures[geography];
              // TODO confirm that we don't have values for all elements
              const hasElement = geoid in dataSet;
              hasElementAndProperty =
                hasElement && observedFeature in dataSet[geoid];
              const featureValue = hasElementAndProperty
                ? dataSet[geoid][observedFeature]
                : 0;
              if (hasElementAndProperty) {
                const meta =
                  data.observedFeaturesMeta[geography][observedFeature];
                fillColor = getColor(featureValue, meta.min, meta.max);
              }
            } else {
              // TODO REWORK (place into different function and remove workarounds for MALTREATMENT_COUNT)
              // TODO only county data provided for 2019
              const mal = data.maltreatment;
              hasElementAndProperty =
                geography in mal &&
                year in mal[geography] &&
                maltreatmentType in mal[geography][year] &&
                geoid in mal[geography][year][maltreatmentType];
              const featureValue = hasElementAndProperty
                ? mal[geography][year][maltreatmentType][geoid]
                    .MALTREATMENT_COUNT
                : 0;
              if (hasElementAndProperty) {
                const meta =
                  data.maltreatmentMeta[geography][year][maltreatmentType]
                    .MALTREATMENT_COUNT;
                fillColor = getColor(featureValue, meta.min, meta.max);
              }
            }
            return {
              fillColor,
              fill: hasElementAndProperty,
              stroke: false,
              opacity: 1,
              fillOpacity: 0.5
            };
          }
        },
        interactive: true,
        getFeatureId(f) {
          return f.properties[GEOID_KEY[geography]];
        },
        maxNativeZoom: 14 // All tiles generated up to 14 zoom level
      });
      if (dataLayer && layersControl) {
        // we will remove data layer from mapand from control
        layersControl.removeLayer(dataLayer);
        dataLayer.remove();
      }

      // add new data layer to map and controls
      newDataLayer.addTo(map);
      layersControl.addOverlay(newDataLayer, 'Data');
      setDataLayer(newDataLayer);
    }
  }, [
    data,
    mapType,
    geography,
    observedFeature,
    maltreatmentType,
    year,
    layersControl,
    map
  ]);

  const changeMapType = event => {
    const newMapType = event.target.value;
    if (newMapType === 'maltreatment') {
      // maltreatment only has county data
      setGeography('county');
    } else {
      // observedFeatures (i.e. Demographic Features only has 2019 data)
      setYear(2019);
    }
    setMapType(event.target.value);
  };

  if (error) {
    return (
      <div styleName="error">
        <SectionMessage type="warn">
          There was a problem loading the map.
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
      <div styleName="control-bar-container">
        <div styleName="control">
          <span styleName="label">Map</span>
          <DropdownSelector value={mapType} onChange={changeMapType}>
            <optgroup label="Select Map">
              <option value="observedFeatures">Demographic Features</option>
              <option value="maltreatment">Maltreatment</option>
            </optgroup>
          </DropdownSelector>
        </div>
        <div styleName="control">
          <span styleName="label">Area</span>
          <DropdownSelector
            value={geography}
            onChange={event => setGeography(event.target.value)}
            disabled={mapType === 'maltreatment'}
          >
            <optgroup label="Select Areas">
              <option value="dfps_region">DFPS Regions</option>
              <option value="census_tract">Census Tracts</option>
              <option value="county">Counties</option>
              <option value="cbsa">Core base statistical areas</option>
              <option value="urban_area">Urban Areas</option>
              <option value="zcta">Zip Codes</option>
            </optgroup>
          </DropdownSelector>
        </div>
        {mapType === 'maltreatment' && (
          <div styleName="control">
            <span styleName="label">Type</span>
            <DropdownSelector
              value={maltreatmentType}
              onChange={event => setMaltreatmentType(event.target.value)}
            >
              <optgroup label="Select Maltreatment Type">
                {MALTREATMENT.map(feature => (
                  <option key={feature.field} value={feature.field}>
                    {feature.name}
                  </option>
                ))}
              </optgroup>
            </DropdownSelector>
          </div>
        )}
        {mapType === 'observedFeatures' && (
          <div styleName="control">
            <span styleName="label">Feature</span>
            <DropdownSelector
              value={observedFeature}
              onChange={event => setObservedFeature(event.target.value)}
            >
              <optgroup label="Select Observed Feature">
                {OBSERVED_FEATURES.map(feature => (
                  <option key={feature.field} value={feature.field}>
                    {feature.name}
                  </option>
                ))}
              </optgroup>
            </DropdownSelector>
          </div>
        )}
        <div styleName="control">
          <span styleName="label">Select TimeFrame</span>
          <DropdownSelector
            value={year}
            onChange={event => setYear(event.target.value)}
            disabled={mapType === 'observedFeatures'}
          >
            <optgroup label="Select Timeframe" />
            <option value="2019">2019</option>
            <option value="2018">2018</option>
            <option value="2017">2017</option>
            <option value="2016">2016</option>
            <option value="2015">2015</option>
            <option value="2014">2014</option>
            <option value="2013">2013</option>
            <option value="2012">2012</option>
            <option value="2011">2011</option>
            <option value="2010">2010</option>
          </DropdownSelector>
        </div>
      </div>
      <div
        styleName="map"
        className="map-container"
        ref={el => (mapContainer = el)}
      />
    </div>
  );
}

export default MainMap;
